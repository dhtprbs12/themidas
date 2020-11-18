import React from "react";
import "../css/Review.css";
import { Grid } from "@material-ui/core";
import CreateReview from "./CreateReview";
import ListFeedback from "./ListFeedback";

const Review: React.FC = () => {

  return (
    <Grid className='review-container'>
      <Grid className='review-left'>
        <CreateReview />
      </Grid>
      <Grid className='review-right'>
        <h3 className="create-review-form-h3">Total Feedback: </h3>
        <ListFeedback />
      </Grid>
    </Grid>
  )
}

export default Review;
