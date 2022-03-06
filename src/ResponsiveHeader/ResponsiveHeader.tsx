import React, { useState } from "react"
import "./ResponsiveHeader.scss"
import {
  FaPlus,
  FaRegCircle,
  FaUser,
  FaBars,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa"

const ResponsiveHeader = ({ changeClass }: { changeClass: any }) => {
  const [navLogo, setNavLogo] = useState("ham")

  const changeLogo = (logo: string) => {
    setNavLogo(logo)
  }

  return (
    <div className="responsive-nav">
      <div className="responsive-header-logo">
        <h2>SP</h2>
        <div onClick={changeClass}>
          {navLogo === "ham" ? (
            <FaBars
              className="hamburger-icon"
              onClick={() => changeLogo("left")}
            />
          ) : navLogo === "left" ? (
            <FaArrowLeft
              className="arrow-logo"
              onClick={() => changeLogo("right")}
            />
          ) : (
            <FaArrowRight
              className="arrow-logo"
              onClick={() => changeLogo("left")}
            />
          )}
        </div>
      </div>
      <div className="responsive-header-links">
        <FaPlus />
        <FaRegCircle />
        <FaUser />
      </div>
    </div>
  )
}

export default ResponsiveHeader
