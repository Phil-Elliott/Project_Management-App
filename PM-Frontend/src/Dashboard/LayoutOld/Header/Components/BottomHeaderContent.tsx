import React from "react";
import { FaAngleDown, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RootState } from "../../../Store";
import { useSelector } from "react-redux";

const BottomHeaderContent = ({
  expandProjects,
  expandClass,
  expandContent,
  expandMain,
  activeTab,
  changeActiveTab,
}: {
  expandProjects: any;
  expandClass: any;
  expandContent: boolean;
  expandMain: boolean;
  activeTab: string;
  changeActiveTab: any;
}) => {
  const projectsData = useSelector(
    (state: RootState) => state.project.projects
  );

  // let arrayForSort = [...projectsData];

  // let newProjectsData = arrayForSort.sort((a, b) => {
  //   var dateA: any = new Date(a.launch);
  //   var dateB: any = new Date(b.launch);
  //   return dateA - dateB;
  // });

  return (
    <div className="bottom-header-content">
      <div
        style={expandMain ? { justifyContent: "space-between" } : {}}
        onClick={expandProjects}
        className={`${expandClass} bottom-header-arrw-down-container`}
      >
        <h2 style={{ padding: "0" }}>Projects</h2>
        <FaAngleDown
          className={
            expandContent
              ? "bottom-header-arrow-down-icon"
              : "bottom-header-arrow-up-icon"
          }
        />
      </div>
      {!expandContent
        ? projectsData.map((project, i) => {
            if (i < 3) {
              return (
                <Link
                  key={project.name}
                  to={`/dashboard/${project.id}`}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div
                    className={
                      activeTab === project.name
                        ? `activeTab ${expandClass}`
                        : expandClass
                    }
                    onClick={() => changeActiveTab(project.name)}
                  >
                    <div
                      className="bottom-header-logo"
                      style={{ backgroundImage: `url(${project.background})` }}
                    >
                      <p>{project.name[0]}</p>
                    </div>
                    {expandMain && <h2>{project.name}</h2>}
                  </div>
                </Link>
              );
            }
          })
        : projectsData.map((project, i) => {
            return (
              <Link
                key={project.name}
                to={`/dashboard/${project.id}`}
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100%",
                }}
              >
                <div
                  className={
                    activeTab === project.name
                      ? `activeTab ${expandClass}`
                      : expandClass
                  }
                  onClick={() => changeActiveTab(project.name)}
                >
                  <div
                    className="bottom-header-logo"
                    style={{ background: "pink" }}
                  >
                    <p>{project.name[0]}</p>
                  </div>
                  <h2>{project.name}</h2>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default BottomHeaderContent;
