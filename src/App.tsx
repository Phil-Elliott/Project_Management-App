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
  

  Content Section 
    1) Figure out diffirent sections 
          - New Project
          - Project Hub
          - My Tasks
          - Project Dashboard 
            Items 
              1) Project details (goals etc) (Maybe just do this when creating project then crud the rest on their pages)
		          2) Team section (team tree) 
	          	3) Tasks section (could have diffirent departments page before this) - subtasks within - coments section
		          4) Finance Section 
		          5) Time (on schedule, behind schedule) 

    2) Create files
    3) Connect to React Router 
    4) Start working on first file 



    can use modals to add throughout the app

*/
