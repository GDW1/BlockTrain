/* Filename: Display.jsx; Last Updated: 11/5/2021
 * Display.jsx displays the words from the last 7 blocks of the blockchain into train cars
 */

import React from 'react'
import './Display.css';
import trainArt from '../images/TrainCar.png'
import axios from 'axios';
import LoadSpinner from "./LoadSpinner";

class Display extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props);
        this.state = {sampleData: ["", "", "", "", "", "", ""],
                      windowWidth: window.innerWidth,
                      windowHeight: window.innerHeight,
                      isLoaded: true,
                      counter: 0};
    };



    const
    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
        this.setState({windowHeight: window.innerHeight});
    };

    handleIsLoadedToggle = () => {
        this.setState(prevState => ({
            isLoaded: !prevState.isLoaded
        }))
    };

    pullData(){
        console.log("pulling");
        const url = "http://localhost:3000/trainwords";
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
        if (this.state.counter == 0) {
            this.handleIsLoadedToggle()
            this.setState({counter: 1})
        }
        
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
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[6]}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[5]}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[4]}</p>

                                    </div>
                                </td>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[3]}</p>
                                        { this.state.isLoaded && <LoadSpinner/> }
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[2]}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[1]}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
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
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[6]}</p>
                                        { this.state.isLoaded && <LoadSpinner/> }
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[5]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[4]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[3]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[2]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
                                        <p>{this.state.sampleData[1]}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        { !this.state.isLoaded && <img className = "trainCarImage" src = {trainArt} alt = "train car" /> }
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