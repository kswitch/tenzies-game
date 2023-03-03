import React from 'react'

export default function Dice(props) {
    const diceElement = props.dice.map(dice => {
        return (
            <div 
            className={`dice ${dice.isHeld ? "held" : ""}`}
            onClick={(event) => !props.tenzies && props.holdDice(event, dice.id)}
            >
                {dice.value}
            </div>
        )
    })

    return (
        <div className="dice-container">
            {diceElement}
        </div>
    ) 
}