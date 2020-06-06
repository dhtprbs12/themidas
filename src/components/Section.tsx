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

  const classes = useStyles();
  const { data } = useQuery(GET_FEEDBACKS)

  const { feedbacks = [] }: { feedbacks: Array<FEEDBACK> } = data || {}

  return (
    <div className="section">
      <div className={classes.root}>

      </div>
    </div>
  );
};

export default Section;

// {
//   feedbacks.map((feedback: FEEDBACK) =>
//     <ExpansionPanel key={feedback.id}>
//       <ExpansionPanelSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         <Typography className={classes.heading}>{feedback.firstName}</Typography>
//       </ExpansionPanelSummary>
//       <ExpansionPanelDetails>
//         <Typography>
//           {feedback.feedback}
//         </Typography>
//       </ExpansionPanelDetails>
//     </ExpansionPanel>)
// }

