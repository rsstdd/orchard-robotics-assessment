# Potential High-Level Architecture

```
                +-----------------+
                |   Data Source   |
                |  (Cameras, AI)  |
                +-----------------+
                        |
                        V
                 +--------------+
                 |   Data Lake  |
                 |(Google Cloud |
                 |   Storage)   |
                 +--------------+
                        |
                        V
                 +--------------+
                 | Data Pipeline |
                 |(Cloud Pub/Sub,|
                 |Dataflow, etc.)|
                 +--------------+
                        |
                        V
                 +---------------+
                 | Data Warehouse|
                 | (BigQuery)    |
                 +---------------+
                        |
                        V
                 +---------------+
                 |  Data Reports |
                 | (Google Data  |
                 |     Studio)   |
                 +---------------+
                        |
                        V
                 +--------------+
                 |     Users    |
                 |   (Web UI)   |
                 +--------------+
```

---

# Main components of FruitScope:

```
                     +-------------------------------------+
                     |                                     |
                     |    Frontend (React Application)     |
                     |                                     |
                     +-------------------------------------+
                                  |   |   |   |   |
                                  |   |   |   |   |
                                  |   |   |   |   |
                                  |   |   |   |   |
                                  |   |   |   |   |
                     +------------|---|---|---|---|------------+
                     |            |   |   |   |   |            |
                     |            |   |   |   |   |            |
                     |            |   |   |   |   |            |
                     |            |   |   |   |   |            |
                     |            |   |   |   |   |            |
          +----------v----+       |   |   |   |   |       +----v----------+
          |               |       |   |   |   |   |       |               |
          |   Flask API   |<------+   |   |   |   +------>|  SQL Database |
          |               |           |   |   |           |               |
          +---------------+           |   |   |           +---------------+
                                      |   |   |
                                      |   |   |
                                      |   |   |
                     +----------------|---|---|------------------+
                     |                |   |   |                  |
                     |                |   |   |                  |
                     |                |   |   |                  |
                     |                |   |   |                  |
          +----------v----+           |   |   |           +------v----------+
          |               |           |   |   |           |                 |
          |  Redis Cache  |<----------+   |   +---------->|   Cloud Storage |
          |               |               |               |                 |
          +---------------+               |               +-----------------+
                                          |
                                          |
                                          |
                          +---------------v-------------------+
                          |                                   |
                          |   AI Model for Image Processing   |
                          |                                   |
                          +-----------------------------------+
```

- **Frontend:** The React-based web application that users interact with.
- **Flask API:** The backend API built with Flask that handles user requests, communicates with the SQL database, and performs calculations.
- **SQL Database:** The database where fruit data and relevant information are stored.
  - See [./db/scan.sql](./db/scan.sql) for more details on the database schema and queries.
- **Redis Cache:** A caching system to optimize and speed up data retrieval and reduce the load on the database.
  - *User Sessions:* Store user session data in Redis to manage user authentication and authorization efficiently. This can help speed up the process of verifying user access and permissions.
  - *Frequently Accessed Data:* Identify datasets that are frequently queried by users or the application. Caching this data in Redis can significantly reduce database queries, resulting in faster response times. For example, you might cache common fruit data, such as fruit names, types, or nutritional information.
  - *Search Results:* If your application includes a search functionality for fruits or orchards, you can cache search results based on user queries. This minimizes the need to re-run the same queries against the database for identical searches.
  - *Aggregated Data:* If you provide statistics or reports based on fruit data, consider caching aggregated results. For instance, you might cache daily or monthly fruit sales totals, average nutritional values, or other computed metrics.
  - *API Responses:* Cache the responses of frequently used API endpoints. This is especially useful if you have read-heavy endpoints that return static or semi-static data.
  - *Orchard and Fruit Details:* Store details about orchards, such as location, owner information, and fruit variety details. Caching this information can help reduce database queries when displaying orchard or fruit details to users.
  - *Images:* If your application serves images, like fruit photos or scans, consider caching these images in Redis to minimize the load on your storage system and improve image retrieval times.
  - *Frequently Executed Queries:* Cache the results of complex or resource-intensive database queries that are frequently executed. This can help alleviate the load on the database and improve query performance.
- **Cloud Storage:** A storage solution for storing images, data, or other assets.
- **AI Model for Image Processing:** An AI model that processes images, performs object detection, and extracts data from scans.

---

## Possible Data Ingestion Pipeline

```
  +-----------------------------------+
  |  Data Source (Robot's Scanning)   |
  +-----------------------------------+
                      |
                      v
  +-----------------------------------+
  | Data Transmission to GCP          |
  | (e.g., HTTP(s) POST, Pub/Sub)     | (MQTT, Cloud IoT Core, gRPC, Dataflow)
  +-------------------|---------------+
                      |
                      v
   +--------------------+
   | Data Ingestion     |
   | Automation         |
   | (Cloud Function    |
   | or Dataflow)       |
   +---------+----------+
             |
             |
             v
   +---------------------+
   | Google Cloud       |
   | Storage (GCS)      |
   | Data Landing Zone  |
   +----------+----------+
              |
              |
              v
   +---------------------+
   | Data Lake           |
   | (Google Cloud       |
   | Storage or BigQuery)|
   +---------------------+
              |
              |
              v
   +---------------------+
   | Google Cloud Data   |
   | Catalog             |
   | (Metadata &         |
   | Data Discovery)     |
   +----------+----------+
              |
              |
              v
   +---------------------+
   | Data Quality        |
   | Assurance           |
   | (Monitoring &       |
   | Anomaly Detection)  |
   +----------+----------+
              |
              |
              v
   +---------------------+
   | Data Retention      |
   | Policies            |
   | (Archiving &        |
   | Deletion)           |
   +----------+----------+
              |
              |
              v
   +---------------------+
   | Security Measures   |
   | (Encryption, VPN,   |
   | Access Controls)    |
   +----------+----------+
              |
              |
              v
   +---------------------+
   | Scaling and         |
   | Optimization        |
   | (Auto-Scaling)      |
   +---------------------+
              |
              |
              v
   +---------------------+
   | Documentation       |
   | (Data Schema,       |
   | Lineage, etc.)      |
   +---------------------+

```
