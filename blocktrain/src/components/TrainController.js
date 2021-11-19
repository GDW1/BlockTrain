
import Display from './Display.jsx'
import InputBox from './InputBox';
import GameButtons from './GameButtons';
import React from 'react';


class TrainController extends React.Component{

    constructor(props){
        super(props);
        this.state = {update: false}
    }
    render(){
        return(
            <div>
                <GameButtons gameID = {this.props.gameID} setGameID = {(e) => this.props.setGameID(e)} update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}}/>
                
                <InputBox update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}} gameID = {this.props.gameID}/>
                <Display update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}} gameID = {this.props.gameID}/>
            </div>
        )
    }
}

export default TrainController