import React, { useState, useEffect } from 'react';
import './Instructions.css';
import logo from '../images/logo1.png';

function Instructions() {

    return (
        <div className="instructions">
            <div id="text">
                <h1>Welcome.</h1>
                <p>1. Enter a word</p>
                <p> - Only alphabetic characters are allowed</p>
                <p> - No profanities</p>
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