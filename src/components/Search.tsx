import React, { useState, useEffect } from "react";
import "../css/Search.css";
import searchImage from "../images/search.svg";
import { useApolloClient } from "@apollo/react-hooks";
import { GET_COMPANIES } from '../query/getCompanies'
import CompanyDetail from "./CompanyDetail";
import { INTRA_DAILY_API_CALL, WEEKLY_API_CALL, MONTHLY_API_CALL, YEARLY_API_CALL, FIVE_YEAR_API_CALL, OVER_TWENTY_YEAR_API_CALL } from "../auth/apiCall";

type Company = {
  id: number,
  symbol: string,
  name: string,
  industry: string,
  description: string,
  mission: string,
}

export type Stock = {
  date: string,
  open: string,
  hight: string,
  low: string,
  close: string
}

type Props = {
  type: string
  sector: string
}

const Search: React.FC<Props> = (props: Props) => {
  const { type, sector } = props
  const [companyName, setCompanyName] = useState<string>('');
  const [companySymbol, setCompanySymbol] = useState<string>('');
  const [isCompanyClicked, setIsCompanyClicked] = useState<boolean>(false);
  const [priceArray, setPriceArray] = useState<Array<Stock>>([])
  const [companyArr, setCompanyArray] = useState<Array<Company>>([])

  const client = useApolloClient()
  async function runQuery(id: number) {
    // Manually query your queries.
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
    return { data, errors, loading }
  }

  useEffect(() => {
    runQuery(0)
  }, [type, sector])

  const companyClick = async (event) => {
    const symbol = event.target.getAttribute('id')
    const description = event.target.textContent
    // await 은 Promise 가 resolved 되어서 결과값이 넘어 올 때까지 기다리는 명령어 
    // as Array<Stock> cast `unknown` type to `Array<Stock>`
    const data = await INTRA_DAILY_API_CALL(symbol) as Array<Stock>
    setPriceArray(data)
    setCompanySymbol(symbol)
    setCompanyName(description);
    setIsCompanyClicked(true)
  };

  const onInput = (event) => {
    event.preventDefault()
    const value = event.target.value
  }

  const onChange = async (event) => {
    event.preventDefault()
    const selected: string = event.target.value
    let array: Array<Stock> = []
    switch (selected) {
      case '1D':
        array = await INTRA_DAILY_API_CALL(companySymbol) as Array<Stock>
        setPriceArray(array)
        break;
      case '1W':
        array = await WEEKLY_API_CALL(companySymbol) as Array<Stock>
        setPriceArray(array)
        break;
      case '1M':
        array = await MONTHLY_API_CALL(companySymbol, 1) as Array<Stock>
        setPriceArray(array)
        break;
      case '6M':
        array = await MONTHLY_API_CALL(companySymbol, 6) as Array<Stock>
        setPriceArray(array)
        break;
      case '1Y':
        array = await YEARLY_API_CALL(companySymbol) as Array<Stock>
        setPriceArray(array)
        break;
      case '5Y':
        array = await FIVE_YEAR_API_CALL(companySymbol) as Array<Stock>
        setPriceArray(array)
        break;
      default:
        // 20Y+
        array = await OVER_TWENTY_YEAR_API_CALL(companySymbol) as Array<Stock>
        setPriceArray(array)
        break;
    }
  }

  function handleScroll(event) {
    var node = event.target;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;

    if (bottom && companyArr.length > 0) {
      const index = companyArr[companyArr.length - 1].id
      runQuery(Number(index))
    }
  }

  return (
    <div className="search">
      <div className="search-top">
        <input
          type="text"
          className="form-control"
          placeholder="Search a company by name.."
          onChange={onInput}
        />
        <img src={searchImage} alt="search-img" />
      </div>
      <div className="search-bottom">
        <div className="search-bottom-left" onScroll={handleScroll}>
          {companyArr.map(company => (
            <div key={company.id} className="search-element" data-index={company.id} id={company.symbol} onClick={companyClick}>
              <h1>{company.name}</h1>
              <h1>{company.industry}</h1>
            </div>
          ))}
        </div>
        <div className="search-bottom-right">
          {isCompanyClicked && <CompanyDetail symbol={companySymbol} name={companyName} array={priceArray}
            onChange={onChange}
          />}
        </div>
      </div>
    </div>
  );
};

export default Search;
