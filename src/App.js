
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
      <CalculatorButton id="clear" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="AC"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="+/-"/>
      <CalculatorButton handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="%"/>
      <CalculatorButton id="divide" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="/"/>
    </div>
    <div>
      <CalculatorButton id="seven" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="7"/>
      <CalculatorButton id="eight" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="8"/>
      <CalculatorButton id="nine" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="9"/>
      <CalculatorButton id="multiply" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="*"/>
    </div>
    <div>
      <CalculatorButton id="four" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="4"/>
      <CalculatorButton id="five" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="5"/>
      <CalculatorButton id="six" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="6"/>
      <CalculatorButton id="subtract" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="-"/>      
    </div>
    <div>
      <CalculatorButton id="one" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="1"/>
      <CalculatorButton id="two" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="2"/>
      <CalculatorButton id="three" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="3"/>
      <CalculatorButton id="add" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="+"/>            
    </div>
    <div>
      <CalculatorButton id="zero" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="0"/>
      <CalculatorButton id="decimal" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="."/>
      <CalculatorButton id="equals" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="="/>
    </div>

  </div>
}

const CalculatorDisplay = (props) => {
  return <div className="calculatorDisplay" id="display">
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
    
    if (button_pressed === 'AC') {
      this.setState(prevState => {
        return {
          button_presses: [],
          display:"0"
        }
      })
    } else if (["+", "-", "/", "*"].includes(event.target.value)) {
      this.setState(prevState => {
        // Prevent "* +" etc
        if (["+", "-", "/", "*"].includes(prevState.button_presses[prevState.button_presses.length-1])) {
            prevState.button_presses.pop()
        }
        return {
          button_presses: [...prevState.button_presses, event.target.value],
          display: prevState.display
        }
      })
    } else if ("=" === event.target.value) {
      this.setState(prevState => {
        if (prevState.button_presses.length > 0) {
          const sum = math.evaluate(prevState.button_presses.join('')) + ""
          console.log('Got sum ' + sum)
          return {
            button_presses: [sum * 1, "+"],
            display: sum
          }
        }
      })
    } else if (event.target.value === ".") {
      console.log("Pressed decimal")
      this.setState(prevState => {
        console.log(prevState.button_presses.includes("."))
        if (false === prevState.button_presses.includes(".")) {
          return {
            button_presses: [...prevState.button_presses, "."],
            display: prevState.display + "."
          }
        }
      })
    } else if (event.target.value * 1 > -1 && event.target.value * 1 < 10) {
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
