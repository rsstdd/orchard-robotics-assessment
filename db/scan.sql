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
INSERT INTO scans (
        location,
        major_mm,
        minor_mm,
        subminor_mm,
        date_scanned
    )
VALUES (
        '(-77.0058192, 43.2431877)',
        85.08936164820400,
        85.08936164820400,
        85.08936164820400,
        '2023-12-15'
    );
CREATE INDEX idx_avg_diameter ON scans(avg_diameter);
SELECT *
FROM scans;
