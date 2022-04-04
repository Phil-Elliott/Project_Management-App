import React, { useState, useEffect } from "react"
import "./DashboardDetails.scss"
import { FaPencilAlt } from "react-icons/fa"

const DashboardDetails = ({ description }: { description: string }) => {
  // const [showMore, setShowMore] = useState<Boolean>(false)

  // let str = description.split("").slice(0, 90).join("")

  return (
    <div className="dashboard-details-container">
      <div className="dashboard-details-header-container">
        <h1>Our Project</h1>
        {/* <FaPencilAlt className="pencil-icon" /> */}
      </div>
      <div className="dashboard-details-content">
        <p className="details-content-heading">About</p>
        <p className="details-par">{description}</p>
        {/* <p className="details-content-heading">Milestones</p>
        <p>- Finish design for project</p>
        <p>- Finish completing basic features of app.</p>
        <p>- Launch app and start getting feedback from client.</p>
        <p className="details-content-heading">Key features</p>
        <ul className="dashboard-details-features">
          <li>- Simple to use</li>
          <li>- Covers many aspects of a project</li>
          <li>- Can communicate with coworkers</li>
        </ul> */}
      </div>
    </div>
  )
}

export default DashboardDetails

/* 
  1) edit bttn opens a modal 
        value is already in container 
        when submitted new input is passed through a function that sets the new state with the new description 



    {showMore ? description : str}
          <span onClick={() => setShowMore(!showMore)}>
            {showMore === false ? " ... Show More" : " Show Less"}
          </span>


 

*/
