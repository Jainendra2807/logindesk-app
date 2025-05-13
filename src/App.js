import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import SignUp from './Component/SignUp';
import LoginPage from './Component/LoginPage'
import Dashboard from './Component/Dashboard';
import Footer from './Component/Footer';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;