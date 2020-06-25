import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";

const DailyGraph = function ({ data = [{ sgv: 0 }] }) {
  return (
    <LineChart width={300} height={100} data={data}>
      <YAxis domain={[0, 300]} interval="preserveStartEnd" />
    </LineChart>
  );
};

export default DailyGraph;
