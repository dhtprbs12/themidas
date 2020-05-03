import React from "react";
import "../css/Chart.css";
import {
  LineChart,
  Line,
  ReferenceLine,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Stock } from './Search'

interface ChartProps {
  array: Array<Stock>
}

function CustomTooltip({ payload, active }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <h4>{payload[0].payload.date}</h4>
        <p className="price">{`$ ${Number(payload[0].payload.close).toFixed(2)}`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
}

const Chart: React.FC<ChartProps> = props => {

  const { array } = props
  let average = 0
  for (let i = 0; i < array.length; i++) {
    average = average + Number(array[i].close)
  }
  average = Number((average / array.length).toFixed(2))
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={array}
        >
          {/*  Tooltip: when mouse over dot it displays information*/}
          <Tooltip content={CustomTooltip} wrapperStyle={{ backgroundColor: "#F1F1F1" }} />
          <ReferenceLine y={average} label={`Avg: ${average}`} stroke="lightgray" />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="close"
            stroke="red"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
