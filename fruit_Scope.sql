-- Drop the scans table if it exists
DROP TABLE IF EXISTS scans;

-- Create the scans table
CREATE TABLE scans (
  id SERIAL PRIMARY KEY,
  location POINT,
  major_mm DECIMAL(14, 3) NOT NULL,
  minor_mm DECIMAL(14, 3) NOT NULL,
  subminor_mm DECIMAL(14, 3) NOT NULL,
  avg_diameter DECIMAL(14, 3),
  volume DECIMAL(14, 3)
);

-- Insert data into the scans table
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

-- Create an index on avg_diameter column
CREATE INDEX idx_avg_diameter ON scans(avg_diameter);

-- Select all records from the scans table
SELECT *
FROM scans;
-- Table for Orchards
CREATE TABLE Orchards (
  OrchardID INT PRIMARY KEY,
  OrchardName VARCHAR(255) NOT NULL,
  Location VARCHAR(255) NOT NULL,
  -- Other orchard-related attributes
);

-- Table for Users
CREATE TABLE Users (
  UserID INT PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  OrchardID INT NOT NULL,
  -- Other user-related attributes
  FOREIGN KEY (OrchardID) REFERENCES Orchards(OrchardID)
);

-- Table for User Roles and Permissions (if needed)
CREATE TABLE UserRoles (
  RoleID INT PRIMARY KEY,
  RoleName VARCHAR(50) NOT NULL,
  -- Other role-related attributes
);

-- Table for Mapping Users to Roles (if needed)
CREATE TABLE UserRolesMapping (
  UserID INT NOT NULL,
  RoleID INT NOT NULL,
  PRIMARY KEY (UserID, RoleID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (RoleID) REFERENCES UserRoles(RoleID)
);

-- Example: Table for Predicted Harvest Size Estimates (Scoped to Orchard)
CREATE TABLE HarvestEstimates (
  EstimateID INT PRIMARY KEY,
  FruitID INT NOT NULL,
  EstimatedVolume DECIMAL(10, 2) NOT NULL,
  OrchardID INT NOT NULL,
  -- OrchardID to associate with the estimate
  -- Other estimate-related attributes
  FOREIGN KEY (FruitID) REFERENCES Fruits(FruitID),
  FOREIGN KEY (OrchardID) REFERENCES Orchards(OrchardID)
);

-- Table for Fruits
CREATE TABLE Fruits (
  FruitID INT PRIMARY KEY,
  OrchardID INT NOT NULL,
  ClientID INT NOT NULL,
  Latitude DECIMAL(10, 6) NOT NULL,
  Longitude DECIMAL(10, 6) NOT NULL,
  MajorAxis DECIMAL(10, 2) NOT NULL,
  MinorAxis DECIMAL(10, 2) NOT NULL,
  SubminorAxis DECIMAL(10, 2) NOT NULL,
  ScanDate DATE NOT NULL,
  HarvestDate DATE NOT NULL,
  GrowthRate DECIMAL(10, 2) NOT NULL,
  -- Other fruit-related attributes
  FOREIGN KEY (OrchardID) REFERENCES Orchards(OrchardID),
  FOREIGN KEY (ClientID) REFERENCES Clients(ClientID)
);

-- Indexes for Fruits table
CREATE INDEX idx_OrchardID ON Fruits (OrchardID);
CREATE INDEX idx_ClientID ON Fruits (ClientID);
CREATE INDEX idx_ScanDate ON Fruits (ScanDate);
CREATE INDEX idx_HarvestDate ON Fruits (HarvestDate);
CREATE INDEX idx_GrowthRate ON Fruits (GrowthRate);

-- Additional tables and relationships can be added as needed for advanced functionality.
-- Example: Table for Predicted Harvest Size Estimates
CREATE TABLE HarvestEstimates (
  EstimateID INT PRIMARY KEY,
  FruitID INT NOT NULL,
  EstimatedVolume DECIMAL(10, 2) NOT NULL,
  -- Other estimate-related attributes
  FOREIGN KEY (FruitID) REFERENCES Fruits(FruitID)
);

-- Example: Table for User Authentication and Authorization (if needed)
CREATE TABLE Users (
  UserID INT PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
  PasswordHash VARCHAR(255) NOT NULL,
  -- Other user-related attributes
);
