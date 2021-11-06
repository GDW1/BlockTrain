/* Filename: Header.jsx; Last Updated: 10/23/2021
 * Header.jsx displays the logo and top bar
 */

import React, { useState, useEffect } from 'react'
import './Header.css';
import threeBarIcon from '../images/three-bar-menu-icon-3.png';
import { Link, withRouter } from "react-router-dom";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

function Header() {
    const {height, width} = useWindowDimensions();
    //This if statement checks if the ratio of height to width is less than 1.5. If so
    //then the header that was made for tablets and computer screens will display.
    //Otherwise the header that was made for mobile screens will display.
    if (height / width < 1.5) {
        return (
            <div className="headerBlock">
                <div className="dropdown">
                    <button className="dropbtn"><img className="dropDownImage" src={threeBarIcon} alt="bar icon"/></button>
                    <div className="dropdown-content">
                        <Link to="/">Home</Link>
                        <Link to="/full-story">Full Story</Link>
                        <Link to="/about-us">About Us</Link>
                    </div>
                </div>
                <p className="title"><span className="bold">Block</span>Train</p>
            </div>
        )
    }
    else {
        return (
            <div className="headerBlockMobile">
                <div className="dropdownMobile">
                    <button className="dropbtnMobile"><img className="dropDownImage" src={threeBarIcon} alt="bar icon"/></button>
                    <div className="dropdown-contentMobile">
                        <Link to="/">Home</Link>
                        <Link to="/full-story">Full Story</Link>
                        <Link to="/about-us">About Us</Link>
                    </div>
                </div>
                <p className="titleMobile"><span className="bold">Block</span>Train</p>
            </div>
        )
    }
}

export default Header