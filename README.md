# Orchard Robotics Take Home Challenge

Orchard Robotics Take-Home coding challenge - building an end-to-end web application capable of predicting a harvest size estimate, given the growth rate of the fruit.

1. [GH Repo](https://github.com/rsstdd/orchard-robotics-assessment)
2. [NEXTjs Client](https://client-service-d4kjq3uwba-uw.a.run.app/)
3. [Flask API](https://server-d4kjq3uwba-uc.a.run.app/health)


## Overview
---

```
 ┌───────────────┐
 │               │
 │  Web Browser  │
 │               │
 └───────┬───────┘
         │
         ▼
┌─────────────────┐          ┌────────────────────┐
│                 │          │                    │
│ React Frontend  │◄─────────┤   Flask Backend    │
│  (Cloud Run)    │          │   (Cloud Run)      │
└─────────────────┘          └────────────────────┘
                                      │
                                      │
                          Public IP (For Now - will change to VPC)
                                      |
                                      ▼
                             ┌──────────────────────┐
                             │                      │
                             │ Google Cloud SQL DB  │
                             │                      │
                             └──────────────────────┘
                                      │
                              DB Repo mini ETL to GCP SQL
                                      │
                                      ▼
                              ┌───────────────┐
                              │               │
                              │      DB       │
                              │               │
                              └───────────────┘

```


### Part 1 – [Creating SQL database](./db/README.md)
---

Create a SQL database hosted on the internet, preferably using Google Cloud Cloud SQL. Load fruit data from a spreadsheet and structure the SQL database as you see fit. [Document and explain the database structure choices](#db).

### Part 2 – [Flask Backend](./server/README.md)
---

Spin up a Flask backend on your Google Cloud server/instance, using the smallest instance suitable. Configure it to query data from the SQL database. Ensure the application is viewable from the internet, documenting configurations made in Google Cloud's networking settings.

### Part 3 – [React Frontend](./client/README.md)
---

Build a functional frontend for the web application prioritizing functionality over form. The frontend should include date selectors, a textbox for growth rate input, a range selector, a "submit" button, and display calculated results using a histogram graph. Prioritize the display of the average fruit size in the harvest estimate.


This frontend should contain a couple components:
1. Two calendar / date selectors, one for “scan date” and another for “harvest date”
2. A textbox for inputting “fruit growth rate” as a float decimal value, in mm^3/day
3. A simple range selector for selecting a float decimal range in millimeters
  a. [0] o====o----- [20]
  b. The min/max bounds for this should be 20mm to 120mm
4. A “submit” button to calculate results
5. The ability to display a histogram graph, either as an interactive component or as a static image of a histogram graph

[See Conclusion/Client](#client)


### Part 4 – Functionality
---

When a user visits the webpage, they should select "scan date" and "harvest date" using calendar date selectors. Enter a "fruit growth rate" in cubic millimeters per day. Users can also specify a range of fruit diameters to include in the harvest size estimate. The Flask backend calculates the predicted harvest volume for applicable fruit, considering the growth rate. Display the results on the frontend, including a histogram and the average fruit size.

***Bonus Points:*** Consider adding advanced design elements, great UI/UX, and functionality beyond the core challenge. Be creative and extend the app with features you find fun, useful, or aesthetically pleasing to users.


# Conclusion

### DB

#### Why use the provided structure and calculate the volume and diameter?

The provided structure calculates the `avg_diameter` and `volume` from the ellipsoidal dimensions (`major_mm`, `minor_mm`, `subminor_mm`). This approach consolidates essential information into a single row, making it more convenient for subsequent queries and analysis. Calculating `avg_diameter` and `volume` allows for direct usage of these metrics without repeated calculations in queries, improving efficiency.

#### Why keep the `major_mm`, `minor_mm`, and `subminor_mm` columns after calculating `avg_diameter` and `volume`?

While `avg_diameter` and `volume` provide precomputed metrics, retaining the original ellipsoidal dimensions can be valuable for scenarios where users or applications may need the raw data. Keeping the actual dimensions offers flexibility and allows for alternative calculations or analyses requiring specific major, minor, and subminor dimensions.

#### Why represent `lat` and `lng` as a `POINT` type?

Representing `lat` and `lng` as a `POINT` type leverages the spatial capabilities of databases like PostgreSQL, which supports geospatial data. This design choice facilitates spatial queries, making it easier to perform location-based operations. It aligns well with scenarios where geographic information and spatial relationships are relevant, enhancing the database's versatility.

#### Strengths of this database design:

- **Efficiency:** Calculating `avg_diameter` and `volume` in advance reduces computational overhead during queries, leading to more efficient data retrieval.
- **Spatial Queries:** Representing `lat` and `lng` as a `POINT` enables efficient spatial queries for location-based analysis.
- **Flexibility:** Retaining original dimensions allows for diverse analyses, accommodating different use cases.

#### Potential shortcomings of this design:

- **Redundancy:** Storing calculated values (`avg_diameter` and `volume`) alongside the original dimensions introduces redundancy, consuming additional storage space.
- **Data Consistency:** If updates are made to the original dimensions, ensuring consistency with the calculated values might require additional measures.
- **Complexity:** Including spatial data types adds complexity and might be unnecessary if spatial queries are not a priority.

#### Conclusion:

The chosen design balances efficiency, flexibility, and spatial capabilities, but considerations should be made based on specific application requirements and priorities.

## Cloud Architecture

Using Google Cloud Run for both the client and server components of the application comes with its own set of benefits and considerations.

**Benefits:**

Cloud Run offers several advantages for hosting applications. Its scalability feature allows automatic adjustment of application resources based on incoming traffic, ensuring efficient handling of varying workloads without requiring manual intervention. Adopting a serverless model further enhances cost-effectiveness, as users only pay for the compute resources consumed during execution, making it particularly advantageous for applications with fluctuating workloads. The platform's emphasis on easy deployment, facilitated by containerization, simplifies the deployment and management processes. Additionally, Cloud Run supports a microservices architecture, providing flexibility in structuring and developing complex applications. Moreover, its seamless integration with various Google Cloud services, such as Cloud SQL and Cloud Storage, enhances the overall functionality and potential of applications hosted on Cloud Run.

**Pitfalls:**

Cloud Run, while offering various benefits, comes with certain considerations that users should be aware of. First, the platform may experience Cold Start Latency, causing a slight delay in the initial request to an idle Cloud Run service due to the time required to spin up the container. Additionally, Cloud Run imposes Resource Limitations, including a maximum request timeout and container size. Applications with specific resource requirements should carefully consider these constraints. Furthermore, Cloud Run follows a Stateless Model, making it more suitable for applications that do not heavily rely on maintaining state between requests.

**Alternatives:**

There are various alternatives to Google App Engine, each catering to different preferences and requirements. Google Kubernetes Engine (GKE) is ideal for those seeking more control over containerized applications. It offers a managed Kubernetes environment suitable for complex architectures. AWS Lambda and AWS Fargate are alternatives that provide serverless computing. Lambda is tailored for microservices, while Fargate offers a serverless container orchestration platform. It is particularly appealing to users exploring multi-cloud solutions. Another option is Heroku, a user-friendly platform-as-a-service (PaaS) known for its easy deployment and management features. However, users should consider the potential pricing implications, especially as their applications scale.

### Client

The client component of the application is a React app that uses the Google Maps API to display a map and markers for the fruit scans. It also includes a form for submitting the fruit growth rate and diameter range. The form submits a POST request to the Flask backend, which calculates the predicted harvest volume for applicable fruit, considering the growth rate. The Flask backend returns the results, which are displayed on the frontend, including a histogram and the average fruit size.

In lieu of two calendar select inputs, I chose to use a single date picker input for the scan date. The harvest date is calculated by adding 30 days to the scan date. This approach simplifies the UI and reduces the number of inputs required.

## Authors

Contributors' names and contact information:

[Ross Todd](mailto:rssmtdd@gmail.com)
