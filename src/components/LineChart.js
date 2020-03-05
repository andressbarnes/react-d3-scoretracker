import React, { useRef, useEffect } from 'react';
import {
  select,
  scaleLinear,
  line,
  curveCardinal,
  axisBottom,
  axisLeft
} from 'd3';
import useResizeObserver from '../hooks/useResizeObserver';

const LineChart = ({ data, removeAll, removeAllCallBack }) => {
  const chartData = data;

  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    const svgContent = svg.select('.content');

    const renderChart = () => {
      if (removeAll) {
        svgContent.selectAll('.myLine').remove();
        svgContent.selectAll('.myDot').remove();
        removeAllCallBack(false);
      }

      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const getDataMetric = i => {
        return Object.values(chartData[i].scores);
      };

      // scales + line generator
      const xScale = scaleLinear()
        .domain([0, getDataMetric(0).length - 1])
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([0, 300])
        .range([height, 0]);

      const lineGenerator = line()
        .x((d, index) => xScale(index))
        .y(d => yScale(d))
        .curve(curveCardinal);

      chartData.forEach((v, i) => {
        // render the line
        svgContent
          .selectAll(`#myLine${i}`)
          .data([getDataMetric(i)])
          .join('path')
          .attr('class', `myLine`)
          .attr('id', `myLine${i}`)
          .attr('stroke', chartData[i].color)
          .attr('fill', 'none')
          .attr('stroke-width', '2')
          .on('mouseenter', (v, ip) => {
            chartData.forEach((v, io) => {
              if (io !== i) {
                svgContent
                  .selectAll(`#myLine${io}`)
                  .transition()
                  .duration(200)
                  .delay(200)
                  .attr('opacity', '0.1');
                svgContent
                  .selectAll(`#myDot${io}`)
                  .transition()
                  .duration(0)
                  .delay(200)
                  .attr('opacity', '0.1');
              } else {
                svgContent
                  .selectAll(`#myLine${io}`)
                  .attr('stroke', 'white')
                  .transition()
                  .duration(200)
                  .delay(200)
                  .attr('stroke', 'white')
                  .attr('stroke-width', '5');
                svgContent
                  .selectAll(`#myDot${io}`)
                  .transition()
                  .duration(0)
                  .attr('opacity', '1');
              }
            });
          })
          .on('mouseleave', () => {
            chartData.forEach((v, io) => {
              svgContent
                .selectAll(`#myLine${io}`)
                .attr('stroke', chartData[io].color)
                .transition()
                .duration(200)
                .attr('opacity', '1')
                .attr('stroke-width', '2');

              svgContent
                .selectAll(`#myDot${io}`)
                .transition()
                .duration(0)
                .attr('opacity', '1');
            });
          })
          .transition()
          .duration(400)
          .attr('d', lineGenerator);

        svgContent
          .selectAll(`#myDot${i}`)
          .data(getDataMetric(i))
          .join(
            enter =>
              enter
                .append('circle')
                .attr('class', `myDot`)
                .attr('id', `myDot${i}`)
                .attr('cx', (value, index) => xScale(index))
                .attr('cy', yScale)
                .attr('fill', chartData[i].color),
            update =>
              update
                .transition()
                .duration(400)
                .attr('cx', (value, index) => xScale(index))
                .attr('cy', yScale)
                .attr('fill', chartData[i].color)
          )
          .attr('stroke', 'white')
          .attr('r', 3)
          .on('mouseenter', (v, ip) => {
            svg
              .selectAll('.d3tooltip')
              .data([v])
              .join(enter => enter.append('text').attr('y', yScale(v) - 4))
              .attr('class', 'd3tooltip')
              .text(v)
              .attr('x', xScale(ip))
              .attr('y', yScale(v) - 12)
              .transition()
              .attr('opacity', 1)
              .attr('fill', 'white')
              .attr('text-anchor', 'middle');
            chartData.forEach((v, io) => {
              if (io !== i) {
                svgContent
                  .selectAll(`#myLine${io}`)
                  .transition()
                  .duration(200)
                  .delay(200)
                  .attr('opacity', '0.1');
                svgContent
                  .selectAll(`#myDot${io}`)
                  .transition()
                  .duration(0)
                  .delay(200)
                  .attr('opacity', '0.1');
              } else {
                svgContent
                  .selectAll(`#myLine${io}`)
                  .transition()
                  .duration(200)
                  .delay(200)
                  .attr('stroke', 'white')
                  .attr('stroke-width', '5');
                svgContent
                  .selectAll(`#myDot${io}`)
                  .transition()
                  .duration(0)
                  .attr('opacity', '1');
              }
            });
          })
          .on('mouseleave', () => {
            svg.select('.d3tooltip').remove();
            chartData.forEach((v, io) => {
              svgContent
                .selectAll(`#myLine${io}`)
                .transition()
                .duration(0)
                .attr('opacity', '1')
                .attr('stroke-width', '2')
                .attr('stroke', chartData[io].color);
              svgContent
                .selectAll(`#myDot${io}`)
                .transition()
                .duration(0)
                .attr('opacity', '1');
            });
          });
      });

      // axes
      const xAxis = axisBottom(xScale);

      // add the X gridlines
      svg
        .append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0, ${height})`);

      // add the Y gridlines
      svg
        .append('g')
        .attr('class', 'grid')
        .attr('transform', `translate(0, ${width})`);

      svg
        .select('.x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis.ticks(getDataMetric(0).length).tickSize(10));

      const yAxis = axisLeft(yScale);
      svg
        .select('.y-axis')
        .call(yAxis.ticks(getDataMetric(0).length).tickSize(-width));
    };

    renderChart();
  }, [chartData, dimensions, removeAll, removeAllCallBack]);

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem', padding: '10px' }}>
        <svg height="300px" className="d3-overflow d3-responsive" ref={svgRef}>
          <g className="content"></g>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="grid" />
        </svg>
      </div>
    </React.Fragment>
  );
};

export default LineChart;
