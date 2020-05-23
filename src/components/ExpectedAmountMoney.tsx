import React, { useState } from 'react'
import { makeStyles, createStyles, Theme, Grid, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import MathJax from 'react-mathjax'

function KellyFormula() {
  const kelly = `F = P - [(1 - P) / R]`
  return (
    <MathJax.Provider>
      <MathJax.Node formula={kelly} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Meaning</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={'F'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                F
                </TableCell>
              <TableCell align="left">Percentage of investor’s capital to put into a single trade</TableCell>
            </TableRow>
            <TableRow key={'P'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                P
                </TableCell>
              <TableCell align="left">Percentage of probability to win</TableCell>
            </TableRow>
            <TableRow key={'Profit'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                R
                </TableCell>
              <TableCell align="left">Profit/Loss</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </MathJax.Provider>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'auto'
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    }
  }),
);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

const ExpectedAmountMoney: React.FC = () => {
  const classes = useStyles();

  const [probToWin, setProbToWin] = useState('')
  const [expectedProfitValue, setExpectedProfitValue] = useState('')
  const [expectedLossValue, setExpectedLossValue] = useState('')

  function onProbabilityToWinInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[%]/ig, ''))

    if (!isNaN(number) && number <= 100) {
      setProbToWin(`%${number}`)
    }
  }

  function onExpectedProfitInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[$,]/ig, ''))

    if (!isNaN(number)) {
      setExpectedProfitValue(formatter.format(number))
    }
  }

  function onExpectedLossInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[$,]/ig, ''))

    if (!isNaN(number)) {
      setExpectedLossValue(formatter.format(value))
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item>
          <TextField
            label="Probability to win"
            size="small"
            variant="outlined"
            onInput={onProbabilityToWinInput}
            value={probToWin}
            fullWidth />
        </Grid>
        <Grid container item>
          <TextField
            label="Expected profit"
            size="small"
            variant="outlined"
            onInput={onExpectedProfitInput}
            value={expectedProfitValue}
            fullWidth />
        </Grid>
        <Grid container item>
          <TextField
            label="Expected loss"
            variant="outlined"
            size="small"
            onInput={onExpectedLossInput}
            value={expectedLossValue}
            fullWidth />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <TextField
            id="filled-read-only-input"
            label="$"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Typography style={{ marginTop: '20px' }}>
        The formula was developed by Kelly while working at AT&T's Bell Laboratories. The formula is currently used by investors for risk and money management purposes, to determine what percentage of their capital should be used in each bet/trade to maximize long-term growth.
      </Typography>
      <KellyFormula />
    </div>
  )
}

export default ExpectedAmountMoney