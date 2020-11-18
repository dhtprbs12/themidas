import React from "react";
import CircularLoading from "./CircularLoading";
import { Company } from "./Search";
import SearchElement from "./SearchElement";

type Props = {
  handleScroll: (event: any) => void
  companyArr: Array<Company>
  companyClick: (company: Company) => void
  inputField: React.ReactNode
  loading: boolean
}

function NormalSearchScreen(props: Props) {
  const { handleScroll, companyClick, companyArr, inputField, loading } = props

  return (
    <div className="search-left" onScroll={handleScroll}>
      {inputField}
      <div className='search-list'>
        {loading && <CircularLoading />}
        {companyArr && companyArr.length > 0 ? companyArr.map((company: Company, index: number) => (
          <SearchElement key={index} data-index={company.id} name={company.name} symbol={company.symbol} companyClick={() => companyClick(company)} industry={company.industry} />
        )) : <h3>No results found</h3>}
      </div>
    </div>
  )
}

export default NormalSearchScreen;



