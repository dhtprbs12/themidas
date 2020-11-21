import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactLoading from 'react-loading';
import PeriodSelection from './PeriodSelection'
import { INTRA_DAILY_API_CALL, WEEKLY_API_CALL, MONTHLY_API_CALL, YEARLY_API_CALL, FIVE_YEAR_API_CALL, OVER_TWENTY_YEAR_API_CALL } from "../auth/apiCall";
import StockInfo from "./StockInfo";
import { Grid} from "@material-ui/core";
import '../css/Chart.css'
import CompanyValue from "./CompanyValue";
import CustomModal from "./CustomModal";


export type Stock = {
  date: number,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
  dividend?: number
}


type Props = {
  symbol: string
  name: string
}

function CustomTooltip({ payload, active }) {
  if (active && payload) {
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


export default function Chart (props: Props){

  const { symbol, name } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [array, setArray] = React.useState<Array<Stock>>([])
  const [defaultValue, setDefaultValue] = React.useState<string>('')
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  /**
 * @param array 
 * need to convert string that comes from server to number. 
 * even if we set Stock props:number it doesn't automatically map string to map
 */
  function convertToNumber(array: Array<Stock>) {

    if (array.length <= 0) {
      handleOpen()
      return array
    }

    for (let i = 0; i < array.length; i++) {
      array[i].open = Number(array[i].open)
      array[i].high = Number(array[i].high)
      array[i].low = Number(array[i].low)
      array[i].close = Number(array[i].close)
      array[i].volume = Number(array[i].volume)
      array[i].dividend = Number(array[i].dividend)
    }
    return array
  }

  const handleOpen = () => {
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setIsModalOpen(false);
  }

  React.useEffect(() => {
    setLoading(true)
    setDefaultValue('1D')
    async function API_CALL() {
      if (symbol !== '') {
        await INTRA_DAILY_API_CALL(symbol)
        .then(data => {
          const result = data as Array<Stock>
          setArray(convertToNumber(result))
        })
        .catch(err => {
          handleOpen()
          return <CustomModal isOpen={isModalOpen} message={err} handleClose={handleClose} />
        })
      }
    }
    API_CALL()
    setLoading(false)
  }, [symbol])

  const onChange = async (event) => {
    event.preventDefault()
    const selected: string = event.target.value
    let array: Array<Stock> = []

    switch (selected) {
      case '1D':
        setLoading(true)
        setDefaultValue('1D')
        array = await INTRA_DAILY_API_CALL(symbol) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
      case '1W':
        setLoading(true)
        setDefaultValue('1W')
        array = await WEEKLY_API_CALL(symbol) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
      case '1M':
        setLoading(true)
        setDefaultValue('1M')
        array = await MONTHLY_API_CALL(symbol, 1) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
      case '6M':
        setLoading(true)
        setDefaultValue('6M')
        array = await MONTHLY_API_CALL(symbol, 6) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
      case '1Y':
        setLoading(true)
        setDefaultValue('1Y')
        array = await YEARLY_API_CALL(symbol) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
      case '5Y':
        setLoading(true)
        setDefaultValue('5Y')
        array = await FIVE_YEAR_API_CALL(symbol) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
      default:
        // 20Y+
        setLoading(true)
        setDefaultValue('20Y+')
        array = await OVER_TWENTY_YEAR_API_CALL(symbol) as Array<Stock>
        setArray(await convertToNumber(array))
        setLoading(false)
        break;
    }
  }

  return (
    <>
      {/* <CompanyCalculator /> */}
      <CompanyValue symbol={symbol} name={name}/>
      <Grid className="chart" container spacing={3}>
        <Grid item className='chart-container'>
          {loading ?
            <ReactLoading height={250} className='loader' type={'bars'} color="lightgray" />
            :
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width={"100%"} minHeight={250} >
                <LineChart
                  data={array}
                  domain={[0, 'dataMax']}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  {/*  Tooltip: when mouse over dot it displays information*/}
                  <Tooltip content={CustomTooltip} wrapperStyle={{ backgroundColor: "#F1F1F1" }} />
                  <Line
                    strokeWidth={2}
                    type="monotone"
                    dataKey="close"
                    stroke="#00cc96"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          }
          <Grid className='periodSelection'>
            <PeriodSelection onChange={onChange} defaultValue={defaultValue} />
          </Grid>
        </Grid>
        <Grid item className='chart-statistic-container'>
          {symbol !== '' && <StockInfo symbol={symbol} />}
        </Grid>
      </Grid>
      {/* when user exceeds the limitation of calling API, pops up modal */}
      <CustomModal isOpen={isModalOpen} message={'You have exceeded a maximum API calls (5 API calls/min). Try again in 1 minute.'} handleClose={handleClose}/>
    </>
  )
}
