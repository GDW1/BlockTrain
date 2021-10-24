import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './InputBox.css';
import validator from 'validator';
import axios from 'axios';

function validate(rules, stringField){
    //rules are conditions to be checked and accompanying messages
    //rules should have func and message properties
    let isValid = true;
    let message = [];
    rules.forEach(
        rule => {
            if (!rule.func(stringField)){
                isValid = false;
                message.push(rule.message);
            }
        }
    );
    return {isValid: isValid, message: message};
}

function InputBox(props){
    const [next_word, setWord] = useState("");
    const handleSubmit = (event) =>{
        event.preventDefault();
        const validation = validate(
            [
                {func: validator.isAlpha, message: "Input must contain only letters"},
                {func: (inp) => !validator.isEmpty(inp), message: "Input cannot be empty"}
            ],
            next_word.toString()
        );
        if (validation.isValid){
            alert('The word you entered was: ' + next_word.toString())
            axios.post("http://localhost:3000/posts", {
                word: next_word.toString()
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            
        }
        else{
            let bigMessage = "";
            validation.message.forEach(
                part => bigMessage += `-${part}\n`
            );
            alert("Input Invalid\n" + bigMessage);
        }
        document.getElementById("next_word").value = "";
    }
    //implement some client side validation
    return (
        <div className = {"InputField"}>
            <form onSubmit={handleSubmit}>
                <input 
                id="next_word"
                name="next_word" 
                className = "InputBox"
                placeholder="Enter your word" 
                type = "text" 
                minLength = "1" 
                maxLength = "20"
                value = {next_word}
                onChange = {(e) => setWord(e.target.value)}/>
                <input  type = "submit" id = "InputSubmitButton" /*style = {{position: 'relative', left: '100px'}}*/></input>
            </form>
        </div> 
    )

}

export default InputBox