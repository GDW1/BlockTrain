import React from 'react';
import axios from 'axios';
import './DisplayFullStory.css';

class FullStoryDisplay extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props);
        this.state = {sampleData: ["", "", "", "", "", "", ""]};
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
            </div>
        )
    }
}

export default FullStoryDisplay;
