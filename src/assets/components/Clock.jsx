import React from "react";
import StatusIndicator from "./StatusIndicator";


export default function Clock(props) {
    const {clockState, setClockState, defaultState, clockSettings, setClockSettings, defaultSettings} = props


    function defaultTimer() {
        return {
            value: clockState.breakTime === true ?
            clockSettings.break * 60 :
            clockSettings.session * 60,
            interval: 1000
        }
    }
    const [timer, setTimer] = React.useState(defaultTimer)
    
    // once settings change reasign timer value ALSO RESETS
    React.useEffect(() => setTimer(defaultTimer), [clockSettings])

    // once timer runs out change mode
    React.useEffect(() => {
        if (timer.value === 0) {
            setClockState(prevState => ({
                ...prevState,
                sessionTime: !prevState.sessionTime
            }))
        }
        if (timer.value < 0) {
            setClockState(prevState => ({
                ...prevState,
                breakTime: !prevState.breakTime
            }))
            document.getElementById("beep").play()
        }

    }, [timer.value])

    // once mode changed ajust the timer value for it
    React.useEffect(() => setTimer(defaultTimer), [clockState.breakTime])

    // update clock display
    React.useEffect(() => {
        let minutes = 0
        let value = timer.value
        while (value >= 60) {
            value -=60
            minutes++
        }
        let seconds = value
        setClockState(prevState => ({
            ...prevState,
            display: `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
        }))
    }, [timer.value])


    // tracks time about every 1 second and subtracts from value
    const tracker = React.useRef()
    React.useEffect(() => {
        if (clockState.isRunning === true) {
            tracker.current = setInterval(() => {
                setTimer(prevData => ({
                    ...prevData,
                    value: prevData.value - 1
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
    }
    function resetClock() {
        setClockSettings(defaultSettings);
        setClockState(defaultState)
        
        const audio = document.getElementById("beep")
        audio.pause()
        audio.src = audio.src
    }

    return (
        <section className="clock">
            <div className="discplay__container">
                <p id="timer-label">{clockState.sessionTime ? "Session" : "Break"}</p>
                <p id="time-left">{clockState.display}</p>
            </div>

            <div className="button__row">
                <div className="button__container">
                        <p>
                            {clockState.isRunning === true ? "pause" : "run"}
                        </p>
                        <button 
                            id="start_stop"
                            className={clockState.isRunning === true ? "fa-solid fa-pause pause" : "fa-solid fa-play run"}
                            onClick={runClock}
                        ></button>
                    </div>
                    <div className="button__container">
                        <p>reset</p>
                        <button
                            id="reset" 
                            className="fa-solid fa-arrows-rotate reset"
                            onClick={resetClock}
                        ></button>
                    </div>
                </div>
            <audio id="beep" src="https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3"/>
        </section>
    )
}




/*


            <div className="status__container">
                <p className="title">Clock status: </p>
                {
                    ["running", "session", "break"].map((name, idx) => {
                    return <StatusIndicator 
                                key={idx} 
                                name={name} 
                                clockState={clockState}
                    />})
                }
            </div>


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