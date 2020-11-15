import { Grid, Select } from "@material-ui/core";
import React from "react";
import { COMPANY_ANALYSIS_API_CALL } from "../auth/apiCall";
import '../css/CompanyValue.css'

type Props = {
  symbol: string
}

enum Retention {
  SHORT = 'Short Retention',
  LONG = 'Long Retention'
}

const EVALUATION = {
  // current price - proper price
  NO_DIFF: { name: 'no-diff', value: 'No Difference' },
  NEG_DIFF: { name: 'neg-diff', value: 'Under Estimated' },
  POS_DIFF: { name: 'pos-diff', value: 'Over Estimated' }
}

type Analysis = {
  shortTerm: number,
  longTerm: number,
  currentPrice: number
}

function CompanyValue(props: Props) {
  const { symbol } = props
  const [retention, setRetention] = React.useState(Retention.SHORT)
  const [object, setObject] = React.useState<Analysis>()

  React.useEffect(() => {
    async function API_CALL() {
      await COMPANY_ANALYSIS_API_CALL(symbol)
        .then(data => {
          const result = data as Analysis
          setObject(result)
        })
        .catch(err => {
          // throw error here 
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
      return EVALUATION.NO_DIFF
    } else if (diff < 0) {
      return EVALUATION.NEG_DIFF
    }
    return EVALUATION.POS_DIFF
  }

  function calculatePrice(object?: Analysis) {
    if (!object) {
      return 0
    }

    if (retention === Retention.SHORT) {
      return Number((object.currentPrice * object.shortTerm).toFixed(2))
    }
    return Number((object.currentPrice * object.longTerm).toFixed(2))
  }

  const properPrice = calculatePrice(object)
  const difference = object ? object.currentPrice - properPrice : 0
  const evaluation = object ? getEvaluation(difference) : EVALUATION.NO_DIFF

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
        <option value={Retention.SHORT}>{Retention.SHORT}</option>
        <option value={Retention.LONG}>{Retention.LONG}</option>
      </Select>
      <Grid className='analysis-info'>
        <ul>
          <li><span>{`Proper price: $`}</span><h5>{properPrice}</h5></li>
          <li><span>{`Current price: $`}</span><h5>{object ? object.currentPrice : 0}</h5></li>
          <li><span>{`Difference: $`}</span><h5>{difference}</h5></li>
          <li><span>{`Evaluation:`}</span><h5 className={evaluation.name}>{evaluation.value}</h5></li>
        </ul>
      </Grid>
    </Grid>
  )
}

export default CompanyValue