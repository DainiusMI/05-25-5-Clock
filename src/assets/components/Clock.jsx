import React from "react";

export default function Clock(props) {
    const {clockState, setClockState, clockSettings, setClockSettings, defaultSettings} = props

    const [trackTime, setTrackTime] = React.useState({
        timeStarted: Date.now(),
        timeNow: ""
    })
    //console.log(trackTime.timeStarted)
    //  console.log(new Date().getSeconds())
    function runClock() {
        setClockState(prevState => ({
                ...prevState,
                isRunning: !prevState.isRunning
            })
        )
        
    }


    function formTimerArr() {
        const minutes = (
            clockState.breakminutes === true ? 
                clockSettings.break : 
                clockSettings.session
            )
            .toString()
            .split("")
            .map(string => parseInt(string));
            
        return minutes.length > 1 ? [...minutes, 0, 0] : [0, ...minutes, 0, 0]
    }






    function resetClock() {
        setClockSettings(defaultSettings);
        setClockState({isRunning: false})
    }

    return (
        <section className="clock">
            <p id="timer-label">Session/Break</p>
            <p id="time-left">{clockState.display}</p>
            <button 
                id="start_stop"
                className={clockState.isRunning === true ? "fa-solid fa-pause" : "fa-solid fa-play"}
                onClick={runClock}
            ></button>
            <button
                id="reset" 
                className="fa-solid fa-arrows-rotate"
                onClick={resetClock}
            ></button>
        </section>
    )
}