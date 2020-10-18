import { Grid } from "@material-ui/core";
import React from "react";
import '../css/CompanyValue.css'

function CompanyValue() {

  function getEvaluation(diff: number): { name: string; value: string } {
    if (diff == 0) {
      return { name: 'no-diff', value: 'No Difference' }
    } else if (diff < 0) {
      return { name: 'neg-diff', value: 'Over Estimated' }
    }
    return { name: 'pos-diff', value: 'Under Estimated' }
  }

  const evaluation = getEvaluation(1)
  return (
    <Grid className='company-value-container'>
      <h3 className='analysis-title'>{'Analysis'}</h3>
      <Grid className='analysis-info'>
        <ul>
          <li><span>{`Proper price:`}</span><h5>{'$124'}</h5></li>
          <li><span>{`Current price:`}</span><h5>{'$125'}</h5></li>
          <li><span>{`Difference:`}</span><h5>{'$1'}</h5></li>
          <li><span>{`Evaluation:`}</span><h5 className={evaluation.name}>{evaluation.value}</h5></li>
        </ul>
      </Grid>
    </Grid>
  )
}

export default CompanyValue