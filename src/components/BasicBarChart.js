import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

const BasicBarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    svg
      .selectAll('.bar')
      .data(data) //passed from parent component
      .join('rect')
      .attr('class', 'bar');
  }, [data]);

  return (
    <>
      <svg width="500" height="200" ref={svgRef}></svg>
    </>
  );
};

export default BasicBarChart;
