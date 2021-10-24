/* Filename: Header.jsx; Last Updated: 10/23/2021
 * Header.jsx displays the logo and top bar
 */

import React, { useState } from 'react'
import './Header.css';
import threeBarIcon from '../images/three-bar-menu-icon-3.png';
import { Link, withRouter } from "react-router-dom";

function Header() {

    return (
        <div className = "headerBlock">
            <div className= "dropdown">
                <button className="dropbtn"><img className = "dropDownImage" src = {threeBarIcon} alt = "bar icon"/></button>
                <div className="dropdown-content">
                    <Link to="/">Home</Link>
                    <Link to="/full-story">Full Story</Link>
                    <Link to="/about-us">About Us</Link>
                </div>
            </div>
            <p><span className = "bold">Block</span>Train</p>
        </div>
    )
}

export default Header