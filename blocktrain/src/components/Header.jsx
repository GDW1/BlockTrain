/* Filename: Header.jsx; Last Updated: 10/22/2021
 * Header.jsx displays the logo and top bar
 */

import React, { useState } from 'react'
import './Header.css';
import threeBarIcon from '../images/three-bar-menu-icon-3.png';

function Header() {

    return (
        <div className = "headerBlock">
            <div className= "dropdown">
                <button className="dropbtn"><img className = "dropDownImage" src = {threeBarIcon} alt = "bar icon"/></button>
                <div className="dropdown-content">
                    <a href="#">Home</a>
                    <a href="#">Full Story</a>
                    <a href="#">About Us</a>
                </div>
            </div>
            <p><span className = "bold">Block</span>Train</p>
        </div>
    )
}

export default Header