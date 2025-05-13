import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Footer.css';

function Footer() {
  return (
    <div className="FooterContainer">
      <footer className="text-center text-lg-start">
        <div className="container d-flex justify-content-center py-5">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2 btns"
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2 btns"
          >
            <i className="fab fa-youtube"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2 btns"
          >
            <i className="fab fa-instagram"></i>
          </button>
          <button
            type="button"
            className="btn btn-primary btn-lg btn-floating mx-2 btns"
          >
            <i className="fab fa-twitter"></i>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

