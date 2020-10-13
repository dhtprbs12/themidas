import React, { useState, useEffect } from "react";
import '../css/FilterSearch.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Search from './Search'
import Drawer from '@material-ui/core/Drawer';
import list from '../images/list.svg'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from "clsx";

const typeOptions = [
	'NASDAQ', 'NYSE', 'AMEX', 'SP500'
];

const industryOptions = [
	'Finance', 'Technology', 'Health Care', 'Energy', 'Trasportation', 'Consumer Services', 'Capital Goods'];

const useStyles = makeStyles(() =>
	createStyles({
		drawerWidth: {
			width: '300px'
		},
	}),
);

const FilterSearch: React.FC = () => {

	const [typesSelected, setTypesSelected] = useState('NASDAQ')
	const [sectorsSelected, setSectorsSelected] = useState('Finance')
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [isSmallScreen, setIsSmallScreen] = useState(false)
	const classes = useStyles();

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 1200px)')
		mediaQuery.addListener(handleMediaQueryChange)
		handleMediaQueryChange(mediaQuery)

		return () => {
			mediaQuery.removeListener(handleMediaQueryChange)
		}
	}, [])

	const handleMediaQueryChange = mediaQuery => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true)
		} else {
			setIsDrawerOpen(false)
			setIsSmallScreen(false)
		}
	}


	const typesSelect = (option) => {
		setTypesSelected(option.value)
	}

	const sectorsSelect = (option) => {
		setSectorsSelected(option.value)
	}


	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const filter = (
		<div className='filter-container'>
			<div className='filter-types'>
				<h4>Type</h4>
				<Dropdown options={typeOptions} onChange={typesSelect} value={typesSelected} placeholder="Select a type" />
			</div>
			<div className="filter-sectors">
				<h4>Industry</h4>
				<Dropdown options={industryOptions} onChange={sectorsSelect} value={sectorsSelected} placeholder="Select a industry" />
			</div>
		</div>
	);

	return (
		<div className='filter-search-container'>
			<button
				onClick={toggleDrawer}
				className='list-drawer-button'
			>
				<img className="list-image" src={list} alt="list.svg" />
			</button>
			{isSmallScreen ? <Drawer
				anchor='left'
				open={isDrawerOpen}
				onClose={toggleDrawer}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}>
				<div className={clsx(classes.drawerWidth)}>{filter}</div>
			</Drawer> : <React.Fragment>{filter}</React.Fragment>}
			<Search type={typesSelected} sector={sectorsSelected} />
		</div>
	)
}

export default FilterSearch;



