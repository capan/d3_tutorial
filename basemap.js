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