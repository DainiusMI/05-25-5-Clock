import React from "react";
import AdjustClock from "./assets/components/AdjustClock";
import Clock from "./assets/components/Clock";



export default function App() {

  function defaultSettings() {
    return {
        session: 25,
        break: 5
      }
  }
  const [clockSettings, setClockSettings] = React.useState(defaultSettings)

  function defaultState() {
    return {
      display: "",
      breakTime: false,
      isRunning: false
    }
  }
  const [clockState, setClockState] = React.useState(defaultState)



  return (
    <main className="app">

      <div className="adjustments__row">
        {
          Object.keys(clockSettings).map((key) => {
            return  <AdjustClock
                      key={key}  
                      name={key} 
                      clockSettings={clockSettings}
                      setClockSettings={setClockSettings}
                      clockState={clockState}
                    />
          })
        }
      </div>

      <Clock 
        clockState={clockState}
        setClockState={setClockState}
        defaultState={defaultState}


        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
        defaultSettings={defaultSettings}
      />

    </main>
  )
}
