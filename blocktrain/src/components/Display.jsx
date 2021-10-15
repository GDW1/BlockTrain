import React, { useState } from 'react'
import './Display.css';

function Display() {

    return (
        <div className="helloDiv">
            <h1> hi </h1>
            <p> hello</p>
            <div id="subHelloDiv">
                <h1> hi </h1>
                <p> hello</p>
            </div>
        </div>

    )
}

export default Display