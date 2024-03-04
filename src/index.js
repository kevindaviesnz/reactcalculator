import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


class Calculations extends React.Component {
  
  constructor(props) {
    super(props)
    {/* Need more descriptive name than "history" */}
    this.state = {
      history:[] 
    }
  }

  handleCalculatorButtonClick(event) {
    const button_pressed = event.target.value
    if (button_pressed === 'C') {
      this.setState({
        history: []
      })
    }

    if (["+", "-", "/", "*"].includes(event.target.value)) {
      this.state.history.push(event.target.value)
    }
  }
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
