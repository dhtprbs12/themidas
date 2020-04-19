import React from "react";
import "../css/Article.css";
import articleChart from "../images/article-chart.svg";

const Article: React.FC = props => {
  return (
    <div className="article">
      <div className="article-wrapper">
        <div className="article-description-and-image">
          <img
            className="article-image"
            src={articleChart}
            alt="article-chart"
          ></img>
          <div className="article-description">
            <h1>Make Your Investment More Targetable Using The Midas</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam assumenda ea quo cupiditate facere deleniti fuga
              officia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
