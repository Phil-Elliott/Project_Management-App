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

Today 

  1) Finish dashboard page 
      - Create a department card 
      - Maybe just display the details for finance part 
      - Create a table for the tasks and show recently completed tasks 
            - can be similar to rainfocus chart
      - Find the schedule example online and copy that design 

  2) Create the project hub section and create the cards that will go inside of it 
      Need to allow user to delete a project from this screen 

  3) Create the add project section 
    Have user creat the logo and name 
    Add a description and team 
  
  4) Create the details section 

  5) Create the team section 

  6) Create the schedule section 

  7) Create the Tasks section 

  8) Create the finance section 

  

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
