import React, { useState } from "react";
import "../css/Search.css";
import searchImage from "../images/search.svg";
import Filter from './Filter'

const Search: React.FC = props => {
  const array: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [info, setInfo] = useState<string>("");

  const elementClick = event => {
    setInfo(event.target.textContent);
  };

  const onInput = (event) => {
    event.preventDefault()
    console.log(event.target.value)
  }

  return (
    <div className="search">
      <div className="search-top">
        <input
          type="text"
          className="form-control"
          placeholder="Search a company..."
          onChange={onInput}
        />

        <img src={searchImage} alt="search-img" />
      </div>
      <div className="search-bottom">
        <Filter />
        <div className="search-bottom-left">
          {array.map(index => (
            <div key={index} className="search-element" onClick={elementClick}>
              {`This is div ${index}`}
            </div>
          ))}
        </div>
        <div className="search-bottom-right">
          <div>{info}</div>
        </div>
      </div>
    </div>
  );
};

export default Search;
