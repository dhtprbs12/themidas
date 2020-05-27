import React, { useState } from 'react'
import { makeStyles, createStyles, Theme, Grid, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@material-ui/core';
import MathJax from 'react-mathjax'

function ExpectedValueFormula() {
  const kelly = `$ = [Prob.P * Profit] - [Prob.L * Loss]`
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
              <TableRow key={'$'}>
                <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                  $
                </TableCell>
                <TableCell align="left">Expected value to decide if you should investigate on a stock or not</TableCell>
              </TableRow>
              <TableRow key={'Prob.P'}>
                <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                  Probability profit
                </TableCell>
                <TableCell align="left">Probability to win</TableCell>
              </TableRow>
              <TableRow key={'Profit'}>
                <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                  Expected profit
                </TableCell>
                <TableCell align="left">How much I expect to earn</TableCell>
              </TableRow>
              <TableRow key={'Prob.L'}>
                <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                  Probability loss
                </TableCell>
                <TableCell align="left">Probability to lose</TableCell>
              </TableRow>
              <TableRow key={'Loss'}>
                <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                  Expected loss
                </TableCell>
                <TableCell align="left">How much I expect to lose</TableCell>
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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

function checkIfVariablesSet(variables: { expectedProfitValue: string, expectedLossValue: string, profitProbValue: string, lossProbValue: string }) {
  if (variables.expectedProfitValue === '') {
    return false
  }
  if (variables.expectedLossValue === '') {
    return false
  }
  if (variables.profitProbValue === '') {
    return false
  }
  if (variables.lossProbValue === '') {
    return false
  }
  return true
}

const CompanyExpectedValue: React.FC = () => {
  const classes = useStyles();
  const [variables, setVariables] = useState({
    expectedProfitValue: '',
    expectedLossValue: '',
    profitProbValue: '',
    lossProbValue: ''
  })
  const [expectedValueResult, setExpectedValueResult] = useState('')

  function onCalcuateBtnClicked() {
    if (checkIfVariablesSet(variables)) {
      const profitProb = Number(variables.profitProbValue.replace(/[%]/ig, ''))
      const lossProb = Number(variables.lossProbValue.replace(/[%]/ig, ''))
      const expectedProfit = Number(variables.expectedProfitValue.replace(/[$,]/ig, ''))
      const expectedLoss = Number(variables.expectedLossValue.replace(/[$,]/ig, ''))
      const result = (profitProb * expectedProfit) - (lossProb * expectedLoss)
      setExpectedValueResult(formatter.format(result))
    }
  }

  function onExpectedProfitInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[$,]/ig, ''))

    if (!isNaN(number)) {
      setVariables(prevVariables => ({
        ...prevVariables,
        expectedProfitValue: formatter.format(number)
      }))
    }
  }

  function onExpectedLossInput(event) {
    const value = event.target.value
    const number: number = Number(value.replace(/[$,]/ig, ''))

    if (!isNaN(number)) {
      setVariables(prevVariables => ({
        ...prevVariables,
        expectedLossValue: formatter.format(number)
      }))
    }
  }

  const onProfitProbInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const number: number = Number(value.replace(/[%]/ig, ''))

    if (!isNaN(number) && number <= 100) {
      setVariables(prevVariables => ({
        ...prevVariables,
        profitProbValue: `%${number}`
      }))
    }
  };

  const onLossProbInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const number: number = Number(value.replace(/[%]/ig, ''))

    if (!isNaN(number) && number <= 100) {
      setVariables(prevVariables => ({
        ...prevVariables,
        lossProbValue: `%${number}`
      }))
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item >
          <TextField
            error={variables.profitProbValue === ''}
            helperText={(variables.profitProbValue === '') ? 'Required' : ''}
            style={{ marginTop: '10px' }}
            label="Profit Probability(number-only)"
            size='small'
            variant="outlined"
            onInput={onProfitProbInput}
            value={variables.profitProbValue}
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
            error={variables.lossProbValue === ''}
            helperText={(variables.lossProbValue === '') ? 'Required' : ''}
            label="Loss probability(number-only)"
            size="small"
            variant="outlined"
            onInput={onLossProbInput}
            value={variables.lossProbValue}
            fullWidth />
        </Grid>
        <Grid container item>
          <TextField
            error={variables.expectedLossValue === ''}
            helperText={(variables.expectedLossValue === '') ? 'Required' : ''}
            label="Expected loss(number-only)"
            size="small"
            variant="outlined"
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
            value={expectedValueResult === '' ? '$' : expectedValueResult}
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
            disabled={!checkIfVariablesSet(variables)}
            onClick={onCalcuateBtnClicked}
            variant="contained"
            color="primary">
            Calculate
          </Button>
        </Grid>
      </Grid>
      <Typography style={{ marginTop: '20px' }}>
        The formula is very useful in order to make a decision whether investors should investigate a stock or not. The formula is being used many investors recently.
      </Typography>
      <ExpectedValueFormula />
    </div>
  )
}

export default CompanyExpectedValue