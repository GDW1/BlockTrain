/* Filename: Display.jsx; Last Updated: 10/17/2021
 * Display.jsx displays the words from the last 7 blocks of the blockchain into train cars
 */

import React, { useState } from 'react'
import './Display.css';
import trainArt from '../images/TrainCar.png'

// SAMPLE DATA. CHANGE WHEN REAL DATA AVAILABLE
const sampleData = ["he", "can", "go", "and", "she", "can", "to"]

// NOTE: NEED TO ENSURE THAT CHARACTERS ARE ONLY 10 CHARS LONG AND TRAIN CAR CAN ACCOMMODATE THAT
function Display() {

    return (
        <div className={"displayComponent"}>
            <div className="train">
                <table id = "trainCars">
                    <tr>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[0]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[1]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[2]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[3]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[4]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[5]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                <p>{sampleData[6]}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Display