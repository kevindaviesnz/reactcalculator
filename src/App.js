
import './App.css';
import React from 'react';

// npm install mathjs
import * as math from 'mathjs'

const CalculatorButton = (props) => {
  return (
    <button key={"b"+props.button_number} onClick={props.handleCalculatorButtonClick} value={props.button_number}>
      {props.button_number}
    </button>
  );
};

const CalcPanel = (props) => {
  return <div>
    <div>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="1"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="2"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="3"/>
    </div>
    <div>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="4"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="5"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="6"/>
    </div>
    <div>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="7"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="8"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="9"/>
    </div>
    <div>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="+"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="-"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="/"/>
    </div>
    <div>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="C"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="="/>
    </div>

  </div>
}

const CalculatorDisplay = (props) => {
  return <div>
      {props.show}
  </div>
}


class Calculator extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      button_presses:[],
      display:"0" 
    }
    this.handleCalculatorButtonClick = this.handleCalculatorButtonClick.bind(this)
  }

  handleCalculatorButtonClick(event) {

    const button_pressed = event.target.value
    
    if (button_pressed === 'C') {
      this.setState(prevState => {
        return {
          button_presses: [],
          display:"0"
        }
      })
    } else if (["+", "-", "/", "*"].includes(event.target.value)) {
      this.setState(prevState => {
        return {
          button_presses: [...prevState.button_presses, event.target.value],
          display: prevState.display
        }
      })
    } else if ("=" === event.target.value) {
      this.setState(prevState => {
        const s = prevState.button_presses.join('')
        const sum = math.evaluate(prevState.button_presses.join('')) + ""
        return {
          button_presses: [],
          display: sum
        }
      })
    } else {
      this.setState(prevState => {
        const last_button_pressed = prevState.button_presses[prevState.button_presses.length-1]
        return {
          button_presses: [...prevState.button_presses, event.target.value],
          display: prevState.display === "0" || ["+", "-", "/", "*", undefined].includes(last_button_pressed)? event.target.value: prevState.display + event.target.value
        }
      })
    }

    console.log(this.state.button_presses)

  }

  render() {
    return <div>
      <CalculatorDisplay show={this.state.display} />
      <CalcPanel handleCalculatorButtonClick={this.handleCalculatorButtonClick} />
    </div>
  }


}



function App(props) {
  return (
    <div className="App">
        <Calculator />
    </div>
  );
}

export default App;
