import React from "react";
import about from "../images/about.svg";
import "../css/About.css";

const About: React.FC = props => {
  return (
    <div className="about">
      <div className="about-top">
        <div className="about-top-h2-wrapper">
          <h2>About Us</h2>
        </div>
      </div>
      <div className="about-bottom">
        <div className="about-bottom-left">
          <img className="about-image" src={about} alt="about.svg" />
        </div>
        <div className="about-bottom-right">
          <h2>Our Mission</h2>
          <p>
            Eos cumque optio dolores excepturi rerum temporibus magni recusandae
            eveniet, totam omnis consectetur maxime quibusdam expedita dolorem
            dolor nobis dicta labore quaerat esse magnam unde, aperiam delectus!
            At maiores, itaque.
          </p>
          <ul>
            <li>Laborum enim quasi at modi</li>
            <li>Ad at tempore</li>
            <li>Labore quaerat esse</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
