const LineChart = ({ data, className }) => {
  // Calculate dimensions
  const width = 300;
  const height = 150;
  const padding = 20;

  // Find min and max values
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  // Calculate scales
  const xScale = (width - 2 * padding) / (data.length - 1);
  const yScale = (height - 2 * padding) / (maxValue - minValue);

  // Generate path
  const points = data.map((value, index) => {
    const x = padding + index * xScale;
    const y = height - (padding + (value - minValue) * yScale);
    return `${x},${y}`;
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className={className}>
      {/* Grid lines */}
      {[...Array(5)].map((_, i) => (
        <line
          key={i}
          x1={padding}
          y1={padding + (i * (height - 2 * padding)) / 4}
          x2={width - padding}
          y2={padding + (i * (height - 2 * padding)) / 4}
          className="stroke-gray-200 dark:stroke-gray-800"
          strokeWidth="1"
        />
      ))}

      {/* Line chart */}
      <polyline
        points={points.join(" ")}
        fill="none"
        className="stroke-indigo-500 dark:stroke-indigo-400"
        strokeWidth="2"
      />

      {/* Data points */}
      {data.map((value, index) => (
        <circle
          key={index}
          cx={padding + index * xScale}
          cy={height - (padding + (value - minValue) * yScale)}
          r="3"
          className="fill-white dark:fill-gray-900 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

export default LineChart;