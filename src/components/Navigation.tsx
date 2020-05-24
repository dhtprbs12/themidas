import React, { useState, useEffect } from "react";
import "../css/Navigation.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import About from "./About";
import FilterSearch from "./FilterSearch";
import Home from "./Home";
import Contact from "./Contact";
import { createBrowserHistory } from "history";
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';

const history = createBrowserHistory();

const Navigation: React.FC = () => {
  const [showNav, setShowNav] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)')
    mediaQuery.addListener(handleMediaQueryChange)
    handleMediaQueryChange(mediaQuery)

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  })

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true)
    } else {
      setIsSmallScreen(false)
    }
  }
  const toggleNavigation = () => {
    setShowNav(!showNav)
  }
  return (
    <Router history={history}>
      <header className="header">
        <h1 className='siteName'>
          <Link to="/">
            TheMidas<span>.</span>
          </Link>
        </h1>
        {(!isSmallScreen || showNav) && <nav className='nav'>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/markets">Markets/Types</Link>
          <Link to="/contact">Contact</Link>
        </nav>}
        <button onClick={toggleNavigation} className='responsible-header-image'>
          <FormatListBulletedOutlinedIcon />
        </button>
      </header>
      <Route path="/" exact strict render={() => <Home />} />
      <Route path="/about" exact strict render={() => <About />} />
      <Route path="/markets" exact strict render={() => <FilterSearch />} />
      <Route path="/contact" exact strict render={() => <Contact />} />
    </Router>
  );
};

export default Navigation;
