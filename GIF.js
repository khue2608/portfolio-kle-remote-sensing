var text = require('users/gena/packages:text');


var TITLE       = 'Pacoche Forest Cover';  
var TITLE_SCALE = 30;   // 
var YEAR_SCALE  = 42;   // size of the year number
var HEADER_FRAC = 0.18; // height of the white header strip (fraction of the map).
                        
// ------------------------------------------------------

// ---- data ----
var Study_Area = ee.FeatureCollection('projects/ee-xharocar/assets/SA_Bamboo_2026');
var years = ['1995', '1998-9', '2002', '2008-2011', '2016', '2020'];
var ids = [
  'projects/ee-pacoche/assets/Pacoche_Project/Classification_1995',
  'projects/ee-pacoche/assets/Pacoche_Project/Classification_1998-9',
  'projects/ee-pacoche/assets/Pacoche_Project/Classification_2002',
  'projects/ee-pacoche/assets/Pacoche_Project/Classification_2010', // 2008-2011
  'projects/ee-pacoche/assets/Pacoche_Project/Classification_2016',
  'projects/ee-pacoche/assets/Pacoche_Project/Classification_2020'
];
var FOREST_CLASS = 2;
var forestList = ids.map(function(id) { return ee.Image(id).eq(FOREST_CLASS); });
var forestVis = {min: 0, max: 1, palette: ['B2BEB5', '006400']}; // grey = non-forest, green = forest

// ---- map extent ----
var region = Study_Area.geometry().bounds();
var ring = ee.List(ee.List(region.coordinates()).get(0));
var xs = ring.map(function(p) { return ee.List(p).get(0); });
var ys = ring.map(function(p) { return ee.List(p).get(1); });
var minX = ee.Number(xs.reduce(ee.Reducer.min()));
var maxX = ee.Number(xs.reduce(ee.Reducer.max()));
var minY = ee.Number(ys.reduce(ee.Reducer.min()));
var maxY = ee.Number(ys.reduce(ee.Reducer.max()));
var boxW = maxX.subtract(minX);
var boxH = maxY.subtract(minY);
var headerH = boxH.multiply(HEADER_FRAC);
var expMaxY = maxY.add(headerH);

var expRegion = ee.Geometry.Polygon([[
  [minX, minY], [maxX, minY], [maxX, expMaxY], [minX, expMaxY], [minX, minY]
]], null, false);

//background
var black = ee.Image([0, 0, 0]).byte().rename(['vis-red', 'vis-green', 'vis-blue']);

// ---- title: left-aligned, up in the header strip ----
var titlePt = ee.Geometry.Point([minX.add(boxW.multiply(0.05)),
                                 maxY.add(headerH.multiply(0.66))]);
var titleImg = text.draw(TITLE, titlePt, TITLE_SCALE, {fontSize: 32, textColor: 'green'});

// ---- year: left-aligned, lower in the header strip (changes each frame) ----
var yearLon = minX.add(boxW.multiply(0.05));
var yearLat = maxY.add(headerH.multiply(0.28));

var frames = ee.ImageCollection.fromImages(
  forestList.map(function(img, i) {
    var pic  = img.clip(Study_Area).visualize(forestVis);
    var base = black.blend(pic);                         
    var yr   = text.draw(years[i], ee.Geometry.Point([yearLon, yearLat]),
                         YEAR_SCALE, {fontSize: 32, textColor: '006400'});
    return base.blend(titleImg).blend(yr);
  })
);

// ---- animation settings ----
var gifParams = {
  region: expRegion,
  dimensions: 1000,      // long side in px
  framesPerSecond: 1.5,  // ~0.7 s per year
  crs: 'EPSG:3857'
};

print('Forest change GIF:');
print(ui.Thumbnail({image: frames, params: gifParams}));
print('Download the GIF:', frames.getVideoThumbURL(gifParams));