var lineGenerator = d3.line().curve(d3.curveCardinal);

if (il="Adana"){
  points = [[941,651],[477,311],[221,138]];
}else if(il="Tekirdağ"){
   points = [[221,138],[477,311],[941,651]];
};

//creating flight path data with line generator
var pathData = lineGenerator(points);
//appending new group g2 with id fPath 
var g2 = map_svg.append("g").attr("id","fPath");
//appending created flight path to variable 
var path = g2.append("path").data([points]).attr("d", d3.line());

//flight path
g2.selectAll('path')
  .data(points)
  .attr('d', pathData)
  .attr("stroke", "transparent")
  .attr("fill","transparent");

// Also draw points for reference
// d3.select('svg1')
//   .selectAll('circle')
//   .data(points)
//   .enter()
//   .append('circle')
//   .attr('cx', function(d) {
//     return d[0];
//   })
//   .attr('cy', function(d) {
//     return d[1];
//   })
//   .attr('r', 10);

  var tr_bl = true;
  
        var circle = map_svg.append("circle")
              .attr("r", 10)
              .attr("transform", "translate(" + points[0] + ")")
              // .style("stroke", "gray")
              // .style("fill","red")
              .style("opacity", 0);


      function myTransition() {
      if (tr_bl){
      circle.transition()
      .duration(10000)
      .attrTween("transform", translateAlong(path.node()));

      
      } 
      else {
        circle.transition();
      }
}

      function translateAlong(path) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}