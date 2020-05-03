import React from "react";
import "../css/Header.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import About from "./About";
import FilterSearch from "./FilterSearch";
import Home from "./Home";
import Contact from "./Contact";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Navigation: React.FC = props => {
  return (
    <Router history={history}>
      <header className="header">
        <div className="row">
          <div className="header-center">
            <div className="header-left">
              <h1>
                <Link to="/">
                  TheMidas<span>.</span>
                </Link>
              </h1>
            </div>
            <div className="header-right">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/markets">Markets/Types</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <Route path="/" exact strict render={() => <Home />} />
            <Route path="/about" exact strict render={() => <About />} />
            <Route path="/markets" exact strict render={() => <FilterSearch />} />
            <Route path="/contact" exact strict render={() => <Contact />} />
          </div>
        </div>
      </header>
    </Router>
  );
};

export default Navigation;
