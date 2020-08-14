import './Calculator.css';
import Button from '../button/Button';
import React, {Component} from 'react';

let _ops = {
    '*': function(a, b) {return Number(a) * Number(b);},
    '/': function(a, b) {return Number(a) / Number(b);},
    '+': function(a, b) {return Number(a) + Number(b);},
    '-': function(a, b) {return Number(a) - Number(b);}
}//end _ops

class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            upper: '',
            lower: '0',
        };//end state

        this.open = this.input.bind(this, '(');
        this.close = this.input.bind(this, ')');
        this.power = this.input.bind(this, '^');
        this.add = this.input.bind(this, '+');
        this.sub = this.input.bind(this, '-');
        this.mul = this.input.bind(this, '*');
        this.div = this.input.bind(this, '/');

        this.zero = this.input.bind(this, '0');
        this.one = this.input.bind(this, '1');
        this.two = this.input.bind(this, '2');
        this.three = this.input.bind(this, '3');
        this.four = this.input.bind(this, '4');
        this.five = this.input.bind(this, '5');
        this.six = this.input.bind(this, '6');
        this.seven = this.input.bind(this, '7');
        this.eight = this.input.bind(this, '8');
        this.nine = this.input.bind(this, '9');
    }//end constructor

    input(char) {
        this.setState(state => {
            let lower = state.lower;
            
            if(lower === '0' || lower === '-0') {
                if(!char.match(/\+|\-|\*|\//)) {
                    lower = lower.replace('0', '');
                }//end if
            }//end if
            
            return {
                lower: lower + char,
            }//end return changes
        });//end setState
    }//end number

    eval(exp) {
        let nums, subExp;
        
        while(subExp = exp.match(/\(.*\)/)) {
            exp = exp.replace(subExp[0], this.eval(subExp[0].slice(1, -1)));
        }//end while

        while(subExp = exp.match(/-?[\d|\.]+\^-?[\d|\.]+/)) {
            nums = subExp[0].split('^');
            exp = exp.replace(subExp[0], Math.pow(nums[0], nums[1]).toString());
        }//end while

        while(subExp = exp.match(/-?[\d|\.]+(\*|\/)-?[\d|\.]+/)) {
            nums = subExp[0].split(subExp[1]);
            exp = exp.replace(subExp[0], _ops[subExp[1]](nums[0], nums[1]).toString());
        }//end while
        
        while(subExp = exp.match(/-?[\d|\.]+(\+|\-)-?[\d|\.]+/)) {
            nums = subExp[0].split(subExp[1]);
            exp = exp.replace(subExp[0], _ops[subExp[1]](nums[0], nums[1]).toString());
        }//end while

        return exp;
    }//end eval

    equ = event => {
        this.setState(state => {
            let upper = state.lower + '=';
            let lower = this.eval(state.lower);

            if(Number.isNaN(Number(lower))) {
                lower = state.lower;
                upper = 'ERROR: INVALID EXPRESSION';
            }//end if

            return {
                lower: lower,
                upper: upper
            };//end return changes
        });//end setState
    }//end equ

    decimal = event => {
        this.setState(state => {
            let lower = state.lower;
            
            return {
                lower: lower + (lower.includes('.') ? '' : '.'),
                upper: lower.includes('.') ? 'WARNING: DECIMAL POINT ALREADY PRESENT!' : state.upper
            }//end return changes
        });//end setState
    }//end decimal

    negate = event => {
        this.setState(state => {
            let lower = state.lower;
            
            return {
                lower: lower[0] === '-' ? lower.slice(2, -1) : `-(${lower})`
            }//end return changes
        });//end setState
    }//end negate

    delete = event => {
        this.setState(state => {
            let lower = state.lower;
            
            lower = lower.slice(0, -1);
            if(lower === '-' || lower === '') {
                lower = '0';
            }//end if

            return { lower: lower };
        });//end setState
    }//end delete

    clear = event => {
        this.setState({
            upper: '',
            lower: '0'
        });//end setState
    }//end clear

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
                    <Button coloring="dark" onClick={this.delete}>⌫</Button>
                    <Button coloring="dark" onClick={this.clear} big={true}>C</Button>
                    <Button coloring="dark" onClick={this.equ} big={true}>=</Button>
                </div>
            </div>
        );//end return JSX
    }//end render

}//end class Calculator

export default Calculator;