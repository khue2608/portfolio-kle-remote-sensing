// ==============================
// 3_FOREST_COVER_CHANGE
// ==============================


// 1. STUDY AREA
var Study_Area = ee.FeatureCollection('projects/ee-xharocar/assets/SA_Bamboo_2026');
Map.addLayer(Study_Area, {color: 'black'}, 'Study Area');
Map.centerObject(Study_Area, 12);


// 2. LOAD ALL 6 CLASSIFIED ASSETS

// 1995
// Developed by: Brenna
// Name of the script that created this asset: 1995_LandcoverMap
var classified1995 = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Classification_1995');
// 1998-9
// Developed by: Brenna
// Name of the script that created this asset: 1998-9_LandcoverMap
var classified1999 = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Classification_1998-9');
// 2002
// Developed by: Grace
// Name of the script that created this asset: 2002_LandcoverMap
var classified2002 = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Classification_2002');
// 2008-2011
// Developed by: Khue
// Name of the script that created this asset: 2008-2011 LandcoverMap
// Name of the script that generated the cloud-free composite: 
var classified2010 = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Classification_2010');
// 2016
// Developed by: Henna
// Name of the script that created this asset: 2016_LandcoverMap
var classified2016 = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Classification_2016');
// 2020
// Developed by: Brenna, Henna, Khue
// Name of the script that created this asset: 2020_LandcoverMap
var classified2020 = ee.Image('projects/ee-pacoche/assets/Pacoche_Project/Classification_2020');

//  print band names to verify
print('1995 bands', classified1995.bandNames());
print('2002 bands', classified2002.bandNames());
print('2020 bands', classified2020.bandNames());


// 3. CONVERT TO BINARY FOREST/NON-FOREST
var FOREST_CLASS = 2; 

var forest1995 = classified1995.eq(FOREST_CLASS).rename('y1995');
var forest1999 = classified1999.eq(FOREST_CLASS).rename('y1999');
var forest2002 = classified2002.eq(FOREST_CLASS).rename('y2002');
var forest2010 = classified2010.eq(FOREST_CLASS).rename('y2010');//timestamp 2008-2011
var forest2016 = classified2016.eq(FOREST_CLASS).rename('y2016');
var forest2020 = classified2020.eq(FOREST_CLASS).rename('y2020');


// 4. DISPLAY EACH BINARY MAP TO CHECK
// Green = Forest, Red = Non-Forest

Map.addLayer(forest1995, {min:0, max:1, palette:['red','green']}, 'Binary Forest 1995', false);
Map.addLayer(forest1999, {min:0, max:1, palette:['red','green']}, 'Binary Forest 1998-9', false);
Map.addLayer(forest2002, {min:0, max:1, palette:['red','green']}, 'Binary Forest 2002', false);
Map.addLayer(forest2010, {min:0, max:1, palette:['red','green']}, 'Binary Forest 2008-2011', false);
Map.addLayer(forest2016, {min:0, max:1, palette:['red','green']}, 'Binary Forest 2016', false);
Map.addLayer(forest2020, {min:0, max:1, palette:['red','green']}, 'Binary Forest 2020', false);

// 5. STACK ALL 6 BINARY MAPS
var forestStack = forest1995
  .addBands(forest1999)
  .addBands(forest2002)
  .addBands(forest2010)//2008-2011 timestamp 
  .addBands(forest2016)
  .addBands(forest2020);

print('Forest stack bands', forestStack.bandNames());

// 6. SUM ACROSS ALL 6 YEARS
// Each pixel gets 0-6
var forestTrajectory = forestStack
  .reduce(ee.Reducer.sum())
  .rename('trajectory')
  .clip(Study_Area);

print('Forest trajectory image', forestTrajectory);

// 7. DISPLAY TRAJECTORY MAP
var trajectoryVis = {
  min: 0,
  max: 6,
  palette: [
    'B2BEB5', // 0 = Continuous non-forest (red)
    'FF0000', // 1 = Forest in 1 year only
    'FFAA00', // 2 = Forest in 2 years
    '90EE90', // 3 = Forest in 3 years
    '0F0', // 4 = Shifting forest (light green)
    '228B22', // 5 = Shifting forest (medium green)
    '006400'  // 6 = Continuous forest (dark green)
  ]
};

Map.addLayer(forestTrajectory, trajectoryVis, 'Forest Trajectory 1995-2020');

// 8. CALCULATE AREA PER CLASS (hectares)
print('=== FOREST TRAJECTORY AREA (hectares) ===');

var classLabels = [
  '0 - Continuous Non-Forest',
  '1 - Forest in 1 year',
  '2 - Forest in 2 years',
  '3 - Forest in 3 years',
  '4 - Shifting Forest (4 years)',
  '5 - Shifting Forest (5 years)',
  '6 - Continuous Forest'
];

for (var i = 0; i <= 6; i++) {
  var classArea = forestTrajectory.eq(i)
    .multiply(ee.Image.pixelArea())
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: Study_Area.geometry(),
      scale: 30,
      maxPixels: 1e13
    });
  var areaHa = ee.Number(classArea.get('trajectory')).divide(10000);
  print('Class ' + classLabels[i] + ' area (ha):', areaHa);
}


// 9. ADD LEGEND TO MAP

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

legend.add(ui.Label({
  value: 'Forest Trajectory 1995-2020',
  style: {fontWeight: 'bold', fontSize: '14px', margin: '0 0 6px 0'}
}));

var legendItems = [
  {color: 'B2BEB5', label: '0 - Continuous Non-Forest'},
  {color: 'FF0000', label: '1 - Forest in 1 year only'},
  {color: 'FFAA00', label: '2 - Forest in 2 years'},
  {color: '90EE90', label: '3 - Shifting Forest(Forest in 3 years)'},
  {color: '0F0', label: '4 - Shifting Forest(Forest in 4 years)'},
  {color: '228B22', label: '5 - Shifting Forest(Forest in 5 years)'},
  {color: '006400', label: '6 - Continuous Forest'}
];

legendItems.forEach(function(item) {
  var row = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal')
  });
  row.add(ui.Label({
    style: {
      backgroundColor: '#' + item.color,
      padding: '8px',
      margin: '0 6px 4px 0'
    }
  }));
  row.add(ui.Label({
    value: item.label,
    style: {margin: '0 0 4px 0'}
  }));
  legend.add(row);
});

// Add legend to map
Map.add(legend);

// Export Image Asset
Export.image.toAsset({
  image: forestTrajectory,
  description: 'Forest_Trajectory_1995_2020',
  assetId: 'projects/ee-pacoche/assets/Pacoche_Project/Forest_Trajectory_1995_2020',
  region: Study_Area.geometry().bounds(),
  scale: 30,
  maxPixels: 1e13
});