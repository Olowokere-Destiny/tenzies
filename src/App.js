import React, { useEffect, useState } from "react";
import './App.css';
import Box from "./box"
import { v4 as uuidv4 } from 'uuid';
import Confetti from "react-confetti"

function App() {

  const [dice, setDice] = useState(newRoll());

  const [tenzies, setTenzies] = useState(false);

  
  function newDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: uuidv4()
    }
    
  }
  
  function newRoll() {
    const arr = [];
    for (let x = 0; x < 10; x++) {
      arr.push(newDie());
    }
    return arr;
  }
  
  function holdDice(id) {
    setDice(oldDie => oldDie.map(
      die => {
        if (die.id === id) {
          return {...die, isHeld: !die.isHeld}
        } else {
          return die
        }
      }
    ))
  }

  function rollDice() {
    setDice(oldDie => oldDie.map(
      die => {
       return die.isHeld ? die : newDie()
      }
    ))
  }

  useEffect(() => {
    const allHeld = dice.every(die => {
      return die.isHeld
    });
    const sameValue = dice.every(die => {
      return die.value === dice[0].value
    })

    allHeld && sameValue ? setTenzies(true) : setTenzies(false)
  }, [dice])

  const styling = {color: "#444"}

  const diceElements = dice.map(die => {
  return <Box 
            number={die.value}
            key={die.id}
            class={die.isHeld ? "held" : ""}
            holdDice={() => holdDice(die.id)}
          />
  })

  return (
    <div className="App">

      <div className="box-container">
        {diceElements}
      </div>

      <button onClick={rollDice}>{tenzies ? "You won!" : "Roll"}</button>
      {tenzies && <p style={styling}>Refresh browser to play again...</p>}
      {tenzies && <Confetti />}

    </div>
  );
}

export default App;
