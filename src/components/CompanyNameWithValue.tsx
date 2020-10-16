import { Grid } from '@material-ui/core'
import React from 'react'

type Props = {
    symbol: string
    name: string
    value: number
}

function CompanyNameWithValue(props: Props) {
    const { symbol, name, value } = props

    return (
        <Grid className='company-name-with-value-container'>
            <h4>{symbol}</h4>
            <h2>{name}</h2>
            <h3>{`$ ${value}`}</h3>
        </Grid>
    )
}

export default CompanyNameWithValue