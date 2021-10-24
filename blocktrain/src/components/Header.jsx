/* Filename: Header.jsx; Last Updated: 10/22/2021
 * Header.jsx displays the logo and top bar
 */

import React, { useState } from 'react'
import './Header.css';

function Header() {

    return (
        <div className = "headerBlock">
            <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
            <p><span className = "bold">Block</span>Train</p>
        </div>
    )
}

export default Header