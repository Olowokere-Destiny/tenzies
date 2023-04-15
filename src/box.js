import React from "react";

export default function Box(props) {
    return (
        <div className={`box ${props.class}`} onClick={props.holdDice}>
            <div className="box-num">{props.number}</div>
        </div>
    )
}