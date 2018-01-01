var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;
var il;
var points;


var geoMercator = d3.geoMercator().scale(5500)
  .center([28.739557, 39.871648])
  .translate([300, 300]);
var map_svg = d3.select("body")
  .append("svg")
  .attr("id", "map")
  .attr("width", viewWidth)
  .attr("height", viewHeight);
var geoPath = d3.geoPath().projection(geoMercator);
// drawing regions
var g = map_svg.append("g");
g.selectAll("path")
  .data(tr_geojson.features)
  .enter()
  .append("path")
  .attr("d", geoPath)
  .classed("region-st", true)
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut)
  .on("click", handleClick);
// drawing airports
var g1 = map_svg.append("g");
g1.selectAll("path")
  .data(airports_json.features)
  .enter()
  .append("path")
  .attr("d", geoPath)
  .classed("airport-st", true)
  .on("click", function () {
    var coords = d3.mouse(this);

    console.log("mouse koordinatları :", coords);
  });

//interaction
function handleMouseOver(d, i) {

  APCentroid(d.properties.name);

  if (d.properties.name == "Tekirdağ") {
    d3.select(this).transition().
      style(
      "fill", "red"
      );
    points = [[221, 138], [941, 651]];
    myTransition(points);
  } else if (d.properties.name == "Adana") {
    d3.select(this).transition().
      style(
      "fill", "red"
      );
    il = d.properties.name;
    points = [[941, 651], [221, 138]];
    myTransition(points);
  }
  else {
    var coords = d3.mouse(this);
    d3.select(this).transition().
      style(
      "fill", "orange"
      );
  }

  d3.select(this)
    .append("svg:title")
    .text(function (d) { return d.properties.name })
    .style("text-anchor", "middle")
    .style("fill", "#111")
    .style("font-family", "Arial")
    .style("font-size", 50);
}

function handleMouseOut(d, i) {
  d3.select(this).transition().style("fill", "black");
  d3.select("#fp").remove();

}

function handleClick(d, i) {
  var coords = d3.mouse(this);
  document.getElementById("il").innerHTML = d.properties.name;
}


function isAirportInCity(city) {
  airports_json.features.forEach(function (element) {
    var konum = element.properties.is_in;
    //console.log(konum);
    if (konum && konum.indexOf(city) > -1) {
      console.log(konum, city);
    }
  });
}

function APCentroid(city) {
  airports_json.features.forEach(function (element) {
    //all coordinates assigned to an array
    var cx = [];
    var cy = [];
    var coordArray = element.geometry.coordinates[0];
    var airportName = element.properties.Name;
    clistLength = coordArray.length;
    for (i = 0; i < clistLength; i++) {
      var c = coordArray[i];
      cx[i] = c[0];
      cy[i] = c[1];
    }
    var sumx = arraySum(cx);
    var sumy = arraySum(cy);
    var meanx = sumx / clistLength;
    var meany = sumy / clistLength;

    // there will a for loop in here to calculate centroids of airports
    console.log("Airport Name : ",airportName,"Mean Longitude:  ", meanx,"Mean Latitude : ",meany);
 }
  )
}

function arraySum(someArray) {
  sum = someArray.reduce((a, b) => a + b, 0);
  return sum;
}