import React from "react";
import "../css/Section.css";
import Chart from "./Chart";

const Section: React.FC = props => {
  return (
    <div className="section">
      <Chart symbol="MSFT" name="MICROSOFT" />
      <Chart symbol="AAPL" name="APPLE" />
      <Chart symbol="AMZN" name="AMAZON" />
      <Chart symbol="FB" name="FACEBOOK" />
    </div>
  );
};

export default Section;
