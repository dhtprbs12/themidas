import React, { useState } from "react";
import '../css/Filter.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const typesOptions = [
    'NASDAQ', 'NYSE', 'AMES', 'S&P 500'
];

const periodOptions = [
    '1 day', '1 week', '1 month', '3 months', '6 months', '1 year', '5 years', '20+ years'
];

const sectiorsOtions = [
    'Financial', 'Services', 'Technology', 'Healthcare', 'Energy', 'Trasportation'
];

const Filter: React.FC = props => {

    const [typesSelected, setTypesSelected] = useState('NASDAQ')
    const [periodSelected, setPeriodSelected] = useState('1 day')
    const [sectorsSelected, setSectorsSelected] = useState('Financial')

    const typesSelect = (option) => {
        setTypesSelected(option)
    }

    const periodSelect = (option) => {
        setPeriodSelected(option)
    }

    const sectorsSelect = (option) => {
        setSectorsSelected(option)
    }

    return (
        <div className='filter'>
            <div className='filter-container'>
                <div className="filter-types">
                    <h4>Type</h4>
                    <Dropdown options={typesOptions} onChange={typesSelect} value={typesSelected} placeholder="Select a type" />
                </div>
                <div className="filter-period">
                    <h4>Period</h4>
                    <Dropdown options={periodOptions} onChange={periodSelect} value={periodSelected} placeholder="Select a period" />
                </div>
                <div className="filter-sectors">
                    <h4>Sectors</h4>
                    <Dropdown options={sectiorsOtions} onChange={sectorsSelect} value={sectorsSelected} placeholder="Select a sector" />
                </div>
            </div>
        </div>
    )
}

export default Filter;



