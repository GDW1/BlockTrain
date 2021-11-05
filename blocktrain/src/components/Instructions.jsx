import React, { useState, useEffect } from 'react';
import './Instructions.css';
import logo from '../images/logo1.png';
import threeBarIcon from '../images/three-bar-menu-icon-3.png';

function Instructions() {

    return (
        <div className="instructions">
            <div id="text">
                <h1>Welcome.</h1>
                <p>1. Enter a word. Only alphabetic characters allowed</p>
                <p>2. Press submit</p>
                <p>3. Watch the story unfold</p>
                <h2>Scroll down to begin!</h2>
            </div>
            <div id="imageContainer">
                <img className="image" src={logo} alt={"blockchain"}/>
            </div>
        </div>
    );
}

export default Instructions