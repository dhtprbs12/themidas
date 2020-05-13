import React from "react";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

type Props = {
  onChange: (event) => void
  defaultValue: string
}

const PeriodSelection: React.FC<Props> = (props: Props) => {
  const { onChange, defaultValue } = props

  return (
    <RadioGroup onChange={onChange} row aria-label="position" name="position" value={defaultValue}>
      <FormControlLabel
        value="1D"
        control={<Radio color="primary" size="small" />}
        label="1D"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="1W"
        control={<Radio color="primary" size="small" />}
        label="1W"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="1M"
        control={<Radio color="primary" size="small" />}
        label="1M"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="6M"
        control={<Radio color="primary" size="small" />}
        label="6M"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="1Y"
        control={<Radio color="primary" size="small" />}
        label="1Y"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="5Y"
        control={<Radio color="primary" size="small" />}
        label="5Y"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="20Y+"
        control={<Radio color="primary" size="small" />}
        label="20Y+"
        labelPlacement="bottom"

      />
    </RadioGroup>
  )
}

export default PeriodSelection