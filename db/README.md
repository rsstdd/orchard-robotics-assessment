# Rust PostgreSQL Data Import Script

This Rust script allows you to import data from a CSV file into a PostgreSQL database. The script assumes that the CSV file contains information about scans, including latitude, longitude, measurement values, and the date of the scan.

## Prerequisites

Before running the script, ensure you have the following:

1. **Rust installed on your machine**: You can download Rust from [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install).

2. **PostgreSQL database set up with the PostGIS extension**: Install the extension by connecting to your PostgreSQL database and running:

```sql
CREATE EXTENSION postgis;
Update the PostgreSQL connection details in the script.
```

### Usage

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
```
2. Navigate to the project directory:

```bash
cd your-repo
```

3. Update the CSV file (e.g., your_modified_file.csv) with the scan data you want to import. Ensure that the file includes columns for latitude, longitude, measurement values, and the date of the scan.
4. Update PostgreSQL connection details via `.env` files
5. Run the script:

```bash
cargo run
```

The script will read data from the CSV file, calculate average size and diameter, and insert the data into the PostgreSQL database.

6. Verify the data:
  - Connect to your PostgreSQL database and check the scans table to verify that the data has been successfully imported.

### Notes
* Make sure to handle any dependencies or setup specific to your environment.
* If the date format in your CSV file is different, adjust the script accordingly.
* This is a basic example, and additional error handling or features can be added based on your specific requirements.
