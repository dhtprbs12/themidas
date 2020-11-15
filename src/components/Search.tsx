import React, { useState, useEffect, useRef } from "react";
import "../css/Search.css";
import { useQuery } from "@apollo/react-hooks";
import { GET_COMPANIES } from '../query/getCompanies'
import CompanyDetail from "./CompanyDetail";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import company from '../images/company.svg'
import CircularLoading from "./CircularLoading";
import SmallSearchScreen from "./SmallSearchScreen";
import NormalSearchScreen from "./NormalSearchScreen";
import InputField from "./InputField";

export type Company = {
  id: number,
  symbol: string,
  name: string,
  industry: string,
  description: string,
  mission: string,
}

type Props = {
  type: string
  industry: string
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
  const { type, industry } = props
  const [currentCompany, setCurrentCompany] = useState<Company>()
  const [companyArr, setCompanyArray] = useState<Array<Company>>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [id, setId] = useState<number>(0)
  const classes = useStyles();

  const { data, loading, error, refetch } = useQuery<{ companies: Array<Company> }, { type: string, id: number, industry: string }>(GET_COMPANIES, {
    variables: {
      type: type,
      id: id,
      industry: industry
    },
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const companies = data.companies as Array<Company>
      if (id === 0) {
        setCurrentCompany(companies[0])
        setCompanyArray([])
        setCompanyArray(companies)
      } else {
        setCompanyArray(prevArray => prevArray.concat(companies))
      }
    },
    // should be true to call `onCompleted` when refetch 
    notifyOnNetworkStatusChange: true
  })

  // this is only called only if either "type" or "sector" gets changed, so should always starts from 0
  useEffect(() => {
    setId(0)
  }, [type, industry])

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

  // if (id === 0 && loading) {
  //   return <CircularLoading />
  // }

  if (error) {
    return null
  }

  const companyClick = (company: Company) => {
    setCurrentCompany(company)
    toggleDrawer()
  };

  function handleScroll(event) {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    const inputValue = inputRef.current?.value === '' || (inputRef.current?.value === undefined)
    const isSearchList = node.className === 'search-list'
    if (inputValue && bottom && companyArr.length > 0 && isSearchList) {
      const index = companyArr[companyArr.length - 1].id
      setId(Number(index))
    }
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const inputField = <InputField refetch={refetch} id={id} setId={setId} setCompanyArray={setCompanyArray} inputRef={inputRef} />

  return (
    <>
      <div className="search">
        {isSmallScreen
          ?
          <SmallSearchScreen isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} handleScroll={handleScroll} companyArr={companyArr} companyClick={companyClick} drawerWidth={classes.drawerWidth} inputField={inputField} />
          :
          <NormalSearchScreen handleScroll={handleScroll} companyArr={companyArr} companyClick={companyClick} inputField={inputField} />
        }
        <div className="search-right">
          <CompanyDetail symbol={currentCompany?.symbol || ''} name={currentCompany?.name || ''}
          />
        </div>
        <button onClick={toggleDrawer} className='right-drawer-button'>
          <img className="company-image" src={company} alt="company.svg" />
        </button>
      </div>
    </>
  )
}

export default Search;
