import './Calculator.css';
import Button from '../button/Button';
import React, {Component} from 'react';

class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exp: '',
            upper: '',
            lower: '0',
            resetNextInput: false
        };//end state
    }//end constructor

    render() {
        return (
            <div className="Calculator">
                <h1 className="dark">REACT{'{ive}'} Calculator</h1>
                <h3 className="light">{this.state.upper}</h3>
                <h2 className="light">{this.state.lower}</h2>
                <div className="buttons">
                    <Button coloring="dark" onClick={this.open}>(</Button>
                    <Button coloring="light" onClick={this.seven}>7</Button>
                    <Button coloring="light" onClick={this.four}>4</Button>
                    <Button coloring="light" onClick={this.one}>1</Button>
                    <Button coloring="dark" onClick={this.negate}>±</Button>
                    <Button coloring="dark" onClick={this.close}>)</Button>
                    <Button coloring="light" onClick={this.eight}>8</Button>
                    <Button coloring="light" onClick={this.five}>5</Button>
                    <Button coloring="light" onClick={this.two}>2</Button>
                    <Button coloring="light" onClick={this.zero}>0</Button>
                    <Button coloring="dark" onClick={this.power}>^</Button>
                    <Button coloring="light" onClick={this.nine}>9</Button>
                    <Button coloring="light" onClick={this.six}>6</Button>
                    <Button coloring="light" onClick={this.three}>3</Button>
                    <Button coloring="dark" onClick={this.decimal}>.</Button>
                    <Button coloring="dark" onClick={this.sqrt}>√</Button>
                    <Button coloring="dark" onClick={this.add}>+</Button>
                    <Button coloring="dark" onClick={this.sub}>-</Button>
                    <Button coloring="dark" onClick={this.mul}>*</Button>
                    <Button coloring="dark" onClick={this.div}>/</Button>
                    <Button coloring="dark" onClick={this.mod}>%</Button>
                    <Button coloring="dark" onClick={this.clear} big={true}>C</Button>
                    <Button coloring="dark" onClick={this.equ} big={true}>=</Button>
                </div>
            </div>
        );//end return JSX
    }//end render

}//end class Calculator

export default Calculator;