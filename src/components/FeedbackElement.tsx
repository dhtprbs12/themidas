import React from 'react'
import { Grid } from '@material-ui/core';
import peterLynch from '../images/peter-lynch.jpeg'
import thumbsUp from '../images/up.svg'
import thumbsDown from '../images/down.svg'
import { Feedback } from './Review';

type Props = {
  feedback: Feedback
}

export default function FeedbackElement(props: Props) {
  const {feedback} = props
  return (
    <Grid className="feedback-element">
      <Grid className='feedback-left'>
        <Grid className='feedback-user-image'>
          <img className='user-image' src={peterLynch} alt="company.svg" style={{ height: '90px', width: '100%', borderRadius: '50%' }} />
        </Grid>
      </Grid>
      <Grid className='feedback-right'>
        <Grid className='feedback-right-header'>
          <Grid style={{padding: '5px', fontSize: '14px'}}>
            <p className='header-name'>{`${feedback.firstName}, ${feedback.lastName}`}</p>
            <p className='header-date'>{`${new Date(feedback.createdAt).toLocaleDateString()}`}</p>
          </Grid>
        </Grid>
        <Grid className='feedback-right-main'>
          <Grid style={{padding: '5px', fontSize: '14px'}}>
            <h3 style={{marginBottom: '5px'}}>{`${feedback.title}`}</h3>
            <p>{`${feedback.feedback}`}</p>
          </Grid>
        </Grid>
        <Grid className='feedback-right-footer'>
          <Grid className='was-this-helpful-images'>  
            <p className='was-this-helpful'>Was this helpful?</p>
            <Grid className='thumbs-container'>
              <img className='thumbs-up' src={thumbsUp} alt="thumbsUp.svg" style={{height: '20px', width: '20px'}}/>
              <span className='thumbs-count'>0</span>
              <img className='thumbs-down' src={thumbsDown} alt="thumbsDown.svg" style={{height: '20px', width: '20px', verticalAlign:'bottom'}}/>
              <span className='thumbs-count'>0</span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}