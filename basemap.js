var viewHeight = window.innerHeight;
var viewWidth = window.innerWidth;
var il;
var points;

var geoMercator = d3.geoMercator().scale(5500)
  .center( [28.739557, 39.871648] )
  .translate([300,300]);
  

var map_svg = d3.select("body")
.append("svg")
.attr("width",viewWidth)
.attr("height",viewHeight);

var g = map_svg.append("g");

var geoPath = d3.geoPath().projection(geoMercator);

//regions
var g = map_svg.append("g");
g.selectAll("path")
   .data(tr_geojson.features)
   .enter()
   .append("path")
   .attr("d",geoPath)
   .attr("stroke-width", "1")
   .attr("stroke", "white")
   .on("mouseover",handleMouseOver)
   .on("mouseout",handleMouseOut)
   .on("click",handleClick);

   //airports
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

      //interaction

    function handleMouseOver(d, i) { 
      
      if(d.properties.name == "Tekirdağ"){
        d3.select(this).transition().
        style(
           "fill", "red"
        );
        myTransition();

      } else if(d.properties.name == "Adana"){
        
        d3.select(this).transition().
        style(
           "fill", "red"
        );
        myTransition();
      }
      else {
        var coords = d3.mouse(this);
        d3.select(this).transition().
        style(
           "fill", "orange"
        );
      }

<<<<<<< HEAD
            d3.select(this)
            .append("svg:title")
            .text(function(d){return d.properties.name})
                    .style("text-anchor", "middle")
                    .style("fill", "#555")
                    .style("font-family", "Arial")
                    .style("font-size", 50);

                    il = d.properties.name;
              
            }

          function handleMouseOut(d,i){
            d3.select(this).attr("fill","black");
           
=======
      d3.select(this)
      .append("svg:title")
      .text(function(d){return d.properties.name})
              .style("text-anchor", "middle")
              .style("fill", "#555")
              .style("font-family", "Arial")
              .style("font-size", 50);
        
            }

          function handleMouseOut(d,i){
            d3.select(this).transition().style("fill","black");
            
>>>>>>> 97dc17f9916dfc5a2b0d4892cee3bfa512ed9f5b
          }

          function handleClick(d,i){
            var coords = d3.mouse(this);
            document.getElementById("il").innerHTML = d.properties.name;
            myTransition();
            circle.style("opacity", 1).style("stroke", "gray")
            .style("fill","red");

          }