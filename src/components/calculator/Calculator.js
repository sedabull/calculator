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
            lock: false,
            reset: false
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
            if(state.lock) return {};
            
            let op = /[\^\*\/\+\-]$/;
            let upper = state.upper;
            let lower = state.lower;
            let reset = state.reset;
            
            if(reset) {
                if(char.match(/\d/)) {
                    upper = '';
                    lower = '0';
                }//end if
                reset = false;
            }//end if
            
            if(lower === '0') {
                if(!char.match(op) && !char.match(/\(/)) {
                    lower = lower.replace('0', '');
                }//end if
            }//end if

            if(lower.match(op) && (char.match(op) || char.match(/\)/))) {
                lower = lower.slice(0, -1);
            }//end if

            if(lower.match(/\.$/) && (char.match(op) || char.match(/\)/))) {
                lower += '0';
            }//end if

            if(lower.match(/[\d\)]$/) && char.match(/\(/)) {
                lower += '*';
            }//end if
            
            return {
                reset: reset,
                upper: upper,
                lower: lower + char
            }//end return changes
        });//end setState
    }//end number

    eval(exp) {
        let please = /\([^\(\)]*\)/;
        let excuse = /-?[\d\.]+\^-?[\d\.]+/;
        let myDear = /-?[\d\.]+(\*|\/)-?[\d\.]+/;
        let auntSally = /-?[\d\.]+(\+|\-)-?[\d\.]+/;

        while(exp.match(please)) {
            exp = exp.replace(please, match => (
                this.eval(match.slice(1, -1))
            ));//end please
        }//end while

        while(exp.match(excuse)) {
            exp = exp.replace(excuse, match => {
                let base = Number(match.split('^')[0]);
                let power = Number(match.split('^')[1]);
                return Math.pow(base, power).toString();
            });//end excuse
        }//end while

        while(exp.match(myDear)) {
            exp = exp.replace(myDear, (match, op) => {
                let left = match.split(op)[0];
                let right = match.split(op)[1];
                return _ops[op](left, right).toString();
            });//end myDear
        }//end while
        
        exp = exp.replace(/--/g, '+');
        while(exp.match(auntSally)) {
            exp = exp.replace(auntSally, (match, op) => {
                let left = match.split(op)[0];
                let right = match.split(op)[1];

                if(op === '-') {
                    left = match.slice(0, match.lastIndexOf('-'));
                    right = match.slice(match.lastIndexOf('-') + 1);
                }//end if

                return _ops[op](left, right).toString();
            });//end auntSally
        }//end while

        return exp;
    }//end eval

    equ = event => {
        this.setState(state => {
            if(state.lock) return {};

            let reset = true;
            let lock = state.lock;
            let upper = state.lower + '=';
            let lower = Number(this.eval(state.lower));

            if(Number.isNaN(lower)) {
                lock = true;
                reset = false;
                lower = state.lower;
                upper = 'ERROR: INVALID EXPRESSION!';
                setTimeout(() => {
                    this.setState({ upper: state.upper, lock: false });
                }, 2000);
            }//end if

            return {
                lock: lock,
                reset: reset,
                upper: upper,
                lower: lower.toString()
            };//end return changes
        });//end setState
    }//end equ

    decimal = event => {
        this.setState(state => {
            if(state.lock) return {};

            let lock = state.lock;
            let reset = state.reset;
            let lower = state.lower;
            let upper = state.upper;

            if(reset) {
                upper = '';
                lower = '0';
                reset = false;
            }//end if
            
            let current = lower.match(/-?[\d\.]+$/);
            let error = current && current[0].includes('.') ? 'WARNING: DECIMAL POINT ALREADY PRESENT!' : '';

            if(error) {
                lock = true;
                setTimeout(() => {
                    this.setState({ upper: upper, lock: false });
                }, 2000);//end setTimeout
            }//end if
            
            return {
                lock: lock,
                reset: reset,
                upper: error || upper,
                lower: lower + (error ? '' : '.')
            }//end return changes
        });//end setState
    }//end decimal

    negate = event => {
        this.setState(state => {
            if(state.lock) return {};

            let lower = state.lower;
            let unnegated = /-?[\d\.]+$/;
            let negated = /-\(-?[\d\.]+\)$/;

            if(lower.match(unnegated)) {
                lower = lower.replace(unnegated, match => `-(${match})`);
            } else if(lower.match(negated)) {
                lower = lower.replace(negated, match => match.slice(2, -1));
            }//end else if
            
            return { lower: lower };
        });//end setState
    }//end negate

    flip = event => {
        this.setState(state => {
            if(state.lock) return {};

            let lower = state.lower;
            let unflipped = /[\d\.]+$/;
            let flipped = /\(1\/-?[\d\.]+\)$/;

            if(lower.match(unflipped)) {
                lower = lower.replace(unflipped, match => `(1/${match})`);
            } else if(lower.match(flipped)) {
                lower = lower.replace(flipped, match => match.slice(3, -1));
            }//end else if
            
            return { lower: lower };
        });//end setState
    }//end flip

    delete = event => {
        this.setState(state => {
            if(state.lock) return {};

            let lower = state.lower.slice(0, -1);
            
            if(lower === '-' || lower === '') {
                lower = '0';
            }//end if

            return { lower: lower };
        });//end setState
    }//end delete

    clear = event => {
        this.setState(state => {
            if(state.lock) return {};
            
            return {
                upper: '',
                lower: '0',
                reset: false
            }//end return changes
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
                    <Button coloring="dark" onClick={this.flip}>1/x</Button>
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