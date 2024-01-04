import os
from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import decimal

app = Flask(__name__)

CORS(
    app,
    methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    resources={r"/api/*": {"origins": "http://localhost:3000"}}
)

load_dotenv()

db_params = {
    'host': os.environ.get("DB_HOST"),
    'port': os.environ.get("DB_PORT"),
    'dbname': os.environ.get("DB_NAME"),
    'user': os.environ.get("DB_USERNAME"),
    'password': os.environ.get('DB_PASSWORD')
}

def execute_query(sql, params=None):
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cursor.execute(sql, params)
        results = cursor.fetchall()
        return results
    finally:
        cursor.close()
        conn.close()

@app.route('/api/scans', methods=['OPTIONS'])
def handle_preflight():
    return '', 200

@app.route('/api/scans', methods=['GET'])
def scans():
    args = request.args
    date_delta = args.get('delta')
    growth_rate = args.get('growth')
    diameter_range = args.get('diameter')
    max_avg_size = diameter_range.split(",")[1]
    min_avg_size = diameter_range.split(",")[0]
    # growth during date delta
    projected_growth = decimal.Decimal(date_delta) * decimal.Decimal(growth_rate)

    sql = """
    SELECT location, volume
    FROM scans
    WHERE avg_diameter BETWEEN %s AND %s;
    """
    params = (min_avg_size, max_avg_size)

    results = execute_query(sql, params)

    # Format the location &
    # Calculate the volume for each row
    for row in results:
        row["location"] = row["location"].strip('()')
        # Final volume of each fruit =
        #  -> original volume + growth during date delta
        row['volume'] = projected_growth + row['volume']

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=8080)
