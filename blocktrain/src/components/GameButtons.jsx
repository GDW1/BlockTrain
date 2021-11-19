import './GameButtons.css'
import react, { useEffect, useState } from 'react';
import axios from 'axios'
import validator from 'validator';
var originURL = "https:/blocktrain-backend.herokuapp.com";




//get update prop later so that the train refreshes when creating/joining a private game
function validate(rules, stringField){
    //rules are conditions to be checked and accompanying messages
    //rules should have func and message properties
    let isValid = true;
    let message = [];
    rules.forEach(
        rule => {
            if (rule.func(stringField)){
                isValid = false;
                message.push(rule.message);
            }
        }
    );
    return {isValid: isValid, message: message};
}
function GameButtons(props){
    const [inputID, setInputID] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const handleCreateGame = (() => {
        axios.get("https://blocktrain-backend.herokuapp.com/trainwords/gameid")
            .then((res) => {
                //console.log(JSON.parse(JSON.stringify(res.data)));
                //alert("received " + JSON.parse(JSON.stringify(res.data))[0]['gameID']);
                props.setGameID(JSON.parse(JSON.stringify(res.data))[0]['gameID']);
                props.setUpdate(true);
                alert("successfully created game with ID " + JSON.parse(JSON.stringify(res.data))[0]['gameID'])
            })
    })
    const handleJoinGame = ((event) => {
        event.preventDefault();
        props.setUpdate(true);
        const possibleID = inputID.toString();
        console.log(possibleID);
        console.log(validator.isEmpty(possibleID));
        const validationGameID = validate([
            {func: validator.isEmpty, message: "game ID cannot be empty"},
            {func: (inp) => !validator.isNumeric(inp), message: "game ID must only contain numbers"},
            {func: (inp) => {return(inp.toString().length != 6 && inp != 0);}, message: "gameID must be 6 digits"}

        ], possibleID)
        
        if (validationGameID.isValid){
            props.setUpdate(true);
            axios.post("https://blocktrain-backend.herokuapp.com/trainwords/gameid", {"gameID": possibleID})
            .then((res) => {
                if (res.status == 200){
                    alert("successfully joined game " + possibleID);
                    props.setGameID(possibleID);
                }
                else{
                    alert("game with id " + possibleID + " not found");
                }
            }
            )
            
        }
        else{
            let bigMessage = "";
            validationGameID.message.forEach(
                part => bigMessage += `-${part}\n`
            );
            alert("Invalid Game ID\n" + bigMessage);
        }

        setInputID("");
    })
    const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize, [])
    let pageFormat;
    if (windowHeight / windowWidth < 1) {
        pageFormat = "buttonBox"   
    }
    else
    {   
        pageFormat = "buttonBoxMobile"
    }
    let gameIDMessage = props.gameID;
    if (props.gameID == 0){
        gameIDMessage += " (Default)"
        if (props.gameID !== 0){
            props.setGameID(0)
        }
    }
    return (
        <div name = "buttonBox" id = {pageFormat} class = "whiteText">
            <p>Current Game ID: {gameIDMessage}</p>
            <button onClick = {handleCreateGame}>Create Game</button>
            <p>or</p>
            <form onSubmit = {handleJoinGame}>
                <input id = "inputIDBox" name = "inputIDBox" type = "number" min = "0" value = {inputID} placeholder = "123456" onChange = {(e) => {if(e.target.value.length <= 6){setInputID(e.target.value)}}}></input>
                <input type = "submit" value = "Join Game"></input>
            </form>
        </div>
    )
    
}

export default GameButtons;