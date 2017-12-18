
function myTransition(x1) {
  var tr_bl = true;
  if (tr_bl) {

    var lineGenerator = d3.line().curve(d3.curveCardinal);
    
    //creating flight path data with line generator
    var pathData = lineGenerator(x1);
    //appending new group g2 with id fPath 
    var g2 = map_svg.append("g").attr("id","fp");
    //appending created flight path to variable 
    var path = g2.append("path").data([x1]).attr("d", d3.line());
    
    //flight path
    g2.selectAll('path')
      .data(x1)
      .attr('d', pathData)
      .attr("stroke", "blue")
      .attr("fill", "transparent");       
    //flying object
    var circle = map_svg.append("circle")
      .attr("r", 10)
      .attr("transform", "translate(" + x1[0] + ")")
      .style("opacity", 1)
      .style("fill","red");

    circle.transition()
      .duration(10000)
      .attrTween("transform", translateAlong(path.node()))
      .each("end", remove());  
      
  }
  else {
    circle.transition();
  }
}

function translateAlong(path) {
  var l = path.getTotalLength();
  return function (d, i, a) {
    return function (t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}