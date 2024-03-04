import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


class CalculatorEngine extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cache:[],
      display:"READY" 
    }
  }

  handleCalculatorButtonClick(event) {
    
    const button_pressed = event.target.value
    
    if (button_pressed === 'C') {
      this.setState(prevState => {
        return {
          cache: [],
          display:""
        }
      })

    } else if (["+", "-", "/", "*"].includes(event.target.value)) {
      this.setState(prevState => {
        return {
          cache: [...prevState.cache, event.target.value]
        }
      })
    } else {
      this.setState(prevState => {
        return {
          cache: [...prevState.cache, event.target.value],
          display: event.target.value
        }
      })
    }

  }
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App calculatorEngine={CalculatorEngine}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
