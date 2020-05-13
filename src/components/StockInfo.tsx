import React, { useEffect, useState } from 'react';
import { Stock } from './Chart'
import { Grid, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { DAILY_API_CALL } from "../auth/apiCall";
import { convertToNumber } from './Chart'

/*
 * Monthly-Api-Call uses Daily adjusted api
 */

type Props = {
  symbol: string
}


const StockInfo: React.FC<Props> = (props: Props) => {

  const { symbol } = props
  const [stockInfo, setStockInfo] = useState<Stock>()
  const [average, setAverage] = useState(0)
  useEffect(() => {
    async function CALL_API() {
      const data = await DAILY_API_CALL(symbol) as Array<Stock>
      const array = await convertToNumber(data)
      let temp = 0;
      for (let i = 0; i < array.length; i) {
        temp = temp + array[i].close;
      }
      temp = temp / array.length
      setAverage(temp)
      setStockInfo(data[0])
    }
    CALL_API()
  }, [symbol])

  return (
    <Grid container justify='center' alignItems="center">
      <h3 className='stock-info-title'>Statistic</h3>
      <Grid className='statistic-container' container spacing={3}>
        <Grid className='statistic-left' item xs={6} container justify='center' >
          <List>
            <ListItem>
              <ListItemText
                primary="OPEN"
                secondary={!stockInfo ? '-' : Number(stockInfo.open).toFixed(2)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="HIGH"
                secondary={!stockInfo ? '-' : Number(stockInfo.high).toFixed(2)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="LOW"
                secondary={!stockInfo ? '-' : Number(stockInfo.low).toFixed(2)}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="AVERAGE"
                secondary={!stockInfo ? '-' : average.toFixed(2)}
              />
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid className='statistic-right' item xs={6} container justify='center'>
          <List>
            <ListItem>
              <ListItemText
                primary="CLOSE"
                secondary={!stockInfo ? '-' : Number(stockInfo.close).toFixed(2)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="VOLUME"
                secondary={!stockInfo ? '-' : Number(stockInfo.volume).toFixed(2)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="DIVIDEND"
                secondary={!stockInfo?.dividend ? '-' : Number(stockInfo.dividend).toFixed(2)}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StockInfo