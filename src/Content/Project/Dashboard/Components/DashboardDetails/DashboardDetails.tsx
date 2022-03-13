import React, { useState } from "react"
import "./DashboardDetails.scss"
import { FaPencilAlt } from "react-icons/fa"

const DashboardDetails = () => {
  const [showMore, setShowMore] = useState<Boolean>(false)

  const description = {
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, aperiam, sit autem, error velit quaerat blanditiis ipsa sint totam ratione corrupti impedit alias corporis temporibus enim harum expedita beatae a. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem libero minima rem eaque quidem quae sunt nihil nisi dolorem suscipit ipsam quos repudiandae, molestiae modi atque laboriosam assumenda facilis!",
  }

  const shortenDescription = () => {
    let str = description.details.split("").slice(0, 90).join("")
    let shortStr = str

    if (showMore) {
      return description.details
    } else {
      return shortStr
    }
  }

  return (
    <div className="dashboard-details-container">
      <div className="dashboard-details-header-container">
        <h1>Our Project</h1>
        <FaPencilAlt className="pencil-icon" />
      </div>
      <div className="dashboard-details-content">
        <p className="details-content-heading">About</p>
        <p className="details-par">
          {shortenDescription()}
          <span onClick={() => setShowMore(!showMore)}>
            {showMore === false ? " ... Show More" : " Show Less"}
          </span>
        </p>

        <p className="details-content-heading">Milestones</p>
        <p>- Finish design for project</p>
        <p>- Finish completing basic features of app.</p>
        <p>- Launch app and start getting feedback from client.</p>
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

  1) Take out team section 
  2") Expand finance section 2nd 
  3) Put schedule next to tasks


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


  could do a ... read more 

  could have a span with this 
    - when clicked it shows the full par
    - create a state that changes and determines which one to show 
    - have a function that spits out the fist [50] characters and then add that to the end 


*/
