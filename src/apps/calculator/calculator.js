import React from 'react';
import './calculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faRotateLeft } from '@fortawesome/free-solid-svg-icons'


export default class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numDisplay: 0,
      operatorDisplay: '',
      inputs: [],

      history: [],
      total: 0,
      fastMode: false,
    };
  }


  numKeys = [7,8,9,4,5,6,1,2,3,"c",0,,"ce"];
  operationKeys = ["+","-","*","/","="];

  handleNumClick(num) {
    if(num === "c") {
      this.setState({
        numDisplay: 0,
        inputs: [],
        nextNumber: null,
        operatorDisplay: '',
      }, () => this.setTotal() );
    } else if(num === "ce") {
      this.setState({
        numDisplay: 0,
      }, () => this.setTotal() );

    } else {
      if(this.state.numDisplay === 0) {
        this.setState({numDisplay: num}, () => this.setTotal() );
      }
      else {
        this.setState({numDisplay: `${this.state.numDisplay}${num}`}, () => this.setTotal() );
      }
    } 
  }

  handleOperationsClick(op) {
    if(op === "=") {
      this.getResult(op);
    }
    else {
      this.setState({inputs: [...this.state.inputs, +this.state.numDisplay, op], numDisplay: 0}, () => {
        if(this.state.inputs.length > 2 && this.state.fastMode) {
          this.getResult(op);
        }
      });
    }
    this.setState({operatorDisplay: op});
  }

  handleListItemClick(item) {
    let result = item.split(' = ');
    this.setState({ numDisplay: +result[1] });
  }

  handelBackClick() {
    this.setState({ inputs: this.state.inputs.slice(0, this.state.inputs.length-2), numDisplay: 0 });
  }

  setTotal() {
    this.setState({
      total: eval([...this.state.inputs, +this.state.numDisplay].join('')),
    });
  }

  getResult(op) {
    this.setState({
      inputs: [...this.state.inputs, +this.state.numDisplay],

    }, () => {
      let newInputs = this.state.inputs.join('');
      if(this.state.fastMode && op != "=") newInputs = this.state.inputs.splice(0, this.state.inputs.length-2).join('');
      this.setState({
        history: [...this.state.history, `${newInputs} = ${eval(newInputs)}`],
      }, () => {
        if(this.state.fastMode) {
          this.setState({
            inputs: [eval(newInputs), op],
            numDisplay: 0,
          });
        }    
        if(op === "=") this.setState({inputs: [], numDisplay: 0, total: 0});
      })
    });
  }

  render() {
    return (
      <div className="calculator-app">

        <div className="calculator">

          <div className="input-display">
            <p className="input-display-text">{this.state.inputs}</p>
            <div className="backButton">  <button onClick={() => this.handelBackClick()} > <FontAwesomeIcon icon={faBackward} /> </button></div>
          </div>

          <div className="display">
            <p>{this.state.numDisplay} <span className="result-display"> = {this.state.total} </span></p>
            <p className="display-operators">{this.state.operatorDisplay}</p>
          </div>

          <div className="keyboard">
            <div className="numKeys">
              {this.numKeys.map((num) => { return <button onClick={() => this.handleNumClick(num)} className="key numKey" key={num}>{num}</button> })}
            </div>          
            <div className="operationKeys">
              {this.operationKeys.map((op) => { return <button onClick={() => this.handleOperationsClick(op)} className="key operationKey" key={op}>{op}</button> })}
            </div>
          </div>

        </div>

        <div className="input-history">
          <button className="clear-history" onClick={() => this.setState({history: []})}><FontAwesomeIcon icon={faRotateLeft} /></button>
          <ul className="history-list">
            {this.state.history.map((item, index) => { return <li onClick={() => this.handleListItemClick(item)} key={index}>{item}</li> })}
          </ul>
        </div>
        
          <div>
            <label>return after every operation</label>
            <input type='checkbox' value={this.state.fastMode} onChange={() => this.setState({fastMode: !this.state.fastMode})} /> 
          </div> 
      </div>
    )
  }

}