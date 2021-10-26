
import Display from './Display.jsx'
import InputBox from './InputBox';
import React from 'react';


class TrainController extends React.Component{

    constructor(props){
        super(props);
        this.state = {update: false}
    }
    render(){
        return(
            <div>
                <InputBox  update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}}/>
                <Display update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}}/>
            </div>
        )
    }
}

export default TrainController