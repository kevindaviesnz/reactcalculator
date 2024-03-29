
// import './App.css';
import './Calculator.css';
import React from 'react';

// npm install mathjs
import * as math from 'mathjs'

// @see https://react-bootstrap.netlify.app/docs/getting-started/introduction
// npm install react-bootstrap bootstrap
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function CalculatorButton(props) {
  return (
    <Button id={props.button_id} size="lg" variant="secondary" className="calculatorButton" key={"b"+props.button_number} onClick={props.handleCalculatorButtonClick} value={props.button_number}>
      {props.button_render}
    </Button>
  );
}


const CalcPanel = (props) => {

  return <div className="calcPanel" >
      <ButtonToolbar >
      <ButtonGroup className="me-2" style={{ width: "100%" }}>
          <CalculatorButton id="clear" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="AC" button_render="AC"/>
          <CalculatorButton button_number="+/-" button_render="+/-"/>
          <CalculatorButton button_number="%" button_render="%"/>
          <CalculatorButton id="divide" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="/" button_render="÷"/>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup className="me-2" style={{ width: "100%" }}>
          <CalculatorButton id="seven" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="7" button_render="7"/>
          <CalculatorButton id="eight" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="8" button_render="8"/>
          <CalculatorButton id="nine" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="9" button_render="9"/>
          <CalculatorButton id="multiply" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="*" button_render="×"/>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup className="me-2" style={{ width: "100%" }}>
          <CalculatorButton id="four" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="4" button_render="4"/>
          <CalculatorButton id="five" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="5" button_render="5"/>
          <CalculatorButton id="six" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="6" button_render="6"/>
          <CalculatorButton id="subtract" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="-" button_render="-"/>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup className="me-2" style={{ width: "100%" }}>
          <CalculatorButton id="one" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="1" button_render="1"/>
          <CalculatorButton id="two" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="2" button_render="2"/>
          <CalculatorButton id="three" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="3" button_render="3"/>
          <CalculatorButton id="add" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="+" button_render="+"/>
        </ButtonGroup>
      </ButtonToolbar>

      <ButtonToolbar>
        <ButtonGroup className="me-2" style={{ width: "100%" }}>
          <CalculatorButton button_id="zero" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="0" button_render="0"/>
          <CalculatorButton id="decimal" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="." button_render="."/>
          <CalculatorButton id="equals" handleCalculatorButtonClick={props.handleCalculatorButtonClick} button_number="=" button_render="="/>
        </ButtonGroup>
      </ButtonToolbar>


  </div>
}

const CalculatorDisplay = (props) => {
  return <div className="calculatorDisplay" id="display">
      <Alert key="info" variant="info">{props.show}</Alert>
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
        const last_button_pressed = prevState.button_presses[prevState.button_presses.length-1]
        console.log("operand pressed")
        console.log(last_button_pressed)
        console.log(prevState.button_presses)
        if (["+", "-", "/", "*"].includes(last_button_pressed)) {
          prevState.button_presses.pop()
        }
        if ("=" === last_button_pressed){
          console.log("reseting button pressed as last button pressed was an equals sign")
          prevState.button_presses = [prevState.button_presses[0]]
        }
        console.log(prevState.button_presses)
        return {
          button_presses: [...prevState.button_presses, event.target.value],
          display: prevState.display
        }
      })
    } else if ("=" === event.target.value) {
      this.setState(prevState => {
        console.log("Pressed equals")
        const last_button_pressed = prevState.button_presses[prevState.button_presses.length - 1]
        console.log(last_button_pressed)
        console.log(prevState.button_presses)
        // if no operands then do nothing
        if (/^-?\d+(\.\d+)?(e[-+]?\d+)?$/i.test(prevState.button_presses.join(''))) {
          console.log(prevState.button_presses.join(''))
          console.log("We haven't pressed any operands so don't do anything")
          return
        }
        if (prevState.button_presses.length > 1) {
          if (["+", "-", "/", "*"].includes(last_button_pressed)) {
            prevState.button_presses.pop()
          }
          if ("=" === prevState.button_presses[prevState.button_presses.length - 1]) {
            prevState.button_presses.pop()
          }
          const last_number = prevState.button_presses[prevState.button_presses.length - 1]
          const sum = math.evaluate(prevState.button_presses.join('')) + ""
          const operand = prevState.button_presses[prevState.button_presses.length - 2]
          return {
            button_presses: [sum * 1, operand, last_number, "="],
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
    return <Card id="calculator" style={{width:"100%"}}>
            <ListGroup id="listGroup" style={{backgroundColor: "purple", width: "100%", margin: "0px"}}>
              <ListGroup.Item style={{width: "100%"}}><CalculatorDisplay show={this.state.display} /></ListGroup.Item>
              <ListGroup.Item style={{width: "100%"}}><CalcPanel handleCalculatorButtonClick={this.handleCalculatorButtonClick} /></ListGroup.Item>
            </ListGroup>
          </Card>

  }


}



function App(props) {
  return (
    <div>
      <h1>Calculator Demo</h1>
      <div style={{ width: "400px", margin: "50px"}}><Calculator /></div>
      <div style={{width: "500px", margin: "50px"}}><Calculator /></div>
    </div>
  );
}

export default App;
