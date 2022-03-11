import React, { useState, useEffect } from "react"
import "./Header.scss"
import TopHeaderContent from "./Components/TopHeaderContent"
import BottomHeaderContent from "./Components/BottomHeaderContent"
import { FaAngleDoubleRight } from "react-icons/fa"

const Header = ({ navClass }: { navClass: string }) => {
  const [expandMain, setExpandMain] = useState<boolean>(false)
  const [expandContent, setExpandContent] = useState<boolean>(false)

  // Expands the nav when the bottom arrow is clicked
  const expandNav = () => {
    setExpandMain(!expandMain)
  }

  // Expands the projects when the arrow above projects is clicked
  const expandProjects = () => {
    setExpandContent(!expandContent)
  }

  // classnames for expanded nav and not expanded nav
  const expandClass = expandMain ? "nav-icon expand-container" : "nav-icon"

  // Makes sure that the entire header goes away when responsive and top icon is clicked

  useEffect(() => {
    setExpandMain(false)
  }, [navClass])

  return (
    <header
      className={navClass}
      style={expandMain ? { width: "15rem" } : { width: "4.5rem" }}
    >
      <div className="main-header-content">
        <TopHeaderContent expandClass={expandClass} expandMain={expandMain} />
        <BottomHeaderContent
          expandProjects={expandProjects}
          expandClass={expandClass}
          expandContent={expandContent}
          expandMain={expandMain}
        />
      </div>
      <div className="bottom-header-arrw" onClick={expandNav}>
        <FaAngleDoubleRight
          className={
            !expandMain
              ? "bottom-header-arrow-right-icon"
              : "bottom-header-arrow-left-icon"
          }
        />
      </div>
    </header>
  )
}

export default Header
