import React, { useState, useEffect } from 'react';
import './Instructions.css';
import logo from '../images/logo1.png';

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

function Instructions() {
    const {height, width} = useWindowDimensions();

    if (height / width < 0.65) {
        return (
            <div className="instructions">
                <div id="text">
                    <h1>Welcome.</h1>
                    <p>1. Enter your user key</p>
                    <p>2. Enter a word</p>
                    <p> - Only alphabetic characters are allowed</p>
                    <p> - No profanities</p>
                    <p>3. Press submit</p>
                    <p>4. Watch the story unfold</p>
                    <h2>Scroll down to begin!</h2>
                </div>
                <div id="imageContainer">
                    <img className="image" src={logo} alt={"blockchain"}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="instructionsMobile">
                <div id="textMobile">
                    <h1>Welcome.</h1>
                    <p>1. Enter a word</p>
                    <p> - Only alphabetic characters are allowed</p>
                    <p> - No profanities</p>
                    <p>2. Press submit</p>
                    <p>3. Watch the story unfold</p>
                    <h2>Scroll down to begin!</h2>
                </div>
            </div>
        )
    }
}

export default Instructions