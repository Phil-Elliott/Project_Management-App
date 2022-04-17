import React, { useState } from "react"
import "./App.scss"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard/Dashboard"
import SignIn from "./SignIn/SignIn"

const App = () => {
  const [isAuth, setIsAuth] = useState<Boolean>(false)

  return (
    <div>
      <Router basename="/Project_Management-App">
        <Routes>
          <Route path="/" element={<SignIn setIsAuth={setIsAuth} />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

/*

  1) Have a doc with all the projects
      - evrytime it updates then it also updates in firebase 


*/
