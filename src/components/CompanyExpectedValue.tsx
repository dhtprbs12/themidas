import React, { useState } from 'react'
import { makeStyles, createStyles, Theme, Grid, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@material-ui/core';
import MathJax from 'react-mathjax'

function ExpectedValueFormula() {
  const kelly = `$ = [Prob.P * Profit] - [Prob.L * Loss]`
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
            <TableRow key={'$'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                $
                </TableCell>
              <TableCell align="left">Expected value to decide if you should investigate on a stock or not</TableCell>
            </TableRow>
            <TableRow key={'Prob.P'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                Prob.P
                </TableCell>
              <TableCell align="left">Percentage of probability to win</TableCell>
            </TableRow>
            <TableRow key={'Profit'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                Profit
                </TableCell>
              <TableCell align="left">Profit how much investors expect to earn</TableCell>
            </TableRow>
            <TableRow key={'Prob.L'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                Prob.L
                </TableCell>
              <TableCell align="left">Percentage of probability to lose</TableCell>
            </TableRow>
            <TableRow key={'Loss'}>
              <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                Loss
                </TableCell>
              <TableCell align="left">Profit how much investors expect to lose</TableCell>
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

const CompanyExpectedValue: React.FC = () => {
  const classes = useStyles();

  const [expectedProfitValue, setExpectedProfitValue] = useState('')
  const [expectedLossValue, setExpectedLossValue] = useState('')
  const [profitProbValue, setProfitProbValue] = useState('')
  const [lossProbValue, setLossProbValue] = useState('')

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
      setExpectedLossValue(formatter.format(number))
    }
  }

  const onProfitProbInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const number: number = Number(value.replace(/[%]/ig, ''))

    if (!isNaN(number) && number <= 100) {
      setProfitProbValue(`%${number}`)
    }
  };

  const onLossProbInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const number: number = Number(value.replace(/[%]/ig, ''))

    if (!isNaN(number) && number <= 100) {
      setLossProbValue(`%${number}`)
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item >
          <TextField
            label="Profit Probability"
            size='small'
            variant="outlined"
            onInput={onProfitProbInput}
            value={profitProbValue}
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
            label="Loss probability"
            size="small"
            variant="outlined"
            onInput={onLossProbInput}
            value={lossProbValue}
            fullWidth />
        </Grid>
        <Grid container item>
          <TextField
            label="Expected loss"
            size="small"
            variant="outlined"
            onInput={onExpectedLossInput}
            value={expectedLossValue}
            fullWidth />
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{ marginTop: '20px' }}>
        <Grid item>
          <TextField
            id="filled-read-only-input"
            label="Expected value"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
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