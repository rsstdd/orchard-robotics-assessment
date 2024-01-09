# Features

## Fruit Harvest Estimates

```
  +-----------------+        +-----------------+             +-----------------+
  |    Data Source  |        |  Preprocessing  |             |    Data Store   |
  | (e.g., Cameras) |        | & Augmentation  |             |   (Database)    |
  +-----------------+        +-----------------+             +-----------------+
         |                         |                         |
         |                         |                         |
         v                         v                         v
  +-----------------+        +----------------------+        +-----------------+
  |     Data Ingest |        |   Image Enhancement  |        |   Data Storage  |
  |     & Capture   |        |   (e.g., Resize,     |        |   & Management  |
  |                 |        |    Filters, etc.)    |        |                 |
  +-----------------+        +----------------------+        +-----------------+
         |                         |                         |
         |                         |                         |
         v                         v                         v
  +-----------------+        +----------------------+        +--------------------+
  |    Data Pre-    |        |  Feature Extraction  |        | Quality Control    |
  |   Processing    |        |   (e.g., Color, Size,|        |   & Validation     |
  |   & Cleansing   |        |    Shape Analysis)   |        |  (e.g., Duplicates,|
  |                 |        |                      |        |  Anomalies, etc.)  |
  +-----------------+        +----------------------+        +--------------------+
         |                         |                         |
         |                         |                         |
         v                         v                         v
  +------------------+        +------------------+           +------------------+
  |  Data Integration|        |     Analytics    |           |  Data Storage    |
  |  & Aggregation   |        |   & Algorithms   |           |  (Matured Fruit) |
  |                  |        | (e.g., ML Models)|           |                  |
  +------------------+        +------------------+           +------------------+
         |                         |                         |
         |                         |                         |
         v                         v                         v
  +-----------------+        +---------------------+         +-----------------+
  |    Data Output  |        |     Visualization   |         |    Reporting    |
  |   & Reporting   |        |   (e.g., Dashboards,|         |    & Alerts     |
  |   (e.g., UI)    |        |    Charts, Reports) |         |                 |
  +-----------------+        +---------------------+         +-----------------+
```

### Explanation of Key Components:
- *Data Source:* This is where data is initially generated or collected, such as through cameras or sensors.
- *Data Ingest & Capture:* Data from the source is ingested and captured for further processing. This may involve capturing images of fruit.
- *Data Preprocessing & Cleansing:* Raw data is preprocessed to remove noise, handle missing values, and cleanse it for analysis. For images, this may include enhancement techniques like resizing and filtering.
- *Feature Extraction:* Features relevant to fruit maturity assessment are extracted from the preprocessed data. This may involve analyzing color, size, shape, and other characteristics.
- *Data Integration & Aggregation:* Extracted features are integrated and aggregated to create a comprehensive dataset for analysis. Machine learning models and algorithms may be applied at this stage.
- *Analytics & Algorithms:* This step involves running analytics and applying algorithms to assess fruit maturity. Machine learning models can classify fruit based on their maturity level.
- *Data Storage & Management:* Data related to matured fruits may be stored for future reference or reporting.
- *Quality Control & Validation:* Quality control checks ensure data accuracy and consistency. Duplicate or anomalous data may be flagged.
- *Visualization:* Results and assessments are visualized, often through dashboards, charts, and reports.
- *Reporting & Alerts:* Detailed reports on fruit maturity assessments can be generated. Alerts may be triggered based on specific conditions.

## Data Wharehouseing
```
 +------------------+   +-----------------+   +---------------------+
 |    Data Sources  |   |   Google Cloud  |   |    Data Analytics    |
 |    (Orchards,    |   |    Storage (GCS)|   |   (Google BigQuery)  |
 |    Scans, Logs)  |   +-----------------+   +----------------------+
 +------------------+        |                       |               |
         |                   |                       |               |
         |                   |                       |               |
         v                   |                       |               |
 +-------------------+       |                       |               |
 | Google Dataflow   |       |                       |               |
 | (ETL Processing)  |       |                       |               |
 +-------------------+       |                       |               |
         |                   |                       |               |
         |                   v                       |               |
         v              +-------------------+        |               |
 +--------------------+ |  Google BigQuery  |        |               |
 | Google Data Studio | |   (Data Warehouse)|    +-----+    +-----+  |
 |(Data Visualization)| +-------------------+    | Data|    | Data|  |
 +--------------------+                          |Model|    |View |  |
                                                 |ing  |    |ing  |  |
                                                 +-----+    +-----+  |
                                                    |          |     |
                                                    v          v     |
                                            +-----------+  +-------+ |
                                            |Monitoring |  |   IAM | |
                                            |  & Logging|  |Ctrls  | |
                                            +-----------+  +-------+ |
                                                                     |
 +---------------------------------------------------------------------+
 |                                Google Cloud                         |
 |                            (Data Warehousing)                       |
 +---------------------------------------------------------------------+
```

## Fruit Maturity Assessment

```
   +---------------------+
   |  Front-End (React)  |
   |   +-----------+     |
   |   |  User     |     |
   |   |  Interface|     |
   |   +-----------+     |
   +---------------------+
           |
           v
   +--------------------+
   |  Backend (Flask)    |
   |   +-------------+   |
   |   |  API Endpoints  |
   |   |  Authentication |
   |   |  Prediction     |
   |   |  Data Retrieval |
   |   +-----------+     |
   +---------------------+
           |
           v
   +------------------------+
   |  Database (PostgreSQL) |
   |   +-------------+      |
   |   |   Orchards  |      |
   |   |   Users     |      |
   |   |   Fruit Data|      |
   |   +-------------+      |
   +------------------------+
           |
           v
   +------------------------+
   |  Estimation Engine     |
   |   +----------------+   |
   |   |  Predictive Models |
   |   +----------------+   |
   +------------------------+
           |
           v
   +------------------------+
   |  Maturity Assessment   |
   |   +----------------+   |
   |   |  Image Processing  |
   |   |  ML Models         |
   |   +----------------+   |
   +------------------------+
           |
           v
   +------------------------+
   |  Google Cloud Products |
   |   +----------------+   |
   |   |  Cloud Storage     |
   |   |  GKE               |
   |   |  Pub/Sub           |
   |   |  Dataflow          |
   |   |  BigQuery          |
   |   |  Cloud Vision AI   |
   |   |  Logging/Monitoring|
   |   +----------------+   |
   +------------------------+
```

```python
# Route to calculate and return harvest estimates for a specific fruit
@app.route('/api/harvest/estimate', methods=['POST'])
def calculate_harvest_estimate():
    try:
        data = request.get_json()
        fruit_id = data['fruit_id']
        estimated_volume = perform_estimation(fruit_id)
        response = {
            'estimated_volume': estimated_volume
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def perform_estimation(fruit_id):
    try:
        fruit_data = fetch_fruit_data_from_database(fruit_id)
        major_axis = fruit_data['major_axis']
        minor_axis = fruit_data['minor_axis']
        subminor_axis = fruit_data['subminor_axis']
        growth_rate = fruit_data['growth_rate']

        estimated_volume = calculate_volume(major_axis, minor_axis, subminor_axis, growth_rate)

        return estimated_volume

    except Exception as e:
        raise Exception(f"Estimation failed: {str(e)}")

def fetch_fruit_data_from_database(fruit_id):
    fruit_data = {
        'major_axis': 10.5,
        'minor_axis': 7.2,
        'subminor_axis': 5.1,
        'growth_rate': 0.8,
    }
    return fruit_data

def calculate_volume(major_axis, minor_axis, subminor_axis, growth_rate):
    volume = major_axis * minor_axis * subminor_axis * growth_rate
    return volume


if __name__ == '__main__':
    app.run(debug=True)
```
