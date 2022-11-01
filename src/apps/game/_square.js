import React from 'react';
import './game.css';


export default function Square(props) { // functional component (no state), only render
  return ( // return a description of what you want to see on the screen
    <button className={`square ${props.extraClass}`} onClick={ () => props.buttonPress() } >
      {props.value} 
    </button> //  {props.value}  is a prop that is passed in from the Board component
  );
}