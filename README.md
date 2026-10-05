# Pacoche Land Cover & Vegetation Change Analysis

## Overview

This repository contains Google Earth Engine scripts developed for a remote sensing project examining **land-cover and vegetation change in the Pacoche region of coastal Ecuador**.

The project uses multi-temporal satellite imagery and classified land-cover products to investigate changes in forest cover, developed land, and vegetation condition over time. The workflow combines land-cover classification outputs, NDVI analysis, temporal trajectory mapping, and animated visualization.

This project was completed as part of my work in **Advanced Remote Sensing** and demonstrates my experience with **Google Earth Engine, Landsat imagery, vegetation indices, raster analysis, temporal change detection, and geospatial visualization**.

---

## Research Focus

The project explores how the landscape surrounding Pacoche has changed over several decades.

Major questions include:

- Where has forest cover remained stable?
- Where has forest cover been lost or regained?
- Which areas have experienced repeated transitions between forest and non-forest?
- How has vegetation greenness changed through time?
- How can multi-date land-cover classifications be summarized into meaningful long-term change patterns?

---

## Study Area

The analysis focuses on the **Pacoche region of coastal Ecuador**.

Several study-area boundaries are used depending on the analysis, including:

- Pacoche boundary
- Full project study area
- Northern analysis area
- Southern analysis area
- Modified NDVI analysis boundary

These boundaries allow vegetation and land-cover change to be evaluated across different parts of the landscape.

---

## Data

### Landsat Imagery

The vegetation analysis uses imagery from the Landsat program, including:

- **Landsat 5**
- **Landsat 8**

Cloud masking is performed using the `QA_PIXEL` quality-assurance band before image composites are generated.

The NDVI analysis includes imagery representing periods such as:

- 1994–1995
- 1998–1999
- 2023–2024

---

### Classified Land-Cover Maps

Long-term land-cover analysis uses classified raster products representing six time periods:

- 1995
- 1998–1999
- 2002
- 2008–2011
- 2016
- 2020

These classified images are converted into binary layers for temporal change analysis.

---

## Methods

### 1. Forest Cover Change

Each classified land-cover image is converted into a binary **forest / non-forest** raster.

The six binary rasters are then stacked together and summed.

For every pixel:

- `0` = never classified as forest
- `1–5` = forest during some observation periods
- `6` = forest during every observation period

This creates a **forest trajectory map** that summarizes approximately 25 years of landscape change.

The trajectory classes allow areas to be interpreted as:

- Continuous non-forest
- Intermittent or shifting forest
- Continuous forest

Area is also calculated for each trajectory class in hectares.

---

### 2. Developed / Built Land Change

A similar multi-temporal workflow is used to examine the classified developed or built land-cover class.

Binary maps from the six observation periods are stacked and summarized to identify locations where the target land-cover class appears consistently or intermittently through time.

This provides another perspective on landscape transformation within the study area.

---

### 3. NDVI Analysis

Vegetation greenness is evaluated using the **Normalized Difference Vegetation Index (NDVI)**:

**NDVI = (NIR − Red) / (NIR + Red)**

Landsat 5 and Landsat 8 require different band combinations because their sensors use different band numbering.

Cloud-free imagery is first generated for northern and southern portions of the study area.

NDVI is then calculated for multiple time periods.

---

### 4. NDVI Anomaly Mapping

To examine relative vegetation condition, mean NDVI is calculated within each analysis region.

An anomaly raster is then calculated as:

**NDVI Anomaly = Pixel NDVI − Mean NDVI**

This highlights areas with vegetation values that are:

- Below the regional average
- Near the regional average
- Above the regional average

This provides an additional way to compare spatial vegetation patterns between historical and recent imagery.

---

### 5. Forest Cover Animation

An animated visualization was created to communicate forest-cover change through time.

The animation displays classified forest conditions for:

**1995 → 1998–1999 → 2002 → 2008–2011 → 2016 → 2020**

Each frame includes the observation year and consistent map styling so that temporal changes can be visually compared.

---

## Repository Structure

```text
├── assets.js
├── BuiltChange.js
├── ForestCoverChange.js
├── GIF.js
├── greeness.js
└── README.md
```

### `assets.js`

Loads and documents major Google Earth Engine assets used throughout the project, including study-area boundaries and derived raster products.

### `ForestCoverChange.js`

Performs the multi-temporal forest-cover trajectory analysis.

Main steps include:

1. Load six classified land-cover maps
2. Convert each image to forest/non-forest
3. Stack the binary rasters
4. Calculate the number of dates each pixel was forested
5. Create a forest trajectory map
6. Calculate area by trajectory class
7. Create a map legend
8. Export the resulting raster to Google Earth Engine Assets

### `BuiltChange.js`

Applies a similar temporal trajectory workflow to the developed/built land-cover class.

### `greeness.js`

Contains the vegetation greenness workflow.

Main components include:

- Landsat 5 and Landsat 8 imagery
- QA-based cloud masking
- Multi-year image compositing
- NDVI calculation
- Separate northern and southern study-area analyses
- Mean NDVI calculation
- NDVI anomaly mapping

### `GIF.js`

Creates an animated forest-cover visualization for the six land-cover observation periods.

---

## Google Earth Engine

The analysis was developed primarily in the **Google Earth Engine JavaScript API**.

Because several scripts reference project-specific Earth Engine assets, users cloning this repository may need to replace asset paths with their own assets before running the complete workflow.

For example:

```javascript
var Study_Area = ee.FeatureCollection(
  'projects/your-project/assets/your-study-area'
);
```

---

## Remote Sensing Skills Demonstrated

This project demonstrates experience with:

- Google Earth Engine
- JavaScript for geospatial analysis
- Landsat 5 and Landsat 8 imagery
- Raster processing
- Cloud masking
- NDVI
- Vegetation-change analysis
- Land-cover classification outputs
- Binary raster reclassification
- Multi-temporal change detection
- Raster stacking
- Pixel-based trajectory analysis
- Area calculations
- Map visualization
- Google Earth Engine UI elements
- Animated geospatial visualization

---

## Key Outputs

The project produces several major outputs:

**Forest trajectory map**  
Identifies persistent forest, persistent non-forest, and areas experiencing changing forest conditions between 1995 and 2020.

**Land-cover change analysis**  
Summarizes the persistence of selected classified land-cover types across six observation periods.

**NDVI maps**  
Visualize vegetation greenness for historical and recent Landsat imagery.

**NDVI anomaly maps**  
Show areas of above- and below-average vegetation condition.

**Forest-cover GIF**  
Provides an animated visualization of forest-cover patterns from 1995 through 2020.

---

## Example Workflow

```text
Satellite Imagery / Classified Maps
                ↓
        Cloud Masking
                ↓
       Image Compositing
                ↓
   Land-Cover / NDVI Analysis
                ↓
      Temporal Comparison
                ↓
  Change & Trajectory Mapping
                ↓
      Visualization / GIF
```

---

## Tools

- **Google Earth Engine**
- **JavaScript**
- **Landsat 5**
- **Landsat 8**
- **Remote sensing**
- **GIS**
- **NDVI**
- **Land-cover change detection**

---

## Author

**Khue Le**

Geography & Data Science  
Macalester College

Interests: Remote Sensing, GIS, Environmental Data Science, Geospatial Analysis, and Machine Learning for Earth Observation

---

## Acknowledgments

This repository contains work developed as part of a collaborative remote sensing project. Some classified imagery and project assets were created collaboratively by members of the project team.

Individual scripts document contributors where applicable.