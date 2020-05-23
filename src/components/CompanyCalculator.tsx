import React from 'react'
import { Grid, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, createStyles, makeStyles, Theme } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CompanyExpectedValue from './CompanyExpectedValue'
import ExpectedAmountMoney from './ExpectedAmountMoney'

type Props = {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      border: '0.009px solid #f2f2f2',
      boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.15)',
      borderRadius: '20px',
      marginBottom: '30px'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
      fontFamily: 'Abel',
      margin: '0 auto'
    },
  }),
);

const CompanyCalculator: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Should I investigate this company?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CompanyExpectedValue />
            {/* <Typography style={{ marginTop: '20px' }}>
              Expected value = (Profit probability * Expected profit) - (Loss probability * Expected loss)
          </Typography> */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How much should I investigate?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ExpectedAmountMoney />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  )

}

export default CompanyCalculator