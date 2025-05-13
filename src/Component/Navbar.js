import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Navbar.css';
import {useLocation,useNavigate } from 'react-router-dom';

function Navbar() {
  const [show, setShow] = useState(false)
  const location=useLocation()
  const navigate = useNavigate();

  console.log(show, "show")

  const handleMoreIcon =()=> {
    setShow(!show)
  }
  const handleLogout=()=>{
    navigate('/login')
    setShow(!show)

  }

  const isDashboard = location.pathname === '/dashboard';
  return (
    <nav className="navbar">
      <div className="navbarImageContainer">
        <div className='navbarImage'>
          <img
            src={`${process.env.PUBLIC_URL}/images/softmind_logo3.png`}
            width={60}
            height={60}
            alt="Navbar logo"
          />
        </div>
        <div className='navbarHeading'><h2>Softmind</h2></div>
      </div>
      <div className='navbarItems'>
      {isDashboard && (
          <div style={{ color: "white", cursor: "pointer" }} onClick={handleMoreIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </div>
        )}
        {show && (
          <div className="dropdownMenu" style={{ position: 'absolute', right: '10px', top: '65px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', zIndex: 1000 }}>
            <div onClick={handleLogout}  style={{ color: 'red', cursor: 'pointer' }}>
              Logout
            </div>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

