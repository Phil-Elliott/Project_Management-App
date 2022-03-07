import React from "react"
import "./DashboardDetails.scss"

const DashboardDetails = () => {
  return (
    <div className="dashboard-details-container">
      <h1>Our Project</h1>
      <div className="dashboard-details-content">
        <p className="details-content-heading">About</p>
        <p>A project management application to plan out small projects.</p>
        <p className="details-content-heading">Next milestone</p>
        <p>Have project production ready</p>
        <p className="details-content-heading">Key features</p>
        <ul className="dashboard-details-features">
          <li>- Simple to use</li>
          <li>- Covers many aspects of a project</li>
          <li>- Can communicate with coworkers</li>
        </ul>
      </div>
    </div>
  )
}

export default DashboardDetails

/* 
    1) Project Description 
    2) Goals (main and smaller ones)
    3) Features 
    4) Problems or hurdles 
    5) Milestones 

  or this section 
    - show quick description 
    - main goal 
    - Next milestone (maybe part of the schedule)


  header with title (Our Project)
  Border bottom (light grey)
  Quick Description 
  Product features 


*/
