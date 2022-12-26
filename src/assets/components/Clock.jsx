import React from "react";

export default function Clock(props) {
    const {clockState, setClockState, setClockSettings, defaultSettings} = props

    function runClock() {

        setClockState(prevState => ({
                ...prevState,
                isRunning: !prevState.isRunning
            })
        )
    }

    return (
        <section className="clock">
            <p id="timer-label">Session/Break</p>
            <p id="time-left">mm:ss</p>
            <button 
                id="start_stop"
                className={clockState.isRunning === true ? "fa-solid fa-pause" : "fa-solid fa-play"}
                onClick={runClock}
            ></button>
            <button
                id="reset" 
                className="fa-solid fa-arrows-rotate"
                onClick={() => {setClockSettings(defaultSettings)}}
            ></button>
            
        </section>
    )
}