import { Drawer } from "@material-ui/core";
import React from "react";
import SearchElement from "./SearchElement";
import { Company } from "./Search";
import clsx from "clsx";
import CircularLoading from "./CircularLoading";

type Props = {
  isDrawerOpen: boolean,
  toggleDrawer: () => void
  handleScroll: (event: any) => void
  companyArr: Array<Company>
  companyClick: (company: Company) => void
  drawerWidth: {}
  inputField: React.ReactNode
  loading: boolean
}


function SmallSearchScreen(props: Props) {
  const { isDrawerOpen, toggleDrawer, handleScroll, companyClick, drawerWidth, companyArr, inputField, loading } = props


  return (
    <Drawer
      anchor='right'
      open={isDrawerOpen}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}>
      <div className={clsx(drawerWidth)} onScroll={handleScroll}>
        {inputField}
        <div className='search-list'>
          {loading && <CircularLoading />}
          {companyArr && companyArr.length > 0 ? companyArr.map((company: Company, index: number) => (
            <SearchElement key={index} data-index={company.id} name={company.name} symbol={company.symbol} companyClick={() => companyClick(company)} industry={company.industry} />
          )) : <h3>No results found</h3>}
        </div>
      </div>
    </Drawer>
  )
}

export default SmallSearchScreen;



