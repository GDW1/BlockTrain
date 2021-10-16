import React, { useState } from 'react'
import './Display.css';

const sampleData = ["he", "can", "go", "and", "she", "can", "to"]

function Display() {

    return (
        <div className={"displayComponent"}>
            <h1>hi</h1>
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
                                <p>can</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>go</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>and</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>so</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>can</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <p>she</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Display