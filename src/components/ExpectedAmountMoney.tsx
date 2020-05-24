import React, { useState } from 'react'
import { makeStyles, createStyles, Theme, Grid, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core';
import MathJax from 'react-mathjax'

function KellyFormula() {
  const kelly = `F = P - [(1 - P) / R]`
  return (
    <div style={{ margin: '0 auto' }}>
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
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      overflow: 'auto',
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

function checkIfVariablesSet(variables: { probToWin: string, expectedProfitValue: string, expectedLossValue: string }) {
  if (variables.probToWin === '') {
    return false
  }
  if (variables.expectedProfitValue === '') {
    return false
  }
  if (variables.expectedLossValue === '') {
    return false
  }
  return true
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

const ExpectedAmountMoney: React.FC = () => {
  const classes = useStyles();
  const [variables, setVariables] = useState({
    probToWin: '',
    expectedProfitValue: '',
    expectedLossValue: '',
  })
  const [expectedAmoundMoneyResult, setExpectedAmoundMoneyResult] = useState('')

  function onCalcuateBtnClicked() {
    if (checkIfVariablesSet(variables)) {
      const probToWin = Number(variables.probToWin.replace(/[%]/ig, ''))
      const expectedProfit = Number(variables.expectedProfitValue.replace(/[$,]/ig, ''))
      const expectedLoss = Number(variables.expectedLossValue.replace(/[$,]/ig, ''))
      const result = probToWin - ((100 - probToWin) / (expectedProfit / expectedLoss))
      setExpectedAmoundMoneyResult(`%${result}`)
    }
  }

  function onProbabilityToWinInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[%]/ig, ''))

    if (!isNaN(number) && number <= 100) {
      setVariables(prev => ({
        ...prev,
        probToWin: `%${number}`
      }))
    }
  }

  function onExpectedProfitInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[$,]/ig, ''))

    if (!isNaN(number)) {
      setVariables(prev => ({
        ...prev,
        expectedProfitValue: formatter.format(number)
      }))
    }
  }

  function onExpectedLossInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[$,]/ig, ''))

    if (!isNaN(number)) {
      setVariables(prev => ({
        ...prev,
        expectedLossValue: formatter.format(number)
      }))
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item>
          <TextField
            error={variables.probToWin === ''}
            helperText={(variables.probToWin === '') ? 'Required' : ''}
            style={{ marginTop: '10px' }}
            label="Probability to win(number-only)"
            size="small"
            variant="outlined"
            onInput={onProbabilityToWinInput}
            value={variables.probToWin}
            fullWidth />
        </Grid>
        <Grid container item>
          <TextField
            error={variables.expectedProfitValue === ''}
            helperText={(variables.expectedProfitValue === '') ? 'Required' : ''}
            label="Expected profit(number-only)"
            size="small"
            variant="outlined"
            onInput={onExpectedProfitInput}
            value={variables.expectedProfitValue}
            fullWidth />
        </Grid>
        <Grid container item>
          <TextField
            error={variables.expectedLossValue === ''}
            helperText={(variables.expectedLossValue === '') ? 'Required' : ''}
            label="Expected loss(number-only)"
            variant="outlined"
            size="small"
            onInput={onExpectedLossInput}
            value={variables.expectedLossValue}
            fullWidth />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={8}>
          <TextField
            id="outlined-read-only-input"
            label="Result(read-only)"
            value={expectedAmoundMoneyResult === '' ? '%' : expectedAmoundMoneyResult}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} item xs={12} sm={4}>
          <Button
            onClick={onCalcuateBtnClicked}
            disabled={!checkIfVariablesSet(variables)}
            variant="contained"
            color="primary">
            Calculate
          </Button>
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