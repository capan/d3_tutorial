
var lineGenerator = d3.line().curve(d3.curveCardinal);
var svg1 = d3.select("body").append("svg1")
    .attr("width", 1000)
    .attr("height", 1000);
	 var wp1 = Math.round(1000*Math.random());  var wp4 = Math.round(1000*Math.random());  var wp5 = Math.round(1000*Math.random());  var wp8 = Math.round(1000*Math.random()); 
	 var wp2 = Math.round(1000*Math.random());  var wp3 = Math.round(1000*Math.random());  var wp6 = Math.round(1000*Math.random());  var wp7 = Math.round(1000*Math.random()); 
var points = [
	[wp1, wp2],
	[wp3, wp4],
	[wp5, wp6]
];


var path1 = svg1.append("path").data([points]).attr("d", d3.line());    
var pathData = lineGenerator(points);


d3.select('path1')
	.attr('d', pathData);

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
	
        var circle = svg1.append("circle")
   						.attr("r", 10)
   						.attr("transform", "translate(" + points[0] + ")")
   						.style("stroke", "gray")
   						.style("fill","red")
        				.on("mouseover", function(){d3.select(this).style("fill", "black").transition();
        					tr_bl = false;})
        				.on("mouseout", function(){d3.select(this).style("fill", "red");
        					tr_bl = true;});


    transition();

      function transition() {
      if (tr_bl){
      circle.transition()
      .duration(10000)
      .attrTween("transform", translateAlong(path1.node()));
      } 
      else {
      	circle.transition();
      }
}

      function translateAlong(path1) {
  var l = path1.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path1.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}