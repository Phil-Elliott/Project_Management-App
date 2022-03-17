import React, { useState } from "react"
import "./DashboardDetails.scss"
import { FaPencilAlt } from "react-icons/fa"

const DashboardDetails = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState<Boolean>(true)

  return (
    <div className="dashboard-details-container">
      <div className="dashboard-details-header-container">
        <h1>Our Project</h1>
        <FaPencilAlt className="pencil-icon" />
      </div>
      <div className="dashboard-details-content">
        <p className="details-content-heading">About</p>
        <p className="details-par">{description}</p>
      </div>
    </div>
  )
}

export default DashboardDetails

/* 
  1) edit bttn opens a modal 
        value is already in container 
        when submitted new input is passed through a function that sets the new state with the new description 






 // const description = {
  //   details:
  //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, aperiam, sit autem, error velit quaerat blanditiis ipsa sint totam ratione corrupti impedit alias corporis temporibus enim harum expedita beatae a. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem libero minima rem eaque quidem quae sunt nihil nisi dolorem suscipit ipsam quos repudiandae, molestiae modi atque laboriosam assumenda facilis!",
  // }

  // const shortenDescription = () => {
  //   let str = description.details.split("").slice(0, 90).join("")
  //   let shortStr = str

  //   if (showMore) {
  //     return description.details
  //   } else {
  //     return shortStr
  //   }
  // }


  <div className="dashboard-details-content">
        <p className="details-content-heading">About</p>
        <p className="details-par">
          {description}
          {/* <span onClick={() => setShowMore(!showMore)}>
            {showMore === false ? " ... Show More" : " Show Less"}
          </span> 
        </p>

        {/* <p className="details-content-heading">Milestones</p>
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

*/
