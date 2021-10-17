import React, { useState } from 'react'
import './Display.css';

const sampleData = ["he", "can", "go", "and", "she", "can", "to"]

function Display() {

    return (
        <div className={"displayComponent"}>
            <div className="train">
                <h1> Train </h1>
                <table id = "trainCars">
                    <tr>
                        <td>
                            <div>
                                <p>{sampleData[0]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>{sampleData[1]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>{sampleData[2]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>{sampleData[3]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>{sampleData[4]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>{sampleData[5]}</p>
                            </div>
                        </td>
                        <td>
                            <div>
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