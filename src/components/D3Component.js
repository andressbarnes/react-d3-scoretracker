import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

const D3Component = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    //configure D3 here
  }, [data]);

  return (
    <>
      <svg width="500" height="200" ref={svgRef}></svg>
    </>
  );
};
export default D3Component;
