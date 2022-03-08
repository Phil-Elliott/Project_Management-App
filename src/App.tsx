import React, { useState } from "react"
import "./App.scss"
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  const [navClass, setNavClass] = useState("header unactive-side-nav")

  const changeClass = () => {
    navClass === "header unactive-side-nav"
      ? setNavClass("header active-side-nav")
      : setNavClass("header unactive-side-nav")
  }

  return (
    <div className="App">
      <Router>
        <ResponsiveHeader changeClass={changeClass} />
        <Header navClass={navClass} />
        <Content />
      </Router>
    </div>
  )
}

export default App

/*

Tonight

  - Add see more to about section of board 
  - Make the overflow scrollable 
  - Finish the rest of the dashboard and get rid of the team section  
      - finance and tasks can be big sections 
  

  - Create layout for the project 
  
  - conect project layout to react router (grid boxes are clicked)

  - Start filling in the information for project page 
      - NewProject section 

  - Create newProject page 
      - User fills in all of the details about the project 
  
  - Create the project hub page 
      - have cards for each project created 

  - connect newProject with project hub 
    - transfer the array of information to this page 

  - Create other boxes for project page 



  - could use sublinks on projects 


*/
