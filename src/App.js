
import './App.css';

const CalculatorButton = (props) => {
  return (
    <button>
      1
    </button>
  );
};

const CalcPanel = (props) => {
  return <div>
      <CalculatorButton />
  </div>
}

const CalculatorDisplay = (props) => {
  return <div>
      DISPLAY
  </div>
}

const Calculator = (props) => {
  return <div>
    <CalculatorDisplay />
    <CalcPanel />
  </div>
}


function App() {
  return (
    <div className="App">
        <Calculator />
    </div>
  );
}

export default App;
