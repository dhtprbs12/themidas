import React, { useState, useEffect, useRef } from "react";
import "../css/Search.css";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_COMPANIES } from '../query/getCompanies'
import { GET_AUTOCOMPLETE_COMPANIES } from '../query/getAutoCompleteCompanies'
import CompanyDetail from "./CompanyDetail";
import SearchElement from "./SearchElement";
import { makeStyles, Theme, createStyles, Drawer, Paper, InputBase, IconButton } from "@material-ui/core";
import company from '../images/company.svg'
import clsx from 'clsx';
import SearchIcon from '@material-ui/icons/Search';

type Company = {
  id: number,
  symbol: string,
  name: string,
  industry: string,
  description: string,
  mission: string,
}

type Props = {
  type: string
  sector: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: 30
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    drawerWidth: {
      width: '300px'
    },
  }),
);


const Search: React.FC<Props> = (props: Props) => {
  const { type, sector } = props
  const [companyName, setCompanyName] = useState<string>('');
  const [companySymbol, setCompanySymbol] = useState<string>('');
  const [companyArr, setCompanyArray] = useState<Array<Company>>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const client = useApolloClient()
  async function runQuery(id: number) {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    if (id === 0) {
      setCompanyArray([])
    }
    const { data, errors, loading } = await client.query({
      query: GET_COMPANIES, variables: {
        type: type,
        id: id,
        industry: sector
      }, fetchPolicy: 'cache-first'
    })
    const { companies }: { companies: Array<Company> } = data
    setCompanyArray(prevArray => prevArray.concat(companies))
    return { companies, errors, loading }
  }

  useEffect(() => {
    async function run() {
      const { companies } = await runQuery(0)
      setCompanySymbol(companies[0].symbol)
      setCompanyName(companies[0].name)
    }
    run()
  }, [type, sector])

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

  const companyClick = (name: string, symbol: string) => {
    setCompanySymbol(symbol)
    setCompanyName(name);
    toggleDrawer()
  };

  const onInput = async (event) => {
    event.preventDefault()
    const value = event.target.value
    if (value === '') {
      runQuery(0)
      return
    }
    const { data, errors, loading } = await client.query({
      query: GET_AUTOCOMPLETE_COMPANIES, variables: {
        name: value
      },
      fetchPolicy: 'cache-first'
    })
    const { autoCompleteCompanies }: { autoCompleteCompanies: Array<Company> } = data
    setCompanyArray(autoCompleteCompanies)
  }

  function handleScroll(event) {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    const inputValue = inputRef.current?.value === ''
    if (inputValue && bottom && companyArr.length > 0) {
      const index = companyArr[companyArr.length - 1].id
      runQuery(Number(index))
    }
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const classes = useStyles();

  const searchElements = (
    <>
      <Paper component="form" className={classes.root}>
        <InputBase
          onChange={onInput}
          ref={inputRef}
          className={classes.input}
          placeholder="Search a company by name.."
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <div className='search-list'>
        {companyArr.length > 0 ? companyArr.map((company: Company, index: number) => (
          <SearchElement key={index} data-index={company.id} name={company.name} symbol={company.symbol} companyClick={companyClick} industry={company.industry} />
        )) : <h3>No results found</h3>}
      </div>
    </>
  )

  return (
    <div className="search">
      {isSmallScreen ? <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}>
        <div className={clsx(classes.drawerWidth)} onScroll={handleScroll}>
          {searchElements}
        </div>
      </Drawer> : <div className="search-left" onScroll={handleScroll}>
          {searchElements}
        </div>}
      <div className="search-right">
        <CompanyDetail symbol={companySymbol} name={companyName}
        />
      </div>
      <button onClick={toggleDrawer} className='right-drawer-button'>
        <img className="company-image" src={company} alt="company.svg" />
      </button>
    </div>
  );
};

export default Search;
