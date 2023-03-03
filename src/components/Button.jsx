import React from 'react'

export default function Button(props) {
    return (
        <>
            <button
                className="roll-dice-btn"
                onClick={(event) => props.rollUnheldDice(event)}
            >
                {props.tenzies ? "Reset Game" : "Roll"}
            </button>
        </>
    ) 
}