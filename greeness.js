// Modified NDVI study area shapefile
var NDVI_bounds = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/NDVI_bounds');
Map.addLayer(NDVI_bounds);
Map.centerObject(NDVI_bounds, 12);
print(NDVI_bounds);


// Northern NDVI study area shapefile
var northern_bounds = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/northern_bounds');
Map.addLayer(northern_bounds);
Map.centerObject(northern_bounds, 12);
print(northern_bounds);


// Southern NDVI study area shapefile
var southern_bounds = ee.FeatureCollection('projects/ee-pacoche/assets/Pacoche_Project/southern_bounds');
Map.addLayer(southern_bounds);
Map.centerObject(southern_bounds, 12);
print(southern_bounds);



// ========================================================================================================================
// CLOUD MASKS FOR LANDSAT 5, 7, 8
// ========================================================================================================================


// ==============================
// Landsat 5 Cloud mask function (QA_PIXEL)
// ==============================

function maskL5_TOA(image) {
  var qa = image.select('QA_PIXEL');

  var cloudShadowBitMask = 1 << 4;
  var cloudsBitMask      = 1 << 3;
  var dilatedCloudBitMask= 1 << 1;
  var cirrusBitMask      = 1 << 2;

  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
    .and(qa.bitwiseAnd(dilatedCloudBitMask).eq(0))
    .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask);}



// ==============================
// Landsat 8 Cloud mask function (QA_PIXEL)
// ==============================

function maskL8_TOA(image) {
  var qa = image.select('QA_PIXEL');

  var cloudShadowBitMask = 1 << 4;
  var cloudsBitMask      = 1 << 3;
  var dilatedCloudBitMask= 1 << 1;
  var cirrusBitMask      = 1 << 2;

  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
    .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
    .and(qa.bitwiseAnd(dilatedCloudBitMask).eq(0))
    .and(qa.bitwiseAnd(cirrusBitMask).eq(0));

  return image.updateMask(mask);}




// // ========================================================================================================================
// // CLOUD-FREE COMPOSITES IN CHRONOLOGICAL ORDER

// // 1994-1995, 1998-1999, (2001-2002, 2010, 2016-2017, 2019-2020), 2023-2024
// // ========================================================================================================================



// ==============================
// 1994-1995 NORTHERN (Landsat 5)
// ==============================

// Filter image collection to correct dates
var L5_N_1995 = ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA")
  .filterDate('1994-01-01', '1995-12-31')
  .filterBounds(northern_bounds)

// Mask out clouds & clip composite to Study Area boundary
var L5_N_cloudfree_1995 = L5_N_1995.map(maskL5_TOA).min();
var northern_1995 = L5_N_cloudfree_1995.clip(northern_bounds);

// // Add composite to map
// Map.addLayer(
//   northern_1995, 
//   {bands: ['B3','B2','B1'], min:0, max:0.3}, 
//   'L5 TOA Composite 1994–1995');

// Calculate NDVI = (NIR − Red) / (NIR + Red)
var ndvi_n_1995 = northern_1995.normalizedDifference(['B4', 'B3']).rename('Northern NDVI 1994-1995');

// Display NDVI on map
// Map.addLayer(ndvi_1995, {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'NDVI 1995')



// ==============================
// 1994-1995 SOUTHERN (Landsat 5)
// ==============================

// Filter image collection to correct dates
var L5_S_1995 = ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA")
  .filterDate('1994-01-01', '1995-12-31')
  .filterBounds(southern_bounds)

// Mask out clouds & clip composite to Study Area boundary
var L5_S_cloudfree_1995 = L5_S_1995.map(maskL5_TOA).min();
var southern_1995 = L5_S_cloudfree_1995.clip(southern_bounds);

// // Add composite to map
// Map.addLayer(
//   southern_1995, 
//   {bands: ['B3','B2','B1'], min:0, max:0.3}, 
//   'L5 TOA Composite 1994–1995');

// Calculate NDVI = (NIR − Red) / (NIR + Red)
var ndvi_s_1995 = southern_1995.normalizedDifference(['B4', 'B3']).rename('Southern NDVI 1994-1995');

// Display NDVI on map
// Map.addLayer(ndvi_1995, {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'NDVI 1995')




// ==============================
// 1998-1999 NORTHERN (Landsat 5)
// ==============================

// Filter image collection to correct dates
var L5_N_1999 = ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA")
  .filterDate('1998-01-01', '1999-12-31')
  .filterBounds(northern_bounds)

// Mask out clouds & clip composite to Study Area boundary
var L5_N_cloudfree_1999 = L5_N_1999.map(maskL5_TOA).min();
var northern_1999 = L5_N_cloudfree_1999.clip(northern_bounds);

// // Add composite to map
// Map.addLayer(
//   northern_1999, 
//   {bands: ['B3','B2','B1'], min:0, max:0.3}, 
//   'L5 TOA Composite 1998–1999');

// Calculate NDVI = (NIR − Red) / (NIR + Red)
var ndvi_n_1999 = northern_1999.normalizedDifference(['B4', 'B3']).rename('Northern NDVI 1998-1999');

// Display NDVI on map
// Map.addLayer(ndvi_n_1999, {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'Northern NDVI 1998-1999')



// ==============================
// 1998-1999 SOUTHERN (Landsat 5)
// ==============================

// Filter image collection to correct dates
var L5_S_1999 = ee.ImageCollection("LANDSAT/LT05/C02/T1_TOA")
  .filterDate('1998-01-01', '1999-12-31')
  .filterBounds(southern_bounds)

// Mask out clouds & clip composite to Study Area boundary
var L5_S_cloudfree_1999 = L5_S_1999.map(maskL5_TOA).min();
var southern_1999 = L5_S_cloudfree_1999.clip(southern_bounds);

// // Add composite to map
// Map.addLayer(
//   southern_1995, 
//   {bands: ['B3','B2','B1'], min:0, max:0.3}, 
//   'L5 TOA Composite 1994–1995');

// Calculate NDVI = (NIR − Red) / (NIR + Red)
var ndvi_s_1999 = southern_1999.normalizedDifference(['B4', 'B3']).rename('Southern NDVI 1998-1999');

// Display NDVI on map
// Map.addLayer(ndvi_s_1999, {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'Southern NDVI 1998-1999')



// ==============================
// 2023-2024 NORTHERN (Landsat 8)
// ==============================

// Filter image collection to correct dates
var L5_N_2024 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
  .filterDate('2023-01-01', '2024-12-31')
  .filterBounds(northern_bounds)

// Mask out clouds & clip composite to Study Area boundary
var L5_N_cloudfree_2024 = L5_N_2024.map(maskL5_TOA).min();
var northern_2024 = L5_N_cloudfree_2024.clip(northern_bounds);

// // Add composite to map
// Map.addLayer(
//   northern_2024, 
//   {bands: ['B4','B3','B2'], min:0, max:0.3}, 
//   'L8 TOA Composite 2023-2024');

// Calculate NDVI = (NIR − Red) / (NIR + Red)
var ndvi_n_2024 = northern_2024.normalizedDifference(['B5','B4']).rename('Northern NDVI 2023-2024');

// Display NDVI on map
// Map.addLayer(ndvi_n_2024, {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'Northern NDVI 2023-2024')



// ==============================
// 2023-2024 SOUTHERN (Landsat 8)
// ==============================

// Filter image collection to correct dates
var L5_S_2024 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
  .filterDate('2023-01-01', '2024-12-31')
  .filterBounds(southern_bounds)

// Mask out clouds & clip composite to Study Area boundary
var L5_S_cloudfree_2024 = L5_S_2024.map(maskL5_TOA).min();
var southern_2024 = L5_S_cloudfree_2024.clip(southern_bounds);

// // Add composite to map
// Map.addLayer(
//   southern_2024, 
//   {bands: ['B4','B3','B2'], min:0, max: 0.3}, 
//   'L8 TOA Composite 2023-2024');

// Calculate NDVI = (NIR − Red) / (NIR + Red)
var ndvi_s_2024 = southern_2024.normalizedDifference(['B5','B4']).rename('Southern NDVI 2023-2024');

// Display NDVI on map
// Map.addLayer(ndvi_s_1999, {min: -1, max: 1, palette: ['red', 'white', 'green']}, 'Southern NDVI 1998-1999')



  

// ========================================================================================================================
// NDVI COMPOSITE IMAGES OF THE FOLLOWING YEARS:

// 1994-1995, 1998-1999, 2023-2024
// ========================================================================================================================



// ==============================
// 1995 NORTHERN (Landsat 5)
// ==============================

// 1. Compute mean NDVI over the study area
var meanDict = ndvi_n_1995.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: northern_bounds,
  scale: 30,        // adjust to your dataset (10 for Sentinel-2, 30 for Landsat)
  maxPixels: 1e13
});

// Extract the mean value
var mean_n_NDVI_1995 = ee.Number(meanDict.get('Northern NDVI 1994-1995'));

// 2. Create anomaly image (NDVI - mean NDVI)
var ndvi_n_Anomaly_1995 = ndvi_n_1995.subtract(mean_n_NDVI_1995).rename('Northern NDVI Anomaly 1994-1995');

// 3. Visualize
Map.centerObject(NDVI_bounds, 10);
Map.addLayer(ndvi_n_1995, {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'green']
}, 'Northern NDVI 1994-1995');

Map.addLayer(ndvi_n_Anomaly_1995, {
  min: -0.3,
  max: 0.3,
  palette: ['red', 'white', 'blue']  // red = below average, white = average, blue = above
}, 'Northern NDVI Anomaly 1994-1995');

// // 4. (Optional) Export
// Export.image.toAsset({
//   image: ndviAnomaly,
//   description: 'NDVI_anomaly_map',
//   assetId: 'projects/your-project/assets/NDVI_anomaly',
//   region: Study_Area,
//   scale: 10,
//   maxPixels: 1e13
// });


// ==============================
// 1995 SOUTHERN (Landsat 5)
// ==============================

// 1. Compute mean NDVI over the study area
var meanDict = ndvi_s_1995.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: southern_bounds,
  scale: 30,        // adjust to your dataset (10 for Sentinel-2, 30 for Landsat)
  maxPixels: 1e13
});

// Extract the mean value
var mean_s_NDVI_1995 = ee.Number(meanDict.get('Southern NDVI 1994-1995'));

// 2. Create anomaly image (NDVI - mean NDVI)
var ndvi_s_Anomaly_1995 = ndvi_s_1995.subtract(mean_s_NDVI_1995).rename('Southern NDVI Anomaly 1994-1995');

// 3. Visualize
Map.centerObject(NDVI_bounds, 10);
Map.addLayer(ndvi_s_1995, {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'green']
}, 'Southern NDVI 1994-1995');

Map.addLayer(ndvi_s_Anomaly_1995, {
  min: -0.3,
  max: 0.3,
  palette: ['red', 'white', 'blue']  // red = below average, white = average, blue = above
}, 'Southern NDVI Anomaly 1994-1995');

// // 4. (Optional) Export
// Export.image.toAsset({
//   image: ndviAnomaly,
//   description: 'NDVI_anomaly_map',
//   assetId: 'projects/your-project/assets/NDVI_anomaly',
//   region: Study_Area,
//   scale: 10,
//   maxPixels: 1e13
// });



// ==============================
// 1999 NORTHERN (Landsat 5)
// ==============================

// 1. Compute mean NDVI over the study area
var meanDict = ndvi_n_1999.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: northern_bounds,
  scale: 30,        // adjust to your dataset (10 for Sentinel-2, 30 for Landsat)
  maxPixels: 1e13
});

// Extract the mean value
var mean_n_NDVI_1999 = ee.Number(meanDict.get('Northern NDVI 1998-1999'));

// 2. Create anomaly image (NDVI - mean NDVI)
var ndvi_n_Anomaly_1999 = ndvi_n_1999.subtract(mean_n_NDVI_1999).rename('Northern NDVI Anomaly 1999');

// 3. Visualize
Map.centerObject(NDVI_bounds, 10);
Map.addLayer(ndvi_n_1999, {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'green']
}, 'Northern NDVI 1998-1999');

Map.addLayer(ndvi_n_Anomaly_1999, {
  min: -0.3,
  max: 0.3,
  palette: ['red', 'white', 'blue']  // red = below average, white = average, blue = above
}, 'Northern NDVI Anomaly 1998-1999');

// // 4. (Optional) Export
// Export.image.toAsset({
//   image: ndviAnomaly,
//   description: 'NDVI_anomaly_map',
//   assetId: 'projects/your-project/assets/NDVI_anomaly',
//   region: Study_Area,
//   scale: 10,
//   maxPixels: 1e13
// });


// ==============================
// 1999 SOUTHERN (Landsat 5)
// ==============================

// 1. Compute mean NDVI over the study area
var meanDict = ndvi_s_1999.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: southern_bounds,
  scale: 30,        // adjust to your dataset (10 for Sentinel-2, 30 for Landsat)
  maxPixels: 1e13
});

// Extract the mean value
var mean_s_NDVI_1999 = ee.Number(meanDict.get('Southern NDVI 1998-1999'));

// 2. Create anomaly image (NDVI - mean NDVI)
var ndvi_s_Anomaly_1999 = ndvi_s_1999.subtract(mean_s_NDVI_1999).rename('Southern NDVI Anomaly 1998-1999');

// 3. Visualize
Map.centerObject(NDVI_bounds, 10);
Map.addLayer(ndvi_s_1999, {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'green']
}, 'Southern NDVI 1998-1999');

Map.addLayer(ndvi_s_Anomaly_1999, {
  min: -0.3,
  max: 0.3,
  palette: ['red', 'white', 'blue']  // red = below average, white = average, blue = above
}, 'Southern NDVI Anomaly 1998-1999');

// // 4. (Optional) Export
// Export.image.toAsset({
//   image: ndviAnomaly,
//   description: 'NDVI_anomaly_map',
//   assetId: 'projects/your-project/assets/NDVI_anomaly',
//   region: Study_Area,
//   scale: 10,
//   maxPixels: 1e13
// });




// ==============================
// 2023-2024 NORTHERN (Landsat 5)
// ==============================

// 1. Compute mean NDVI over the study area
var meanDict = ndvi_n_2024.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: northern_bounds,
  scale: 30,        // adjust to your dataset (10 for Sentinel-2, 30 for Landsat)
  maxPixels: 1e13
});

// Extract the mean value
var mean_n_NDVI_2024 = ee.Number(meanDict.get('Northern NDVI 2023-2024'));

// 2. Create anomaly image (NDVI - mean NDVI)
var ndvi_n_Anomaly_2024 = ndvi_n_2024.subtract(mean_n_NDVI_2024).rename('Northern NDVI Anomaly 2023-2024');

// 3. Visualize
Map.centerObject(NDVI_bounds, 10);
Map.addLayer(ndvi_n_2024, {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'green']
}, 'Northern NDVI 2023-2024');

Map.addLayer(ndvi_n_Anomaly_2024, {
  min: -0.3,
  max: 0.3,
  palette: ['red', 'white', 'blue']  // red = below average, white = average, blue = above
}, 'Northern NDVI Anomaly 2023-2024');

// // 4. (Optional) Export
// Export.image.toAsset({
//   image: ndviAnomaly,
//   description: 'NDVI_anomaly_map',
//   assetId: 'projects/your-project/assets/NDVI_anomaly',
//   region: Study_Area,
//   scale: 10,
//   maxPixels: 1e13
// });


// ==============================
// 2023-2024 SOUTHERN (Landsat 8)
// ==============================


// 1. Compute mean NDVI over the study area
var meanDict = ndvi_s_2024.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: southern_bounds,
  scale: 30,        // adjust to your dataset (10 for Sentinel-2, 30 for Landsat)
  maxPixels: 1e13
});

// Extract the mean value
var mean_s_NDVI_2024 = ee.Number(meanDict.get('Southern NDVI 2023-2024'));

// 2. Create anomaly image (NDVI - mean NDVI)
var ndvi_s_Anomaly_2024 = ndvi_s_2024.subtract(mean_s_NDVI_2024).rename('Southern NDVI Anomaly 2023-2024');

// 3. Visualize
Map.centerObject(NDVI_bounds, 10);
Map.addLayer(ndvi_s_2024, {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'green']
}, 'Southern NDVI 2023-2024');

Map.addLayer(ndvi_s_Anomaly_2024, {
  min: -0.3,
  max: 0.3,
  palette: ['red', 'white', 'blue']  // red = below average, white = average, blue = above
}, 'Southern NDVI Anomaly 2023-2024');

// // 4. (Optional) Export
// Export.image.toAsset({
//   image: ndviAnomaly,
//   description: 'NDVI_anomaly_map',
//   assetId: 'projects/your-project/assets/NDVI_anomaly',
//   region: Study_Area,
//   scale: 10,
//   maxPixels: 1e13
// });

