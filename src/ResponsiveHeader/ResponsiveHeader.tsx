import React, { useState } from "react"
import "./ResponsiveHeader.scss"
import { FaPlus, FaRegCircle, FaBars, FaArrowLeft } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const ResponsiveHeader = ({
  changeClass,
  displayProjectModal,
}: {
  changeClass: any
  displayProjectModal: any
}) => {
  const [navLogo, setNavLogo] = useState<string>("ham")
  const [activeLogo, setActiveLogo] = useState<boolean>(false)

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
          ) : (
            <FaArrowLeft
              className={activeLogo ? "arrow-logo-left" : "arrow-logo-right"}
              onClick={() => setActiveLogo(!activeLogo)}
            />
          )}
        </div>
      </div>
      <div className="responsive-header-links">
        <NavLink
          to="/"
          style={{ textDecoration: "none", color: "white", width: "100%" }}
          onClick={() => displayProjectModal()}
        >
          <FaPlus />
        </NavLink>
        <NavLink
          to="/"
          style={{ textDecoration: "none", color: "white", width: "100%" }}
        >
          <FaRegCircle />
        </NavLink>
      </div>
    </div>
  )
}

export default ResponsiveHeader
