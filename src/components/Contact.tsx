import React from "react";
import "../css/Contact.css";

const Contact: React.FC = props => {
  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-wrapper">
          <form action="#" className="contact-form">
            <h3 className="contact-form-h3">Contact Form</h3>
            <div className="contact-form-name formGroup">
              <label>First Name</label>
              <input></input>
              <label>Last Name</label>
              <input></input>
            </div>
            <div className="contact-form-email formGroup">
              <div>
                <label>Email</label>
                <input></input>
              </div>
            </div>
            <div className="contact-form-message formGroup">
              <div>
                <label>Message</label>
                <textarea
                  cols={30}
                  rows={7}
                  placeholder="Leave your message here..."
                ></textarea>
              </div>
            </div>
            <div className="contact-form-button formGroup">
              <div>
                <button>Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
