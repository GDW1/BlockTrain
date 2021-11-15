import React from 'react';
import axios from 'axios';
import './DisplayFullStory.css';
import LoadSpinner from './LoadSpinner.js';

class FullStoryDisplay extends React.Component{

    constructor(props){
        super(props);
        //console.log(this.props);
        this.state = {sampleData: ["", "", "", "", "", "", ""], isLoaded: true, counter: 0};
    };

    handleIsLoadedToggle = () => {
        this.setState(prevState => ({
            isLoaded: !prevState.isLoaded
        }))
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
                    for (let i = 7; i < rawData[rawData.length - 1].wordNum; i++){
                        newData.push(rawData[i].word + " ");
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
                <p>{this.state.sampleData}</p>
                { this.state.isLoaded && <LoadSpinner />}
            </div>
        )
    }
}

export default FullStoryDisplay;
