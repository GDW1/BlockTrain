/* Filename: Display.jsx; Last Updated: 11/3/2021
 * Display.jsx displays the words from the last 7 blocks of the blockchain into train cars
 */

import React from 'react'
import './Display.css';
import trainArt from '../images/TrainCar.png'
import axios from 'axios';

class Display extends React.Component{

    constructor(props){
        super(props);
        //console.log(this.props);
        this.state = {sampleData: ["", "", "", "", "", "", ""], windowWidth: window.innerWidth, windowHeight: window.innerHeight};
    };

    const
    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
        this.setState({windowHeight: window.innerHeight});
    };

    pullData(){
        console.log("pulling");
        const url = "https://blocktrain-backend.herokuapp.com/trainwords";
        //NEEDS BACKEND FOR ACTUAL TESTING

        axios.get(url)
            .then(
                (res) => {
                    let rawData = JSON.parse(JSON.stringify(res.data));
                    let newData = [];
                    for (let i = 0; i < 7; i++){
                        newData.push(rawData[rawData.length - 1 - i].word);
                    }

                    // this.sampleData = newData;
                    // this.forceUpdate();
                    this.setState({sampleData: newData});

                }
            )

    }
    componentDidMount(){
        this.checkInterval = setInterval(() => {
            //SET BACKEND URL HERE
            this.pullData();
        }, 3000);
        window.addEventListener("resize", this.handleResize);
    }
    componentWillUnmount(){
        clearInterval(this.checkInterval);
        window.addEventListener("resize", this.handleResize);
    }
    render() {
        //console.log(this.props.update);
        //console.log("rendering");
        const { windowWidth } = this.state;
        const { windowHeight } = this.state;
        if (this.props.update){
            //console.log("updating");
            this.pullData();
            this.props.setUpdate(false);
        }
        if (windowHeight / windowWidth < 1.5) {
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
        else { //MOBILE
            return(
                <div className={"displayComponentMobile"}>
                    <div className="trainMobile">
                        <table id = "trainCarsMobile">
                            <tr>
                                <td>
                                    <div>
                                        <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                        <p>{this.state.sampleData[6]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                        <p>{this.state.sampleData[5]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                        <p>{this.state.sampleData[4]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                        <p>{this.state.sampleData[3]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                        <p>{this.state.sampleData[2]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <img className = "trainCarImage" src = {trainArt} alt = "train car" />
                                        <p>{this.state.sampleData[1]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
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
}

export default Display
