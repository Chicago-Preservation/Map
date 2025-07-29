$(document).ready(function(){
  console.log(map);
reloadhtml(); // ADD THIS LINE
});
function reloadhtml(){
    url = window.location.href;
    console.log("Current URL:", url);  // ADD THIS LINE
    
    if (url.includes("article/")) {
        article_url = url.replace("/#", "");
        item_id = url.split("#")[1];
        console.log("Article URL:", article_url);  // ADD THIS LINE
        articlerender(article_url, item_id);
    } else if (url.includes("#") == true) {
        page_url = url.replace("/#", "");
        console.log("Page URL:", page_url);  // ADD THIS LINE
        pagerender(page_url);
    } else {
        home_url = window.location.origin + window.location.pathname + "home/"
        console.log("Home URL:", home_url);  // ADD THIS LINE
        pagerender(home_url);
    }
};

function articlerender(articleurl, item_id){
    marker = items[item_id];
    if (marker.length > 1 ) {
    var articleicon = ''
    for (i = 0; i < marker.length; i++) { 
    articleicon += "<img class='article-marker' src='" + marker[i].iconURL + "' onclick='mapClick(" + i +")'>";
    setMapView(marker[i]);
	}
    } else {
    var articleicon = "<img class='article-marker' src='" + marker[0].iconURL  + "' onclick='mapClick(0)'>";
    setMapView(marker[0]);
    }
  	$.get(article_url, function(data){
    	var index = data.indexOf("</h1>");
        data = data.slice(0, index) + articleicon + data.slice(index);
        $("#sidebar-content").html(data);
    });
   $( ".sidebar" ).scrollTop(0); //tell sidebar scroll to go to the top
}

function pagerender(page_url){
	$.get(page_url, function(data){
		$("#sidebar-content").html(data);
	  });
	map.closePopup();
	$( ".sidebar" ).scrollTop(0); //tell sidebar scroll to go to the top
}

function onClick(url){
    if (url.includes("article/")) {
      item_id = url;
      article_url = window.location.origin + window.location.pathname + item_id;
      articlerender(article_url, item_id);
    } else {
    	page_url = window.location.origin + window.location.pathname + url
    	pagerender(page_url);
    }
}

function setMapView(marker){
	try { 
		markers.zoomToShowLayer(marker, function () {
      marker.openPopup();
		});
	} catch(err) {
    marker.openPopup();
	}
}

function mapClick(i){
  url = window.location.href;
  url = url.split("#");
  item_id = url[1];
  marker = items[item_id];
  setMapView(marker[i]);
};

function new_map(site_grouping){
  markergrouping = localStorage['selectedtem'];
  if (markergrouping == undefined) {
  markergrouping = site_grouping;
  } 
  map.remove();

  $('#choose').val(markergrouping);
  map = L.map('map' , {scrollWheelZoom: true}).setView([0, 0], 1);
  items = makeMap(markergrouping, map);
}

/* --- ACCORDION MENU AND LAYER CONTROL LOGIC --- */
document.addEventListener("DOMContentLoaded", function() {
    var accordions = document.getElementsByClassName("accordion-button");
    for (var i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener("click", function() {
        for (var j = 0; j < accordions.length; j++) {
          if (this !== accordions[j]) {
            accordions[j].classList.remove("active");
            accordions[j].nextElementSibling.style.maxHeight = null;
          }
        }
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }

    function setupLayerToggle(checkboxId, layer) {
        if (typeof map === 'undefined' || !map) {
            setTimeout(function() { setupLayerToggle(checkboxId, layer); }, 100);
            return;
        }
        const checkbox = document.getElementById(checkboxId);
        if (!checkbox || !layer) return;
        const toggle = () => {
            if (checkbox.checked) {
                if (!map.hasLayer(layer)) map.addLayer(layer);
            } else {
                if (map.hasLayer(layer)) map.removeLayer(layer);
            }
        };
        checkbox.addEventListener('click', toggle);
    }
    setupLayerToggle('landmarks-layer-toggle', window.landmarksLayer);
    setupLayerToggle('nr-properties-filtered-layer-toggle', window.nrPropertiesFilteredLayer);
    setupLayerToggle('nr-districts-2012-layer-toggle', window.nrDistricts2012Layer);
    setupLayerToggle('mural-registry-layer-toggle', window.muralRegistryLayer);
    setupLayerToggle('historic-resources-layer-toggle', window.historicResourcesLayer);
    setupLayerToggle('boundaries-layer-toggle', window.boundariesLayer);
});
