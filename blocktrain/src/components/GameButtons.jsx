import './GameButtons.css'
import react, { useState } from 'react';
import axios from 'axios'
var originURL = "http://localhost:3000";
function GameButtons(props){
    const [inputID, setInputID] = useState("");
    const handleCreateGame = (() => {
        axios.get(originURL + "/gameid")
            .then((res) => {
                //console.log(JSON.parse(JSON.stringify(res.data)));
                //alert("received " + JSON.parse(JSON.stringify(res.data))[0]['gameID']);
                props.setGameID(JSON.parse(JSON.stringify(res.data))[0]['gameID']);
            })
    })
    const handleJoinGame = (() => {

    })
    return (
        <div>
            <button onClick = {handleCreateGame}>Create Game</button>
            <form onSubmit = {handleJoinGame}>
                <input id = "inputIDBox" name = "inputIDBox" type = "number" value = {inputID} onChange = {(e) => {if(e.target.value.length <= 6){setInputID(e.target.value)}}}></input>
                <input type = "submit" value = "Join Game"></input>
            </form>
        </div>
    )
}

export default GameButtons;