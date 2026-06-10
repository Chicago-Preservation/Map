var items = {};

$(document).ready(function(){
    console.log(map);
    reloadhtml();
});

function reloadhtml(){
    url = window.location.href;
    console.log("Current URL:", url);
    
    if (url.includes("article/")) {
        item_id = url.split("#")[1];
        var slug = item_id.replace("/article/", "");
        var parts = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
        if (parts && items[item_id] && !items[item_id][0].iconURL) {
    article_url = window.location.origin + "/" + parts[1] + "/" + parts[2] + "/" + parts[3] + "/" + parts[4] + "/";
} else {
    article_url = url.replace("/#", "");
}
        articlerender(article_url, item_id);
    } else if (url.match(/#\/\d{4}\/\d{2}\/\d{2}\//)) {
        item_id = url.split("#")[1];
        article_url = window.location.origin + item_id;
        articlerender(article_url, item_id);
    } else if (url.includes("#") == true) {
        page_url = url.replace("/#", "");
        pagerender(page_url);
    } else {
        home_url = window.location.origin + window.location.pathname + "home/"
        pagerender(home_url);
    }
};
function articlerender(articleurl, item_id){
    var marker = items ? items[item_id] : undefined;
    console.log("item_id:", item_id, "marker:", marker, "items keys:", Object.keys(items));
    console.log("Fetching:", articleurl);
    if (!marker || !marker[0]) {
    $.get(articleurl, function(data){
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var content = doc.querySelector('#sidebar-content') || doc.querySelector('.post') || doc.querySelector('#content');
        if (content) {
            $("#sidebar-content").html(content.innerHTML);
        } else {
            $("#sidebar-content").html(data);
        }
    }).fail(function(jqXHR, textStatus, error){
        console.log("Fetch failed:", articleurl, textStatus, error);
        console.log("Status code:", jqXHR.status);
    });
    $(".sidebar").scrollTop(0);
    return;
}

    var articleicon = '';
    if (marker[0].iconURL) {
        if (marker.length > 1) {
            for (var i = 0; i < marker.length; i++) {
                articleicon += "<img class='article-marker' src='" + marker[i].iconURL + "' onclick='mapClick(" + i +")'>";
                setMapView(marker[i]);
            }
        } else {
            articleicon = "<img class='article-marker' src='" + marker[0].iconURL + "' onclick='mapClick(0)'>";
            setMapView(marker[0]);
        }
    } else {
        map.closePopup();
    }

    $.get(articleurl, function(data){
        var index = data.indexOf("</h1>");
        if (index !== -1) {
            data = data.slice(0, index) + articleicon + data.slice(index);
        }
        $("#sidebar-content").html(data);
    });
    $(".sidebar").scrollTop(0);
}

function pagerender(page_url){
    $.get(page_url, function(data){
        $("#sidebar-content").html(data);
    });
    map.closePopup();
    $(".sidebar").scrollTop(0);
}

function onClick(url){
    if (url.includes("article/")) {
        item_id = url;
        var slug = url.replace("/article/", "");
        var parts = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
        if (parts && items[item_id] && !items[item_id][0].iconURL) {
            // Walking tour — convert date-slug to Jekyll date path
            article_url = window.location.origin + "/" + parts[1] + "/" + parts[2] + "/" + parts[3] + "/" + parts[4] + "/";
        } else {
            // Regular article — fetch directly
            article_url = window.location.origin + url;
        }
        articlerender(article_url, item_id);
    } else {
        page_url = window.location.origin + window.location.pathname + url;
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
    map = L.map('map', {scrollWheelZoom: true}).setView([0, 0], 1);
    items = makeMap(markergrouping, map);
}
