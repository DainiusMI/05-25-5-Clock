import React from "react";
import SetupContainer from "./assets/components/SetupContainer";



export default function App() {

  const [clockSettings, setClockSettings] = React.useState({
    session: 25,
    break: 5
  })


  return (
    <main className="app">

      <SetupContainer  
        name="break" 
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
      />
      <SetupContainer  
        name="session" 
        clockSettings={clockSettings}
        setClockSettings={setClockSettings}
      />


    </main>
  )
}
