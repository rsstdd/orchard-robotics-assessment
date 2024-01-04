use std::error::Error;
use std::fs::File;
use std::f64::consts::PI;
use std::env;

use postgres::{Client, NoTls};
use csv::{ReaderBuilder};
use dotenv::dotenv;

#[derive(Debug)]
struct Scan {
    lat: String,
    lng: String,
    major_mm: String,
    minor_mm: String,
    subminor_mm: String,
    avg_diameter: String,
    volume: String,
}

const DB_URL_DEFAULT: &str = "default_value";


/// Calculate the starting volume based on major, minor, and subminor dimensions.
///
/// # Arguments
///
/// * `major` - The major dimension of the ellipsoid.
/// * `minor` - The minor dimension of the ellipsoid.
/// * `subminor` - The subminor dimension of the ellipsoid.
///
/// # Returns
///
/// Returns the calculated starting volume using the formula for an ellipsoid:
/// `Volume = (4/3) * π * major * minor * subminor`.
///
/// # Example
///
/// ```
/// let volume = calculate_starting_volume("2.0", "3.0", "4.0");
/// println!("Starting Volume: {}", volume);
/// ```
fn calculate_starting_volume(major: &str, minor: &str, subminor: &str) -> f64 {
    let major = major.parse::<f64>().unwrap_or_default();
    let minor = minor.parse::<f64>().unwrap_or_default();
    let subminor = subminor.parse::<f64>().unwrap_or_default();

    (4.0 / 3.0) * PI * major * minor * subminor
}

/// Calculate the average diameter based on major, minor, and subminor dimensions.
///
/// # Arguments
///
/// * `major` - The major dimension of the ellipsoid.
/// * `minor` - The minor dimension of the ellipsoid.
/// * `subminor` - The subminor dimension of the ellipsoid.
///
/// # Returns
///
/// Returns the calculated average diameter using the formula:
/// `Avg Diameter = (major + minor + subminor) / 3`.
///
/// # Example
///
/// ```
/// let avg_diameter = calculate_avg_diameter("2.0", "3.0", "4.0");
/// println!("Average Diameter: {}", avg_diameter);
/// ```
fn calculate_avg_diameter(major: &str, minor: &str, subminor: &str) -> f64 {
    let major = major.parse::<f64>().unwrap_or_default();
    let minor = minor.parse::<f64>().unwrap_or_default();
    let subminor = subminor.parse::<f64>().unwrap_or_default();

    (major + minor + subminor) / 3.0
}

fn main() -> Result<(), Box<dyn Error>> {
    dotenv().ok();
    seed_database()
}

/// Seed the PostgreSQL database with data from a CSV file.
///
/// # Errors
///
/// Returns a `Result` indicating success or an error encountered during the process.
///
/// # Example
///
/// ```
/// use std::error::Error;
///
/// fn main() -> Result<(), Box<dyn Error>> {
///     // Load environment variables from .env file
///     dotenv().ok();
///     // Call the seed_database function to populate the database
///     seed_database()
/// }
/// ```
fn seed_database() -> Result<(), Box<dyn Error>> {
    let file = File::open("./fruit_data_takehome.csv")?;
    let mut rdr = ReaderBuilder::new().has_headers(true).from_reader(file);
    let database_url = env::var("DB_URL").unwrap_or_else(|_| DB_URL_DEFAULT.to_string());
    println!("{:?}", database_url);
    let mut client = Client::connect(&database_url, NoTls)?;

    client.batch_execute("
        DROP TABLE IF EXISTS scans;
        CREATE TABLE scans (
            id SERIAL PRIMARY KEY,
            location POINT,
            major_mm DECIMAL(14, 3) NOT NULL,
            minor_mm DECIMAL(14, 3) NOT NULL,
            subminor_mm DECIMAL(14, 3) NOT NULL,
            avg_diameter DECIMAL(14, 3),
            volume DECIMAL(14, 3)
        );
    ")?;

    for result in rdr.records() {
        let record = result?;

        let scan = Scan {
            lat: record.get(0).unwrap_or_default().to_string(),
            lng: record.get(1).unwrap_or_default().to_string(),
            major_mm: record.get(2).unwrap_or_default().to_string(),
            minor_mm: record.get(3).unwrap_or_default().to_string(),
            subminor_mm: record.get(4).unwrap_or_default().to_string(),
            avg_diameter: calculate_avg_diameter(
                &record.get(2).unwrap_or_default().to_string(),
                &record.get(3).unwrap_or_default().to_string(),
                &record.get(4).unwrap_or_default().to_string()
            ).to_string(),
            volume: calculate_starting_volume(
                &record.get(2).unwrap_or_default().to_string(),
                &record.get(3).unwrap_or_default().to_string(),
                &record.get(4).unwrap_or_default().to_string()
            ).to_string(),
        };

        let sql = format!("INSERT INTO scans ( location, major_mm, minor_mm, subminor_mm, avg_diameter, volume) VALUES (POINT({}, {}), {}, {}, {}, {}, {})",
            &scan.lat,
            &scan.lng,
            &scan.major_mm,
            &scan.minor_mm,
            &scan.subminor_mm,
            &scan.avg_diameter,
            &scan.volume
        );

        client.execute(&sql, &[])?;
    }

    Ok(())
}
