import React from 'react'
import { Grid } from '@material-ui/core';
import peterLynch from '../images/peter-lynch.jpeg'

type Props = {}

const FeedbackElement: React.FC<Props> = () => {

  return (
    <Grid className="feedback-element">
      <Grid className='feedback-left'>
        <Grid className='feedback-user-image'>
          <img src={peterLynch} alt="company.svg" style={{ height: '160px', width: '100%' }} />
        </Grid>
      </Grid>
      <Grid className='feedback-right'>

      </Grid>
    </Grid>
  )
}

export default FeedbackElement