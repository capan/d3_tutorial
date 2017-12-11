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
   .attr("stroke", "white")
   .on("mouseover",handleMouseOver)
   .on("mouseout",handleMouseOut);




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




    function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size
            d3.select(this).attr(
              "fill", "orange"
            );

            // Specify where to put label of text
             map_svg.append("text").attr({
             id: "t" +  i,  // Create an id for text so we can select it later for removing on mouseout
                x: function() { return xScale(d.x) - 30; },
                y: function() { return yScale(d.y) - 15; }
            })
            .text(function() {
              return [d.is_in];  // Value of the text
            });
          }

          function handleMouseOut(d,i){
            d3.select(this).attr("fill","black")
          }