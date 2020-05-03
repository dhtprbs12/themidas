import React from "react";
import Chart from './Chart'
import PeriodSelection from './PeriodSelection'
import { Stock } from './Search'


type Props = {
  symbol: string
  name: string
  array: Array<Stock>
  onChange: (event) => void
}

const CompanyDetail: React.FC<Props> = (props: Props) => {
  const { symbol, name, array, onChange } = props
  return (
    <div className='companyDetail'>
      <h3>{name}</h3>
      <Chart array={array} />
      <PeriodSelection onChange={onChange} />
    </div>
  )
}

export default CompanyDetail