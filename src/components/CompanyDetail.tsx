import React from "react";
import Chart from './Chart'
import "../css/CompanyDetail.css";

type Props = {
  symbol: string
  name: string
}

const CompanyDetail: React.FC<Props> = (props: Props) => {
  const { symbol, name } = props

  return (
    <Chart symbol={symbol} name={name} />
  )
}

export default CompanyDetail