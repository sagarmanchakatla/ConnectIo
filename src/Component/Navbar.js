import React from 'react';
import { AccountCircle } from '@mui/icons-material'; 
import './Navbar.css'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <div className="logo">Logo</div>
      <div className="profile">
        <Link to="/profile">
            <div id="icon"><AccountCircle /></div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
