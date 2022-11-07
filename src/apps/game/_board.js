import React from 'react';
import './game.css';

import Square from "./_square";

export default class Board extends React.Component {
  numbers = Array.from(Array(9).keys())

  renderSquare(i) {
    return (
      <Square 
        value={ this.props.squares[i]} 
        extraClass={ this.props.classes[i]} 
        buttonPress={ () => this.props.setValue(i) }
        key={i}
      />
    );
  }

  render() {  // render method is required, it is the only method required in a class component
    return (

        <div className="board">
          {this.numbers.map( (i) => this.renderSquare(i) )}
        </div>

    );
  }
}