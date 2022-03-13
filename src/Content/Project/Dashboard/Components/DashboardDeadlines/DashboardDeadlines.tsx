import React from "react"
import "./DashboardDeadlines.scss"
import DeadlinesItem from "./Components/DeadlinesItem"
import moment from "moment"

const DashboardDeadlines = () => {
  let date = moment().format("LL")

  return (
    <div className="dashboard-deadlines-container">
      <div className="dashboard-deadlines-header">
        <h1>Upcoming Deadlines</h1>
        <p>{date}</p>
      </div>
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
    </div>
  )
}

export default DashboardDeadlines

/*
      use moment js to get current date 
      maybe remove department and put a pencil and a trash can (use all of the same stuff as on the other page)
      make responsive 
        do the same as with the other one 
          might need to break work or something 








  - Upcoming deadlines 
            1) Make a table 
                dues date, border, task, assignedTo, status




  - Can do a grid 
      - header +6 so repeat 7 frs

  - div
    p(date) - border right 
    p(task name)
    p(department)
    p(person)

  responsive 
    make scrollable after certian screen size 


    could throw a date on the top right box
*/
