import React, { useState, useEffect } from "react";
import "../css/Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Text
} from "recharts";

interface ChartProps {
  symbol: string;
  name: string;
}

const Chart: React.FC<ChartProps> = props => {
  /* 
  Referece to initialize array using hook
  useState<Array<number>>([]);
  useState<number[]>([]);
   */
  const [objects, setObjects] = useState<Array<object>>([]);

  /* Same */
  // function fetchStock() {}
  const fetchStock = async (symbol: string) => {
    const API_KEY = "6VM7V9ALHFS526TX";
    const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;

    const stockArr: Array<object> = [];

    let response = await fetch(API_CALL);
    let data = await response.json();
    for (var key in data["Time Series (Daily)"]) {
      const obj = {
        date: key,
        open: data["Time Series (Daily)"][key]["1. open"],
        high: data["Time Series (Daily)"][key]["2. high"],
        low: data["Time Series (Daily)"][key]["3. low"],
        close: data["Time Series (Daily)"][key]["4. close"]
      };
      stockArr.push(obj);
    }
    stockArr.reverse();
    setObjects(stockArr);
  };

  useEffect(() => {
    if (!objects.length) {
      fetchStock(props.symbol);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objects.length]);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={objects}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 15
          }}
        >
          <CartesianGrid strokeDasharray="6 6" />
          <XAxis dataKey="date">
            <Label
              value={props.name}
              dy={10}
              offset={0}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={
              <Text x={0} y={0} dx={15} dy={200} offset={0} angle={-90}>
                Price
              </Text>
            }
          ></YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="open"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
