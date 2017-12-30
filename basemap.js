var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;
var il;
var points;

var geoMercator = d3.geoMercator().scale(5500)
  .center([28.739557, 39.871648])
  .translate([300, 300]);


var map_svg = d3.select("body")
  .append("svg")
  .attr("id","map")
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
    //console.log(coords);

  });

//interaction
function handleMouseOver(d, i) {

  isAirportInCity(d.properties.name);

  if (d.properties.name == "Tekirdağ") {
    d3.select(this).transition().
      style(
      "fill", "red"
      );
    points = [[221, 138],[941, 651]];
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
  //on mouse over title(city name)
  d3.select(this)
    .append("svg:title")
    .text(function (d) { return d.properties.name })
    .style("text-anchor", "middle")
    .style("fill", "#111")
    .style("font-family", "Arial")
    .style("font-size", 50);
}

// map_svg.selectAll(".map-label")
// 			   .data(tr_geojson.features)
// 			   .enter()
// 			   .append("text")
// 			   .classed("bar-label",true)
// 			   .attr("x",function(d,i){
//             return 100;
// 			   })
// 			   .attr("y",function(d,i){
//           return 100;
// 				})
// 			   .text(function(d,i){
// 					return d.properties.name;
// 			   })

function handleMouseOut(d, i) {
  d3.select(this).transition().style("fill", "black");
  d3.select("#fp").remove();

}

function handleClick(d, i) {
  var coords = d3.mouse(this);
  document.getElementById("il").innerHTML = d.properties.name;
}


function isAirportInCity(city){
  airports_json.features.forEach(function(element) {
      var konum = element.properties.is_in;
      //console.log(konum);
      if(konum && konum.indexOf(city) > -1 ){
        console.log(konum,city);
      }    
  });
}
