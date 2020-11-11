import { Grid, Select } from "@material-ui/core";
import React from "react";
import { COMPANY_ANALYSIS_API_CALL } from "../auth/apiCall";
import '../css/CompanyValue.css'

type Props = {
  symbol: string
}

type Analysis = {
  shortTerm: number | undefined,
  longTerm: number,
  currentPrice: number
}

function CompanyValue(props: Props) {
  const { symbol } = props
  const [retention, setRetention] = React.useState('Short Retention')
  const [object, setObject] = React.useState<Analysis>()

  React.useEffect(() => {
    async function API_CALL() {
      await COMPANY_ANALYSIS_API_CALL(symbol)
        .then(data => {
          const result = data as Analysis
          console.log(result)
          setObject(result)
        })
        .catch(err => {
          console.log(err)
        })
    }
    API_CALL()
  }, [symbol])

  const handleChange = (event) => {
    const name = event.target.name;
    setRetention(event.target.value);
  };

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
      <Select
        native
        className='retention'
        value={retention}
        onChange={handleChange}
        inputProps={{
          name: 'retention',
        }}
      >
        <option value={'Short Retention'}>{'Short Retention'}</option>
        <option value={'Long Retention'}>{'Long Retention'}</option>
      </Select>
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