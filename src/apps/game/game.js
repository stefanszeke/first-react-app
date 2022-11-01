import React from 'react';
import './game.css';

import Board from './_board.js';


export default  class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null), classes: Array(9).fill(null) },
      ],
      xIsNext: true,
      end: false,
      stepNumber: 0,
    };
  }


  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let status = this.setStatus();

    const move = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' next player: ' + (move % 2 === 0 ? 'X' : 'O') :
        'Go to game start';
      return (

          <li key={move}>
            <button  onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>

      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            classes={current.classes}
            setValue={ (i) => this.setValue(i) }
          />
        </div>
        <div className="game-info">
          <div className="game-status">{ status }</div>
          <ul className="history">{ move }</ul>
          </div>
      </div>
    );
  }
  jumpTo(step) {    
    this.setState({      
      stepNumber: step,      
      xIsNext: (step % 2) === 0,    
    });
    this.setStatus()
  }
  setValue(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    let squaresCopy = [...current.squares]
    let classesCopy = [...current.classes]

    const winner = calculateWinner(squaresCopy);

    if(squaresCopy[i] === null && !winner) {
      squaresCopy[i] = this.state.xIsNext? 'X' : 'O';
      classesCopy[i] = this.state.xIsNext? 'box-x' : 'box-o';

      this.setState({ 
        history: history.concat([
          { squares: squaresCopy, classes: classesCopy}
        ]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
       });

       const winner = calculateWinner(squaresCopy);
       if(winner) {
        for(let index of winner) {
          classesCopy[index] = classesCopy[index] + ' box-winner';
        }
      }
    }
  }
  setStatus() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + current.squares[winner[0]];
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return status;
  }
}

function calculateWinner(squares) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i]; // same as const a = winningCombinations[i][0], const b = winningCombinations[i][1], const c = winningCombinations[i][2]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return winningCombinations[i];
    }
  }
  return null;
}