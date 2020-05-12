import React, { useState, useEffect, Fragment, useRef } from "react";
import "../css/Search.css";
import searchImage from "../images/search.svg";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_COMPANIES } from '../query/getCompanies'
import { GET_AUTOCOMPLETE_COMPANIES } from '../query/getAutoCompleteCompanies'
import CompanyDetail from "./CompanyDetail";
import SearchElement from "./SearchElement";

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

const Search: React.FC<Props> = (props: Props) => {
  const { type, sector } = props
  const [companyName, setCompanyName] = useState<string>('');
  const [companySymbol, setCompanySymbol] = useState<string>('');
  const [companyArr, setCompanyArray] = useState<Array<Company>>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

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
      }, fetchPolicy: 'network-only'
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

  const companyClick = (name: string, symbol: string) => {
    setCompanySymbol(symbol)
    setCompanyName(name);
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
      fetchPolicy: 'network-only'
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

  return (
    <div className="search">
      <div className="search-top">
        <Fragment>
          <input
            type="text"
            className="form-control"
            placeholder="Search a company by name.."
            onChange={onInput}
            ref={inputRef}
          />
          <img src={searchImage} alt="search-img" />
        </Fragment>
      </div>
      <div className="search-bottom">
        <div className="search-bottom-left" onScroll={handleScroll}>
          {companyArr.length > 0 ? companyArr.map((company: Company, index: number) => (
            <SearchElement key={index} data-index={company.id} name={company.name} symbol={company.symbol} companyClick={companyClick} industry={company.industry} />
          )) : <h3>No results found</h3>}
        </div>
        <div className="search-bottom-right">
          <CompanyDetail symbol={companySymbol} name={companyName}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
