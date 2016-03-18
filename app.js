var data = [5, 10, 15, 20, 25];
var width = 400;
var height = 400;

var xScale = d3.scale.ordinal()
  .domain(data)
  .rangeBands([0, width], 0.1, 0);

var yScale = d3.scale.linear()
  .domain([0, d3.max(data)])
  .range([0, height]);

function init(selection) {
  selection.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .style('fill', 'green')
    .attr('x', function(d, i) {
      return xScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d);
    })
    .attr('width', xScale.rangeBand())
    .attr('height', function(d) {
      return yScale(d);
    });
}

function resizeSVG(w, h) {
  d3.select('#chart svg')
    .attr('width', w)
    .attr('height', h);
}

// http://www.brendansudol.com/posts/responsive-d3/
function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style('width')),
    height = parseInt(svg.style('height')),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio', 'xMinYMid')
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on('resize.' + container.attr('id'), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style('width'));
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
  }
}

d3.select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .call(init)
  .call(responsivefy);
