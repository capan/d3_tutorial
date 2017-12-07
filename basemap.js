var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;

var geoMercator = d3.geoMercator().scale(5500)
  .center( [28.739557, 39.871648] )
  .translate([300,300]);

var map_svg = d3.select("body").append("svg").attr("width",viewWidth).attr("height",viewHeight);

var g = map_svg.append("g");

var geoPath = d3.geoPath().projection(geoMercator);

g.selectAll("path")
   .data(tr_geojson.features)
   .enter()
   .append("path")
   .attr("d",geoPath)
   .attr("stroke-width", "1")
   .attr("stroke", "white");

  var g1 = map_svg.append("g");
  
  g1.selectAll("path")
   .data(airports_json.features)
   .enter()
   .append("path")
   .attr("fill","#ff0000")
   .attr("d",geoPath)
   .on("click", function() {
          var coords = d3.mouse(this);
          console.log(coords);
      });


var lineGenerator = d3.line().curve(d3.curveCardinal);
var points = [[221,138],[477,311],[941,651]];
var pathData = lineGenerator(points);
var g2 = map_svg.append("g");
var path = g2.append("path").data([points]).attr("d", d3.line());

g2.selectAll('path')
  .data(points)
  .attr('d', pathData)
  .attr("stroke", "blue")
  .attr("fill","transparent");