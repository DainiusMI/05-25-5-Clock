import React from "react";


export default function StatusIndivator(props) {
    function handleClassName() {
        let className = "indicator"

        if (props.clockState.isRunning) {
            if (props.name === "running") {
                return `indicator active`
            }
            else if (props.name === "session" && props.clockState.sessionTime) {
                return `indicator active`
            }
            else if (props.name === "break" && props.clockState.breakTime) {
                return `indicator active`
            }
            else {
                return `indicator inactive`
            }
        }
        else {
            return `indicator inactive`
        }
    }

    return (
        <div className="status__row">
            <div id={props.name} className={handleClassName()} />
            <div className="indicator__description">{props.name}</div>
        </div>
    )
}