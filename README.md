Mapping Chicago Preservation
Developer Guide: Adding Research Projects to the Map
For Research Assistants and Future Contributors
mappingchicagopreservation.org
 
Overview
This guide explains how to add new research content to the Research Projects section of Mapping Chicago Preservation. There are two formats for contributing content:

Format A: Jekyll Post
A single-pin article post (used by Legacy Business and Walking Tour stops)
Best for: individual site profiles, business histories, single-location projects	Format B: Custom GeoJSON Layer
A dedicated map layer with its own GeoJSON file and landing page
Best for: datasets with many points, thematic collections, multi-stop tours

Both formats require edits to three places: the repository files (content), map.html (the map), and the legend (the layer toggle). This guide walks through each.

BEFORE YOU START: You will need access to the GitHub repository at
github.com/Chicago-Preservation/Map
Ask the project director for collaborator access if you do not already have it.
All file edits should be made in a branch and submitted as a pull request.

 
Site Structure
Understanding where things live in the repository:

Folder / File	What it contains
_posts/	Individual article posts (Legacy Business, Walking Tour stops, etc.)
GeoJson_files_layers/	All GeoJSON data files loaded by the map
images/	All images used in posts and pages
map.html	The main map page — layer code, legend, popup logic
_includes/menu.html	Top navigation bar
css/main.css	Site-wide styles
*.md (root folder)	Landing pages (Home, Map Layers, Lost Chicago, etc.)

 
Format A: Adding a Single-Pin Article Post
Use this format for individual site profiles — a Legacy Business, a notable building, a single research subject with one map location. This is the same format used by the existing Legacy Business posts.
Step 1: Create the Post File
Create a new file in the _posts/ folder. The filename must follow this exact format:
YYYY-MM-DD-title-of-post.md
Example: 2026-04-15-the-berghoff.md

Every post must begin with a front matter block between triple dashes. Copy and fill in this template:

---
layout: post
title: "The Name of the Business or Site"
date: 2026-04-15
categories: ["Legacy Business"]     # or ["Walking Tours"] etc.
author: "Student First Last"
lat: 41.878000                       # latitude of the site
lng: -87.629000                      # longitude of the site
runningtitle: "Short Display Name"
desc: "One to two sentence description. This appears in the map popup."
---

After the front matter, write the post content in Markdown. Use #### for section headers. Add images like this:
![Alt text description]({{site.baseurl}}/images/yourimage.jpg)
{:.image}
Caption text here
{:.caption}

Step 2: Add Images
Upload all images referenced in the post to the images/ folder in the repository. Name them clearly using the pattern:
lastname_##_placename.jpg
Example: valente_01_berghoff_exterior.jpg

Step 3: Get Coordinates
You need the latitude and longitude of the site for the lat: and lng: fields in the front matter. The easiest ways to get these:
•	Google Maps: right-click any location and click the coordinates at the top of the menu to copy them
•	geojson.io: click any point on the map to see its coordinates

Chicago coordinate ranges:
Latitude:  41.6 to 42.1  (north-south)
Longitude: -88.0 to -87.4  (east-west, always negative)
If your coordinates fall outside these ranges, something is wrong.

Step 4: Verify the Post Appears
Once you push the file to the repository, Jekyll will build the site and the post will:
•	Appear in the Research Projects article index automatically (the index loops through all _posts/)
•	Show as a pin on the map under the correct category layer
•	Be clickable from the map to load the post in the sidebar

No changes to map.html or the legend are needed for Format A — the category layer is built automatically from Jekyll categories.

 
Format B: Adding a Custom GeoJSON Layer
Use this format when you have a dataset with many points, a thematic collection, or a multi-stop tour that needs its own dedicated map layer, landing page, and legend entry. Examples: Lost Chicago, Walking Tours.
Step 1: Prepare the GeoJSON File
Your data must be in GeoJSON format with Point geometry. Each feature should have a properties object with the fields you want to display in the popup. At minimum:
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [longitude, latitude] },
      "properties": {
        "name": "Site Name",
        "address": "123 W. Example St.",
        "description": "Brief description of the site.",
        "img_url": "https://example.com/image.jpg",
        "source_url": "https://example.com/source"
      }
    }
  ]
}

Note: coordinates are [longitude, latitude] — longitude first. This is the GeoJSON standard and opposite to how Google Maps displays them.

If you have data in a spreadsheet with lat/lon columns, you can convert it to GeoJSON using the Python script below. Save it as csv_to_geojson.py and run it:
python csv_to_geojson.py mydata.csv output.geojson

# csv_to_geojson.py
import csv, json
with open("mydata.csv", encoding="utf-8-sig") as f:
    rows = list(csv.DictReader(f))
features = []
for r in rows:
    try: lon, lat = float(r["lon"]), float(r["lat"])
    except: continue
    features.append({
        "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [lon, lat]},
        "properties": {k: v.strip() or None for k, v in r.items()}
    })
with open("output.geojson", "w") as f:
    json.dump({"type": "FeatureCollection", "features": features}, f)

Upload the finished GeoJSON file to the GeoJson_files_layers/ folder in the repository.

Step 2: Create a Landing Page
Create a new .md file in the root folder of the repository. This page will appear in the sidebar when the layer is toggled on. Use this template:

---
layout: page
title: "Your Layer Name"
permalink: /your-layer-name/
---

<h2>Your Layer Name</h2>

<p>
  One or two sentences describing what this layer maps and why it matters.
</p>

<p>
  Toggle the <strong>Your Layer Name</strong> layer in the map legend to
  explore the sites spatially. Click any pin to view details.
</p>

<h3>About the Project</h3>
<p>
  Who produced this data, when, and in what context.
</p>

Step 3: Add the Layer to map.html
Open map.html in the repository. You will make additions in three places. Search for the Lost Chicago layer code as a reference — your additions follow the same pattern.

3a. Add the layer variable and fetch (after the Lost Chicago fetch block)
var myNewLayer = L.geoJSON(null, {
  options: { name: "My New Layer" },
  onEachFeature: function (feature, layer) {
    var p = feature.properties;
    var html = '';
    if (p.name)        html += '<strong>' + p.name + '</strong><br>';
    if (p.address)     html += '<em>Address:</em> ' + p.address + '<br>';
    if (p.description) html += p.description + '<br>';
    if (p.source_url)  html += '<a href="' + p.source_url + '" target="_blank">Source</a>';
    layer.bindPopup(html || '<em>No details available</em>');
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 6, fillColor: '#YOUR_COLOR', color: '#333333',
      weight: 1, opacity: 1, fillOpacity: 0.85
    });
  }
});

fetch('GeoJson_files_layers/your-file.geojson')
  .then(response => response.json())
  .then(data => {
    myNewLayer.addData(data);
    myNewLayer.bringToFront();
  });

3b. Add a trigger function (alongside triggerLostChicago)
function triggerMyNewLayer() {
  setTimeout(function() {
    if (typeof myNewLayer !== 'undefined' && typeof map !== 'undefined') {
      map.addLayer(myNewLayer);
      myNewLayer.bringToFront();
      document.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
        if (cb.parentElement.textContent.trim().includes('My New Layer')) {
          cb.checked = true;
        }
      });
    }
  }, 300);
}

3c. Add the show/hide sidebar trigger in the checkbox onchange handler
Find the section that contains the Lost Chicago show/hide block. Add your layer alongside it:
// In the checkbox onchange handler — checked branch:
if (subOption.layer === myNewLayer) {
  onClick('/your-layer-name/');
}

// In the else branch (unchecking) — optional, can be left empty:
if (subOption.layer === myNewLayer) {
  // no action needed on uncheck
}

Step 4: Add to the Legend
Find the legendData array in map.html. Inside the Research Projects category, add your layer entry alongside Lost Chicago and Walking Tours:
{ name: '<a href="{{site.baseurl}}/#/your-layer-name/"
       onclick="onClick(\'/your-layer-name/\'); triggerMyNewLayer();">
  My New Layer</a>',
  layer: myNewLayer },

Step 5: Add to the Article Index (optional)
If you want the layer to appear as a linked entry in the Research Projects page (article-index.html), add it to the Featured Projects section:
<li>
  <a href="{{site.baseurl}}/#/your-layer-name/"
     onclick='onClick("/your-layer-name/"); triggerMyNewLayer();'>
    My New Layer — Brief description or contributor name
  </a>
</li>

 
Special Case: Adding a Walking Tour
Walking tours use a hybrid format: each tour is a Jekyll post (Format A) AND contributes stop points and a route line to the shared Walking_Tours.geojson (Format B). The post handles the full written content; the GeoJSON handles the map visualization.
Step 1: Create the Post
Follow Format A above. Use category: ["Walking Tours"] in the front matter. The lat/lng should be the centroid (average) of all stop coordinates. The desc should summarize the tour in 1-2 sentences.

Step 2: Add Stops to Walking_Tours.geojson
Open GeoJson_files_layers/Walking_Tours.geojson. Add two types of features for your tour:

1. A LineString connecting all stops in order (the route line):
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [[lon1,lat1], [lon2,lat2], [lon3,lat3] ...]
  },
  "properties": {
    "tour_id": "lastname-neighborhood-year",
    "tour_name": "Neighborhood Walking Tour",
    "author": "Student Name",
    "neighborhood": "Neighborhood Name",
    "feature_type": "route",
    "post_url": "/YYYY/MM/DD/post-filename/",
    "stop_count": 8
  }
}

2. A Point for each stop:
{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [longitude, latitude] },
  "properties": {
    "tour_id": "lastname-neighborhood-year",
    "tour_name": "Neighborhood Walking Tour",
    "author": "Student Name",
    "neighborhood": "Neighborhood Name",
    "feature_type": "stop",
    "stop_number": 1,
    "name": "Stop Name",
    "address": "123 W. Example St.",
    "description": "1-2 sentence description of the stop.",
    "post_url": "/YYYY/MM/DD/post-filename/"
  }
}

Step 3: Add Tour Color
In map.html, find the tourColors dictionary and add your tour's color:
var tourColors = {
  'azghandi-avondale-2025':       '#c77dff',
  'koyuncul-fulton-market-2025':  '#f4a261',
  'your-lastname-neighborhood-year': '#YOUR_HEX_COLOR',
};
Choose a color that is distinct from existing tours and from the other map layers. Suggested palette for future tours:
•	#52b788  (green)
•	#4cc9f0  (sky blue)
•	#e63946  (red)
•	#ffd166  (yellow)
•	#06d6a0  (teal)

Step 4: Update the Walking Tours Landing Page
Open walking-tours.md in the repository root. Add your tour to the Current Tours list:
<li><strong>Neighborhood Name</strong> — Student Name: One sentence summary.</li>

 
Quick Reference: File Checklist

Format A — New Jekyll Post:
1.	_posts/YYYY-MM-DD-title.md  (the post file)
2.	images/filename.jpg  (any images used in the post)
3.	No map.html changes needed

Format B — New GeoJSON Layer:
4.	GeoJson_files_layers/your-file.geojson  (the data)
5.	your-landing-page.md  (landing page in repo root)
6.	map.html  — add layer variable, fetch, trigger function, onchange handler, legend entry
7.	article-index.html  — add to Featured Projects list  (optional)

Walking Tour (both formats):
8.	_posts/YYYY-MM-DD-neighborhood-walking-tour.md  (the post)
9.	images/lastname_##_placename.png  (extracted images)
10.	GeoJson_files_layers/Walking_Tours.geojson  (add route + stops)
11.	map.html  — add tour color to tourColors dictionary
12.	walking-tours.md  — add tour to the Current Tours list

 
Troubleshooting

Problem	Solution
Post does not appear in article index	Check that the filename is YYYY-MM-DD-title.md and the front matter categories field matches exactly (case-sensitive)
Map pin does not appear	Check lat/lng values are within Chicago bounds (lat 41.6-42.1, lng -87.4 to -88.0). Check that the GeoJSON file is in the correct folder.
Popup shows "No details available"	The property names in your GeoJSON must match the names used in the onEachFeature function in map.html (e.g. p.name, p.address)
Sidebar page does not load on layer toggle	Check the permalink in the .md front matter matches the URL in the onClick() call exactly, including trailing slash
GeoJSON layer does not appear on map	Check the filename in the fetch() call matches the actual filename in GeoJson_files_layers/ exactly (case-sensitive)
Walking tour stops appear but route line is missing	Check that the LineString feature exists in Walking_Tours.geojson with feature_type: "route" and that coordinates are in [lon, lat] order
Legend checkbox is not checked on load	Only Landmarks and NR Properties layers are checked on load by default. To auto-check a new layer, add map.addLayer(yourLayer) inside the relevant fetch .then() block

 
Questions and Support
For questions about the site architecture, data formats, or contribution guidelines:

•	Submit an inquiry via the site's contact page: mappingchicagopreservation.org/#/Inquiries-and-feedback/
•	Review the project repository README at github.com/Chicago-Preservation/Map
•	For questions about specific datasets or research content, contact the project director

This guide was prepared for Mapping Chicago Preservation. Last updated June 2026.

