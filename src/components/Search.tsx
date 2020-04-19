import React, { useState } from "react";
import "../css/Search.css";
import searchImage from "../images/search.svg";

const Search: React.FC = props => {
  const array: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [info, setInfo] = useState<string>("");

  const elementClick = event => {
    setInfo(event.target.textContent);
  };

  return (
    <div className="search">
      <div className="search-top">
        <input
          type="text"
          className="form-control"
          placeholder="Search a company..."
        />

        <img src={searchImage} alt="search-img" />
      </div>
      <div className="search-bottom">
        <div className="search-bottom-left" onClick={elementClick}>
          {array.map(index => (
            <div key={index} className="search-element">
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
