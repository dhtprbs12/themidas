import React from "react";
import "../css/Section.css";
import { useQuery } from '@apollo/react-hooks';
import { GET_FEEDBACKS } from '../query/getFeedbacks'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MostPopular1 from './MostPopular1'
import MostPopular2 from './MostPopular2'
import MostPopular3 from './MostPopular3'
import MostPopular4 from './MostPopular4'

type FEEDBACK = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  feedback: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '50%',
      margin: '0 auto'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

const Section: React.FC = () => {

  const { data } = useQuery(GET_FEEDBACKS)
  const classes = useStyles();

  const { feedbacks = [] }: { feedbacks: Array<FEEDBACK> } = data || {}

  return (
    <div className="section">
      <div className='section-container'>
        <MostPopular1 />
        <MostPopular2 />
        <MostPopular3 />
        <MostPopular4 />
      </div>
      {
        feedbacks.map((feedback: FEEDBACK) =>
          <ExpansionPanel key={feedback.id}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{feedback.firstName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {feedback.feedback}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>)
      }
    </div>
  );
};

export default Section;

