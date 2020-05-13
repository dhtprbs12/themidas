import React, { useState } from "react";
import '../css/FilterSearch.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Search from './Search'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const typesOptions = [
	'NASDAQ', 'NYSE', 'AMEX', 'SP500'
];

const sectorsOtions = [
	'Finance', 'Technology', 'Health Care', 'Energy', 'Trasportation', 'Consumer Services', 'Capital Goods'];

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			[theme.breakpoints.up('sm')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		drawerPaper: {
			width: drawerWidth,
			top: 'inherit',
			height: '600px',
			border: 'none',
			backgroundColor: 'transparent'
		},
	}),
);

const FilterSearch: React.FC = () => {

	const [typesSelected, setTypesSelected] = useState('AMEX')
	const [sectorsSelected, setSectorsSelected] = useState('Finance')

	const typesSelect = (option) => {
		setTypesSelected(option.value)
	}

	const sectorsSelect = (option) => {
		setSectorsSelected(option.value)
	}


	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div className='filter-container'>
			<div className='filter-types'>
				<h4>Type</h4>
				<Dropdown options={typesOptions} onChange={typesSelect} value={typesSelected} placeholder="Select a type" />
			</div>
			<div className="filter-sectors">
				<h4>Sectors</h4>
				<Dropdown options={sectorsOtions} onChange={sectorsSelect} value={sectorsSelected} placeholder="Select a sector" />
			</div>
		</div>
	);

	return (
		<div>
			<CssBaseline />
			<IconButton
				color="inherit"
				aria-label="open drawer"
				edge="start"
				onClick={handleDrawerToggle}
				className={classes.menuButton}
			>
				<MenuIcon />
			</IconButton>
			<nav className={classes.drawer}>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main>
				<Search type={typesSelected} sector={sectorsSelected} />
			</main>
		</div>
	)
}

export default FilterSearch;



