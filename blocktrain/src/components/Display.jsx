/* Filename: Display.jsx; Last Updated: 10/17/2021
 * Display.jsx displays the words from the last 7 blocks of the blockchain into train cars
 */

import React, { useState } from 'react'
import './Display.css';
import trainArt from '../images/TrainCar.png'
import axios from 'axios';

// SAMPLE DATA. CHANGE WHEN REAL DATA AVAILABLE
const sampleData = ["he", "can", "go", "and", "she", "can", "too"]

// div(data-objData=data);

const api = axios.create({
    baseURL: `http://localhost:9000/onewordstoryjson`
})

// NOTE: NEED TO ENSURE THAT CHARACTERS ARE ONLY 10 CHARS LONG AND TRAIN CAR CAN ACCOMMODATE THAT

// SAMPLE DATA. CHANGE WHEN REAL DATA AVAILABLE

class Display extends React.Component{
    // constructor(props) {
    //     super(props);
    //     api.get('/').then(res => {
    //         console.log(res.data);
    //         console.log('Hello World');
    //         this.state = {sampleData: ["", "", "", "", "", "", ""]};
    //     })
    // }

    constructor(props){
        super(props);
        //console.log(this.props);
        this.state = {sampleData: ["", "", "", "", "", "", ""]};
        api.get('/').then(res => {
            console.log(res.data);
            console.log('Hello World');
        })
    };
    pullData(){
        // //console.log("pulling");
        // const url = "http://localhost:3000/trainwords";
        // axios.get(url)
        //     .then(
        //         (res) => {
        //             let rawData = JSON.parse(JSON.stringify(res.data));
        //             let newData = [];
        //             for (let i = 0; i < 7; i++){
        //                 newData.push(rawData[rawData.length - 1 - i].word);
        //             }

        //             // this.sampleData = newData;
        //             // this.forceUpdate();
        //             this.setState({sampleData: newData});
                    
        //         }

        //     )
        console.log("Help");
    }
    componentDidMount(){
        this.checkInterval = setInterval(() => {
            //SET BACKEND URL HERE
            this.pullData();
        }, 3000);
    }
    componentWillUnmount(){
        clearInterval(this.checkInterval);
    }
    render() {
        //console.log(this.props.update);
        //console.log("rendering");
        if (this.props.update){
            //console.log("updating");
            this.pullData();
            this.props.setUpdate(false);
        }
        return (
            <div className={"displayComponent"}>
                <div className="train">
                    <table id = "trainCars">
                        <tr>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[6]}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[5]}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[4]}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[3]}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[2]}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[1]}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                    <p>{this.state.sampleData[0]}</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
// NOTE: NEED TO ENSURE THAT CHARACTERS ARE ONLY 10 CHARS LONG AND TRAIN CAR CAN ACCOMMODATE THAT

export default Display