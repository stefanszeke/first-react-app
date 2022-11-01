import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Game from './apps/game/game.js';
import Calculator from "./apps/calculator/calculator";



class App extends React.Component {

  render() {  // render method is required, it is the only method required in a class component
    return (
      <div className="main-wrapper">
        <h2>Tic-Tac-Toe Game</h2>
        <Game />
        <h2>Calculator</h2>
        <Calculator />
      </div>
    );
  }
}



// ========================================




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
