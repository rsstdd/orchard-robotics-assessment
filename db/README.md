# Rust PostgreSQL Data Import - Orchard Robotics

This Rust script enables the import of data from a CSV file into a PostgreSQL database. The script assumes the CSV file contains scan information, including latitude, longitude, measurement values, and the scan date.

## Prerequisites

Before running the script, ensure the following:

1. **Rust installed on your machine**: Download Rust from [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install).

2. **PostgreSQL database set up with the PostGIS extension**: Install the extension by connecting to your PostgreSQL database and running:

```sql
CREATE EXTENSION postgis;
```

### Usage

1. Clone the repository to your local machine:

```bash
gh repo clone rsstdd/orchard-robotics-assessment
```

2. Navigate to the project directory
3. Update the CSV file (e.g., your_modified_file.csv) with the scan data to import. Ensure the file includes columns for latitude, longitude, measurement values, and the scan date.
4. Update PostgreSQL connection details via `.env` files. Reference `.env.template` for an example.
5. Run the script:

```bash
cargo run
```

The script reads data from the CSV file, calculates the starting volume and the diameter
of the fruit before inserting the data into the PostgreSQL database.

6. Verify the data:
  - Connect to your PostgreSQL database and check the scans table to confirm that the data has been successfully imported.

### Notes
* Ensure you handle any dependencies or setup specific to your environment.
* If the date format in your CSV file differs, adjust the script accordingly.
* This is a basic example, and additional error handling or features can be added based on your specific requirements.
