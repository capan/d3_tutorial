var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;
var il;
var points;

var geoMercator = d3.geoMercator().scale(5500)
  .center([28.739557, 39.871648])
  .translate([300, 300]);


var map_svg = d3.select("body")
  .append("svg")
  .attr("width", viewWidth)
  .attr("height", viewHeight);

var g = map_svg.append("g");

var geoPath = d3.geoPath().projection(geoMercator);

//regions
var g = map_svg.append("g");
g.selectAll("path")
  .data(tr_geojson.features)
  .enter()
  .append("path")
  .attr("d", geoPath)
  .attr("stroke-width", "1")
  .attr("stroke", "white")
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut)
  .on("click", handleClick);

//airports
var g1 = map_svg.append("g");
g1.selectAll("path")
  .data(airports_json.features)
  .enter()
  .append("path")
  .attr("fill", "#ff0000")
  .attr("d", geoPath)
  .on("click", function () {
    var coords = d3.mouse(this);
    console.log(coords);

  });

//interaction
function handleMouseOver(d, i) {

  if (d.properties.name == "Tekirdağ") {
    d3.select(this).transition().
      style(
      "fill", "red"
      );



  } else if (d.properties.name == "Adana") {

    d3.select(this).transition().
      style(
      "fill", "red"
      );
    il = d.properties.name;
    if (il = "Adana") {
      points = [[941, 651], [477, 311], [221, 138]];
    } else if (il = "Tekirdağ") {
      points = [[221, 138], [477, 311], [941, 651]];
    };
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
    .style("fill", "#555")
    .style("font-family", "Arial")
    .style("font-size", 50);
}

function handleMouseOut(d, i) {
  d3.select(this).transition().style("fill", "black");
  d3.select("#fp").transition().remove();

}

function handleClick(d, i) {
  var coords = d3.mouse(this);
  document.getElementById("il").innerHTML = d.properties.name;
}