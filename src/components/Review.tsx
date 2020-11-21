import React from "react";
import "../css/Review.css";
import { Grid } from "@material-ui/core";
import CreateReview from "./CreateReview";
import ListFeedback from "./ListFeedback";
import { useQuery } from "@apollo/react-hooks";
import { GET_FEEDBACKS } from '../query/getFeedbacks'
import CircularLoading from "./CircularLoading";

export type Feedback = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  feedback: string
  createdAt: string,
  title: string
}

export default function Review(){
  const { data, loading, error } = useQuery<{ feedbacks: Array<Feedback> }>(GET_FEEDBACKS)

  if(loading){
    return <CircularLoading />
  }

  if(error){
    console.log('error occurs while getting feedback', error)
    return null
  }

  const { feedbacks = [] } = data || {}

  return (
    <Grid className='review-container'>
      <Grid className='review-left'>
        <CreateReview />
      </Grid>
      <Grid className='review-right'>
        <h3 className="create-review-form-h3">{`Total Feedback: ${data?.feedbacks.length}`}</h3>
        <ListFeedback feedbacks={feedbacks}/>
      </Grid>
    </Grid>
  )
}