import React, { useState, useEffect } from 'react'
import Confetti from "react-confetti"
import Header from './Header'
import Dice from './Dice'
import Button from './Button'
import './../styles/index.css'

export default function App() {
  const [dice, setDice] = useState(() => getDice())
  const [tenzies, setTenzies] = useState(false)

  function getDice() {
    const newArr = []
    for (let i=0; i<10; i++) {
      newArr.push({
        value: getRandomDiceNumber(),
        isHeld: false,
        id: i+1 // You can also use a uuid package such as nanoid
      })
    }
    return newArr
  }

  function getRandomDiceNumber() {
    return Math.ceil(Math.random() * 6)
  }

  useEffect(() => {
    const checkDiceArray = dice.filter(dice => !dice.isHeld)
    setTenzies(prevTenzies => (checkDiceArray.length < 1) ? !prevTenzies : prevTenzies)
  },[dice])

  function holdDice (event, diceID) {
    event.stopPropagation()
    setDice(prevDice => prevDice.map(dice => {
      return (dice.id === diceID) ? {...dice, isHeld: true} : dice
    }))
  }

  function rollUnheldDice(event) {
    if (event.target.innerText == 'Roll') {
      setDice(prevDice => prevDice.map(dice => {
        return (dice.isHeld) ? dice : {...dice, value: getRandomDiceNumber()}
      }))
    }

    if (event.target.innerText == 'Reset Game') {
      setTenzies(prevTenzies => !prevTenzies)
      setDice(getDice())
      
      /**Rather than use what is below, just call the function that gets a new dice array instead. */
      // setDice(prevDice => prevDice.map(dice => {
      //   return {...dice, value: getRandomDiceNumber(), isHeld: false}
      // }))
    }
  }

  return (
    <>
      {tenzies && 
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />
      }
      <Header />
      <Dice 
        dice={dice}
        holdDice={holdDice}
        tenzies={tenzies}
        />
      <Button 
        rollUnheldDice={rollUnheldDice}
        tenzies={tenzies}
      />
    </>
  )
}