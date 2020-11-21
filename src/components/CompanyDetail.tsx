import React from "react";
import Chart from './Chart'
import "../css/CompanyDetail.css";

type Props = {
  symbol: string
  name: string
}

export default function CompanyDetail(props: Props) {
  const { symbol, name } = props

  return (
    <Chart symbol={symbol} name={name} />
  )
}