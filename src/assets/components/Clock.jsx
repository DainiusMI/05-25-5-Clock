import React from "react";
import { useEffect } from "react";

export default function Clock(props) {
    const {clockState, setClockState, 
        clockSettings, setClockSettings, defaultSettings} = props

    const [clockDate, setClockDate] = React.useState({
        started: new Date(),
        current: new Date(),
        nextSecond: "",
        interval: 1000
    })

    function defaultTimer() {
        return {
            nextSecond: "",
            target: clockSettings.session*60,
            interval: 1000,
        }
    }
    const [timer, setTimer] = React.useState(defaultTimer)


    React.useEffect(() => {
        let minutes = 0
        let value = timer.target
        while (value >= 60) {
            value -=60
            minutes++
        }
        let seconds = value
        setClockState(prevState => ({
            ...prevState,
            display: `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
        }))
    }, [timer.target])

    const tracker = React.useRef()
    useEffect(() => {
 
        if (clockState.isRunning === true) {
            tracker.current = setInterval(() => {
                setTimer(prevData => ({
                    nextSecond: prevData.nextSecond !== "" ? 
                        prevData.nextSecond + 1000 :
                        Date.now() + 1000,
                    target: prevData.target - 1,
                    interval: 2000 + (prevData.nextSecond - Date.now())
                }))
            }, 1000)
        }
        else {
            clearInterval(tracker.current)
        }

        return () => clearInterval(tracker.current)
    }, [clockState.isRunning])


    function runClock() {
        setClockState(prevState => ({
                ...prevState,
                isRunning: !prevState.isRunning
            })
        )
        clockState.isRunning === false && setTimer(prevData => ({
            ...prevData,
            started: Date.now()
        }))
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







/*





    function defaultTimer() {
        return {
            nextSecond: "",
            target: clockSettings.session*60,
            interval: 1000,
        }
    }
    const [timer, setTimer] = React.useState(defaultTimer)

    const tracker = React.useRef()
    useEffect(() => {
 
        if (clockState.isRunning === true) {
            tracker.current = setInterval(() => {
                setTimer(prevData => ({
                    nextSecond: prevData.nextSecond !== "" ? 
                        prevData.nextSecond + 1000 :
                        Date.now() + 1000,
                    target: prevData.target - 1,
                    interval: 2000 + (prevData.nextSecond - Date.now())
                }))
            }, timer.interval)
        }
        else {
            clearInterval(tracker.current)
        }

        return () => clearInterval(tracker.current)
    }, [clockState.isRunning])





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

*/