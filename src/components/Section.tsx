import React from "react";
import "../css/Section.css";
import MostPopular1 from './MostPopular1'
import MostPopular2 from './MostPopular2'
import MostPopular3 from './MostPopular3'
import MostPopular4 from './MostPopular4'

const Section: React.FC = () => {

  return (
    <div className="section">
      <div className='section-container'>
        <MostPopular1 />
        <MostPopular2 />
        <MostPopular3 />
        <MostPopular4 />
      </div>
    </div>
  )
}

export default Section;

