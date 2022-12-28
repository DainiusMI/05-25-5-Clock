import React from "react";
import AdjustClock from "./assets/components/AdjustClock";
import Clock from "./assets/components/Clock";

// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 


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
      isSession: true,
      breakTime: false,
      isRunning: false
    }
  }
  const [clockState, setClockState] = React.useState(defaultState)

  React.useEffect(() => {
    setClockState(prevState => ({
      ...prevState,
      display: clockSettings.session > 9 ? 
      `${clockSettings.session}:00` :
      `0${clockSettings.session}:00`

    }))
  }, [clockSettings])

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
