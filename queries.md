## Possible Queries for Fruit Harvest Estimates

Also see (swagger)[./swagger.yaml]

1. **Data Retrieval Queries:**
   - **Get Fruit Data:** Retrieve data related to specific fruits, including their location, size, maturity status, and other attributes.
     - SQL `SELECT * FROM Fruits WHERE FruitID = {fruit_id};`
     - URL: `/api/fruits/{fruit_id}`
   - **Fetch Orchard Information:** Obtain information about the orchard where the fruits are grown, including its location and characteristics.
     - SQL: `SELECT * FROM Orchards WHERE OrchardID = {orchard_id};`
     - URL: `/api/orchards/{orchard_id}`
   - **Access Historical Data:** Retrieve historical data about past fruit scans, including size, growth rate, and maturity progression.
     - SQL: `SELECT * FROM scans WHERE FruitID = {fruit_id} ORDER BY date_scanned ASC;`
     - URL: `/api/scans/{fruit_id}/history`

2. **Filtering and Aggregation Queries:**
   - **Filter by Orchard:** Select fruits and data from a specific orchard or group of orchards.
     - SQL: `SELECT * FROM Fruits WHERE OrchardID = {orchard_id};`
     - URL: `/api/fruits?orchard_id={orchard_id}`
   - **Filter by Date Range:** Retrieve data for a specific time period, allowing users to analyze historical trends.
     - SQL: `SELECT * FROM Fruits WHERE ScanDate BETWEEN {start_date} AND {end_date};`
     - URL: `/api/fruits?start_date={start_date}&end_date={end_date}`
   - **Aggregate by Fruit Type:** Group fruits by their type or variety to calculate estimates separately for different fruit categories.
     - SQL: `SELECT FruitType, COUNT(*) AS TotalFruits FROM Fruits GROUP BY FruitType;`
     - URL: `/api/fruits/aggregates/fruit_type`
   - **Aggregate by Orchard:** Calculate estimates for each orchard separately to assess their individual performance.
     - SQL: `SELECT OrchardID, COUNT(*) AS TotalFruits FROM Fruits GROUP BY OrchardID;`
     - URL: `/api/fruits/aggregates/orchard`


3. **Estimation Queries:**
   - **Calculate Estimated Harvest Size:** Use mathematical formulas or algorithms to estimate the expected harvest size based on fruit size, growth rate, and maturity.
     - SQL: `SELECT FruitID, (MajorAxis * MinorAxis * SubminorAxis * GrowthRate) AS EstimatedSize FROM Fruits;`
     - URL: `/api/fruits/estimated_harvest_size`
   - **Predict Maturity Date:** Estimate the date at which fruits will reach optimal maturity for harvesting.
     - SQL: `SELECT FruitID, (ScanDate + INTERVAL 'X days') AS PredictedMaturityDate FROM Fruits;`
     - URL: `/api/fruits/predicted_maturity_date`
   - **Assess Quality:** Analyze fruit attributes to assess their quality and market readiness.
     - SQL: `SELECT FruitID, CASE WHEN QualityAttribute > {threshold} THEN 'Good' ELSE 'Poor' END AS QualityAssessment FROM Fruits;`
     - URL: `/api/fruits/quality_assessment`

4. **Comparative Queries:**
   - **Compare Orchards:** Compare the estimated harvest sizes and maturity levels between different orchards.
    - SQL: `SELECT OrchardID, AVG(GrowthRate) AS AverageGrowthRate FROM Fruits GROUP BY OrchardID;`
    - URL: `/api/orchards/compare`
   - **Compare Varieties:** Evaluate how different fruit varieties within the same orchard perform in terms of estimated harvest size and maturity.
    - SQL: `SELECT FruitType, AVG(GrowthRate) AS AverageGrowthRate FROM Fruits GROUP BY FruitType;`
    - URL: `/api/fruits/compare_varieties`

5. **Visualization Queries:**
   - **Generate Charts and Graphs:** Create visual representations of the estimated harvest size over time, allowing users to visualize trends and make informed decisions.
     - SQL: `SQL Query: (Depends on charting library used)`
     - URL: `/api/fruits/charts` (Depends on the charting library used)
   - **Heatmaps:** Generate heatmaps to visualize the distribution of fruit maturity across an orchard.
     - SQL: `SQL Query: (Depends on charting library used)`

6. **User-Specific Queries:**
   - **User-Based Access:** Implement queries that retrieve data specific to a particular user or client, ensuring data privacy and security.
     - `SELECT * FROM Fruits WHERE UserID = {user_id};`
     - URL: `/api/fruits?user_id={user_id}`
   - **Client-Specific Estimates:** Allow clients to access estimates for their own orchards or fruit types.
     - `SELECT * FROM HarvestEstimates WHERE ClientID = {client_id};`
     - URL: `/api/harvest_estimates?client_id={client_id}`

7. **Notification Queries:**
   - **Alerts and Notifications:** Implement queries to trigger alerts or notifications when certain conditions are met, such as when fruits reach the desired maturity level or when estimated harvest size exceeds a threshold.
     - SQL: `SQL Query: (Depends on the trigger and notification mechanism used)`
     - URL: `/api/notifications` (Depends on the trigger and notification mechanism used)

8. **Historical Analysis Queries:**
   - **Trend Analysis:** Analyze historical data to identify trends in fruit growth and maturity, helping users make informed decisions for future harvests.
     - SQL: `SQL Query: (Depends on the specific analysis required)`
     - URL: `/api/fruits/trend_analysis` (Depends on the specific analysis required)


9. **Performance Optimization Queries:**
   - **Optimize Data Retrieval:** Implement queries that optimize data retrieval and processing for improved performance, especially when dealing with large datasets.
     - SQL: `SQL Query: (Optimizations may involve indexing, caching, or database tuning)`
     - URL: `/api/fruits/optimize` (Optimizations may involve indexing, caching, or database tuning)
