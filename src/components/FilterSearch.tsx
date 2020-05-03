import React, { useState } from "react";
import '../css/FilterSearch.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Search from './Search'

const typesOptions = [
	'NASDAQ', 'NYSE', 'AMEX', 'SP500'
];

const sectorsOtions = [
	'Finance', 'Technology', 'Health Care', 'Energy', 'Trasportation', 'Consumer Services', 'Capital Goods'];

const FilterSearch: React.FC = () => {

	const [typesSelected, setTypesSelected] = useState('AMEX')
	const [sectorsSelected, setSectorsSelected] = useState('Finance')

	const typesSelect = (option) => {
		setTypesSelected(option.value)
	}

	const sectorsSelect = (option) => {
		setSectorsSelected(option.value)
	}

	return (
		<>
			<div className='filter'>
				<div className='filter-container'>
					<div className="filter-types">
						<h4>Type</h4>
						<Dropdown options={typesOptions} onChange={typesSelect} value={typesSelected} placeholder="Select a type" />
					</div>
					<div className="filter-sectors">
						<h4>Sectors</h4>
						<Dropdown options={sectorsOtions} onChange={sectorsSelect} value={sectorsSelected} placeholder="Select a sector" />
					</div>
				</div>
			</div>
			<Search type={typesSelected} sector={sectorsSelected} />
		</>
	)
}

export default FilterSearch;



