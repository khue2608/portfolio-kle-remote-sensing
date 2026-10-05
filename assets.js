// ==============================
// 2_ASSETS
// ==============================


// Pacoche 
var Pacoche = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/Pacoche');
Map.addLayer(Pacoche);
Map.centerObject(Pacoche, 12);
print(Pacoche);

// Study area 
var Study_Area = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/Study_Area');
Map.addLayer(Study_Area);
Map.centerObject(Study_Area, 12);
print(Study_Area);
// ==============================

// ==============================
// XXX
// UPLOADED BY: 
// DATE:
// SOURCE: 
// ==============================

// ==============================
// FOREST / NON-FOREST TRAJECTORY 1995-2020
// UPLOADED BY: Khue
// DATE: April 26, 2026
// SOURCE: Trajectory map derived from the 6 classifications 
// ==============================
var Forest_Trajectory = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Forest_Trajectory_1995_2020');
Map.addLayer(Forest_Trajectory, {min: 0, max: 6, palette: ['FF0000','FF6600','FFAA00','90EE90','0F0','228B22','006400']}, 'Forest Trajectory 1995-2020');
print('Forest Trajectory', Forest_Trajectory);


// ==============================
// NDVI study area excluding Pacoche and the refinery - full boundaries
// UPLOADED BY: Georgia
// DATE: May 4th, 2026
// SOURCE: Modified version of Xavier's study area shapefile
// ==============================
// Modified NDVI study area shapefile
var NDVI_bounds = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/NDVI_bounds');
Map.addLayer(NDVI_bounds);
print(NDVI_bounds);


// ==============================
// NDVI study area excluding Pacoche and the refinery - northern boundaries
// UPLOADED BY: Georgia
// DATE: May 4th, 2026
// SOURCE: Modified version of Xavier's study area shapefile
// ==============================
// Northern NDVI study area shapefile
var northern_bounds = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/northern_bounds');
Map.addLayer(northern_bounds);
print(northern_bounds);


// ==============================
// NDVI study area excluding Pacoche and the refinery - southern boundaries
// UPLOADED BY: Georgia
// DATE: May 4th, 2026
// SOURCE: Modified version of Xavier's study area shapefile
// ==============================
// Southern NDVI study area shapefile
var southern_bounds = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/southern_bounds');
Map.addLayer(southern_bounds);
Map.centerObject(southern_bounds, 12);
print(southern_bounds);

