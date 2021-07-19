import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const tempsHash = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const celsiusToFahrenheit = (temp) => {
  if (isNaN(temp)) return '';
  const cTemp = (temp * 9 / 5) + 32;
  return cTemp;
}

const fahrenheitToCelsius = (temp) => {
  if (isNaN(temp)) return '';
  const fTemp = (temp - 32) * 5 / 9;
  return fTemp;
}

const boilTemp = (temp, scale) => {
  return scale === 'c' ? temp >= 100 : temp >= 212
}

function TempCalculator(props) {
  
  return (
    <fieldset>
      <legend>Enter Temperature in {props.scale}:</legend>
      <input 
        type="text" 
        value={props.value}
        name={props.name}
        onChange={props.handleTempInput}
      />
    </fieldset>
  );
}


class TempConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: 'c',
      value: ''
    };
  }

  handleTempInput = (e) => {
    const scale = e.target.name;
    e.preventDefault();
    this.setState({
      scale,
      value: e.target.value
    });
    
  }

  render() {
    const boil = boilTemp(this.state.value, this.state.scale);
    const celTemp = this.state.scale === 'c' ? this.state.value : fahrenheitToCelsius(parseFloat(this.state.value));
    const fahrTemp = this.state.scale === 'f' ? this.state.value : celsiusToFahrenheit(parseFloat(this.state.value));

    return (
      <div>
        
        <TempCalculator 
          handleTempInput={this.handleTempInput}
          scale={tempsHash['c']}  
          value={celTemp}
          name='c'
        />
        <TempCalculator 
          handleTempInput={this.handleTempInput}
          scale={tempsHash['f']}  
          value={fahrTemp}
          name='f'
        />
        the water would {!boil && 'not'} boil
      </div>
    );
  }
}

ReactDOM.render(
  <TempConverter />,
  document.getElementById('root')
);