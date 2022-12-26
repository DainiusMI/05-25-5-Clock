import React from "react";


export default function AdjustClock(props) {
    const {name, clockSettings, setClockSettings} = props

    function mutateSettings(event) {
        const {value} = event.target
        setClockSettings(prevState => ({
            ...prevState,
            [name]: value > 0 ? prevState[name]+1 : prevState[name]-1
        }))
    }

    return (
        <section className={`${name}-container setup__container`}>
            <p id={`${name}-label`} className="label">{name} Length</p>

            <div className="setup__row" >

                <button 
                    id={`${name}-decrement`}
                    value={-1}
                    onClick={mutateSettings}
                >-</button>

                <p id={`${name}-length`} className="value">{clockSettings[name]}</p>

                <button 
                    id={`${name}-increment`}
                    value={1}
                    onClick={mutateSettings}
                >+</button>

            </div>


        </section>
    )
}