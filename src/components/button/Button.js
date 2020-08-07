import './Button.css';
import React from 'react';

function Button(props) {
    return (
        <div 
            onClick={props.onClick}
            className={"Button " + props.coloring + (props.big ? ' big' : '')}>
            {props.children}
        </div>
    );//end return JSX
}//end Button

export default Button;