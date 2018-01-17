var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;
var il;
var points;
var airportPoints = []; var j = 0; var newArray = [];
var dynamicFlightRoute = []; var destinationArray = [];
// d3.select(window).on("load", APCentroid(true));
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
  var airportObjects = [];
  console.log(dynamicFlightRoute, airportObjects, destinationArray);
  // dynamicFlightRoute.length = 0; airportObjects.length = 0; destinationArray.length = 0;
  dynamicFlightRoute = destinationFunction(d.properties.name);
  airportObjects = APMeanCoord(dynamicFlightRoute);
  console.log(airportObjects);

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
  //city label on mouse over
  d3.select(this)
    .append("svg:title")
    .text(function (d) { return d.properties.name })
}

function handleMouseOut(d, i) {
  dynamicFlightRoute = []; airportObjects = [];
  d3.select(this).transition().style("fill", "black");
  d3.select("#fp").remove();

}

function handleClick(d, i) {
  var coords = d3.mouse(this);
  document.getElementById("il").innerHTML = d.properties.name;
}

function destinationFunction(name) {
  var i = 0;
  route_json.routes.forEach(function (element) {
    if (element.Origin == name) {
      destinationArray.push(element.Destination) ;
      i++;
    }
  }
  )
  return destinationArray;
}

function APMeanCoord(someArray) {
  airportPoints.length = 0;
  var data = filterByName(someArray);
  // console.log(destinationPorts);
  var destinationPorts = data.filter(function (element) {
    return element !== undefined;
  });

  destinationPorts.forEach(function (element) {

    //all coordinates assigned to an array
    var cx = [];
    var cy = [];
    var coordArray = element.geometry.coordinates[0];
    var airportName = element.properties.is_in;
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
    airportPoints[j] = [airportName, meanx, meany];
    j++;
  }
  )
  return airportPoints;

}


function filterByName(destArray) {
  for (i = 0; i <= destArray.length-1; i++) {
    newArray[i] = airports_json.features.find(function (element) {
      if (element.properties.is_in === destArray[i]) {
        console.log('v_v Match :', element.properties.is_in);
        return element;
      }
      console.log(')V_v( No Match :', element.properties.is_in);
    }
    );
  }
  return newArray;
}

//finding summation of an array
function arraySum(someArray) {
  sum = someArray.reduce((a, b) => a + b, 0);
  return sum;
}