
import Display from './Display.jsx'
import InputBox from './InputBox';
import React from 'react';


class TrainController extends React.Component{

    constructor(props){
        super(props);
        this.state = {update: false}
        this.state = {id: 0}
    }
    render(){
        return(
            <div>
                <InputBox update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}} gameID = {this.state.id}/>
                <Display update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}} gameID = {this.state.id}/>
            </div>
        )
    }
}

export default TrainController