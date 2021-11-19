
import Display from './Display.jsx'
import InputBox from './InputBox';
import GameButtons from './GameButtons';
import React from 'react';


class TrainController extends React.Component{

    constructor(props){
        super(props);
        this.state = {update: false}
        this.state = {gameID: 0}
    }
    render(){
        return(
            <div>
                <GameButtons gameID = {this.state.gameID} setGameID = {(e) => this.setState({gameID: e})} update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}}/>
                
                <InputBox update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}} gameID = {this.state.gameID}/>
                <Display update = {this.state.update} setUpdate = {(e) => {this.setState({update: e})}} gameID = {this.state.gameID}/>
            </div>
        )
    }
}

export default TrainController