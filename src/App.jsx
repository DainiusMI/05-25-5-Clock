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

  const [clockState, setClockState] = React.useState({
    isRunning: false  
  })

  return (
    <main className="app">

      <AdjustClock  
        name="break" 
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
      />
      <AdjustClock  
        name="session" 
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
      />

      <Clock 
        clockState={clockState}
        setClockState={setClockState}

        setClockSettings={setClockSettings}
        defaultSettings={defaultSettings}
      />

    </main>
  )
}
