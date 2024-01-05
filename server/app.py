import os
from flask import Flask, jsonify,request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv
import decimal

app = Flask(__name__)

health_status = True

# Enable CORS for all routes
CORS(app, origins=['https://localhost:3000', 'http://localhost:3000', 'https://or-client-d4kjq3uwba-uw.a.run.app', 'https://client-service-d4kjq3uwba-uw.a.run.app'],
     methods=['GET', 'HEAD', 'POST', 'OPTIONS', 'PUT'],
     headers=['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
     supports_credentials=False,
     max_age=None,
     send_wildcard=False,
     always_send=False,
     automatic_options=True
     )

load_dotenv()

db_params = {
    'user': os.environ.get("DB_USERNAME"),
    'password': os.environ.get('DB_PASSWORD'),
    'host': os.environ.get('INSTANCE_CONNECTION_NAME'),
    'port': os.environ.get("DB_PORT"),
    'dbname': os.environ.get("DB_NAME"),
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

@app.route('/health')
def health():
    if health_status:
        resp = jsonify(health="healthy")
        resp.status_code = 200
    else:
        resp = jsonify(health="unhealthy")
        resp.status_code = 500

    return resp

@app.route('/api/scans', methods=['GET'])
def scans():
    """
    Retrieve scan data based on specified parameters.

    Parameters:
    - delta (str): Time interval for growth calculation.
    - growth (str): Growth rate for volume projection.
    - diameter (str): Range of average diameters (comma-separated, e.g., '5.0,10.0').

    Returns:
    JSON: A JSON object containing the location and projected volume of scans within the specified diameter range.

    Example:
    GET /api/scans?delta=30&growth=0.02&diameter=5.0,10.0
    Response:
    [
        {"location": "Location1", "volume": 15.5},
        {"location": "Location2", "volume": 20.2},
        ...
    ]
    """
    try:
        # Extract parameters from the request
        args = request.args
        date_delta = float(args.get('delta'))
        growth_rate = float(args.get('growth'))
        diameter_range = args.get('diameter')
        min_avg_size, max_avg_size = map(float, diameter_range.split(","))

        # growth during date delta
        projected_growth = decimal.Decimal(date_delta) * decimal.Decimal(growth_rate)

        # Validate input values
        if date_delta <= 0 or growth_rate <= 0 or min_avg_size >= max_avg_size:
            raise ValueError("Invalid input values")

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

        return jsonify({"status": "success", "data": results})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    app.run(port=8080)
