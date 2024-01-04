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

const DATABASE_URL_DEFAULT: &str = "default_value";

fn calculate_starting_volume(major: &str, minor: &str, subminor: &str) -> f64 {
    let major = major.parse::<f64>().unwrap_or_default();
    let minor = minor.parse::<f64>().unwrap_or_default();
    let subminor = subminor.parse::<f64>().unwrap_or_default();

    (4.0 / 3.0) * PI * major * minor * subminor
}

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

fn seed_database() -> Result<(), Box<dyn Error>> {
    let file = File::open("./fruit_data_takehome.csv")?;
    let mut rdr = ReaderBuilder::new().has_headers(true).from_reader(file);
    let database_url = env::var("DATABASE_URL").unwrap_or_else(|_| DATABASE_URL_DEFAULT.to_string());
    let mut client = Client::connect(&database_url, NoTls)?;

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
