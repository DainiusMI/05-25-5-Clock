import React from "react";


export default function SetupContainer(props) {
    const {name, clockSettings, setClockSettings} = props

    function mutateSettings(event) {
        const {value} = event.target
        setClockSettings(prevState => ({
            ...prevState,
            [name]: value > 0 ? prevState[name]+1 : prevState[name]-1
        }))
    }

    return (
        <section className={`${name}-container`}>
            <p id={`${name}-label`}>{name} Length</p>
            <p id={`${name}-length`}>{clockSettings[name]}</p>
            <button 
                id={`${name}-decrement`}
                value={-1}
                onClick={mutateSettings}
            >decrement</button>
            <button 
                id={`${name}-increment`}
                value={1}
                onClick={mutateSettings}
            >increment</button>

        </section>
    )
}