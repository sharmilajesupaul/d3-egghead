(function() {

  var dataset = _.map(_.range(18), function(i) {
    return Math.random() * 500;
  });

  var w = 400;
  var h = 300;

  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset) * 1.1]) // domain range from 0 to the largest possible data point
    .range([0, h]);

  var svg = d3.select('#chartArea')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function(d, i) {
      return i * 22;
    })
    .attr('y', function(d) {
      return h - yScale(d);
    })
    .attr('width', 20)
    .attr('height', function(d) {
      return yScale(d);
    });

})();
