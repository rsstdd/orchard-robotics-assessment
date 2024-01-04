import os
import psycopg2

conn = psycopg2.connect(
        host="localhost",
        database="orchard_robotics",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a command: this creates a new table
cur.execute('DROP TABLE IF EXISTS scans;')
cur.execute('CREATE TABLE scans (id serial PRIMARY KEY,'
                                  'location POINT NOT NULL',
                                  'major_mm numeric(3, 14) NOT NULL'
                                  'minor_mm numeric(3, 14) NOT NULL'
                                  'subminor_mm numeric(3, 14) NOT NULL'
                                  'volume float NOT NULL'
                                  'date_scanned date DEFAULT CURRENT_TIMESTAMP)'
                                  'CONSTRAINT table_name_pkey PRIMARY KEY (id);'
                                 )


cur.execute('INSERT INTO scans (location, major_mm, minor_mm, subminor_mm, volume, date_scanned)'
            'VALUES (%s, %s, %s, %s, %s, %s)',
            ('point(43.2431877,-77.0058192,85.08936164820400)',
             85.08936164820400,
             85.08936164820400,
             85.08936164820400,
             616,063.9507419828,
             )
            )

conn.commit()

cur.close()
conn.close()
