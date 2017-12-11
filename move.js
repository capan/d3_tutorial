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

// Also draw points for reference
d3.select('svg1')
  .selectAll('circle')
  .data(points)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d[0];
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .attr('r', 10);

  var tr_bl = true;
  
        var circle = map_svg.append("circle")
              .attr("r", 10)
              .attr("transform", "translate(" + points[0] + ")")
              .style("stroke", "gray")
              .style("fill","red");

      function transition() {
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