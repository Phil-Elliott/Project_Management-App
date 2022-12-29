import React from "react";
import { FaPlus, FaRegCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const TopHeaderContent = ({
  expandClass,
  expandMain,
  activeTab,
  changeActiveTab,
  displayProjectModal,
}: {
  expandClass: any;
  expandMain: boolean;
  activeTab: string;
  changeActiveTab: any;
  displayProjectModal: any;
}) => {
  // Links to the top part of the header
  const iconLinks = [
    // {
    //   icon: <FaPlus />,
    //   name: "New project",
    //   route: "/new",
    // },
    {
      icon: <FaRegCircle />,
      name: "Projects hub",
      route: "/dashboard/",
    },
    // {
    //   icon: <FaTasks />,
    //   name: "My tasks",
    //   route: "/tasks",
    // },
    // {
    //   icon: <FaUser />,
    //   name: "Account",
    //   route: "/account",
    // },
  ];

  const addProject = () => {
    displayProjectModal();
    changeActiveTab("Projects hub");
  };

  return (
    <div className="top-header-content">
      <div className={expandMain ? "logo expand-container" : "logo"}>
        sP<h2>SimplePlan</h2>
      </div>
      <NavLink
        to="/dashboard/"
        style={{
          textDecoration: "none",
          color: "white",
          width: "100%",
        }}
      >
        <div className={expandClass} onClick={() => addProject()}>
          <FaPlus />
          <h2>New project</h2>
        </div>
      </NavLink>
      {iconLinks.map((icon, i) => {
        return (
          <NavLink
            key={icon.name}
            to={icon.route}
            style={{ textDecoration: "none", color: "white", width: "100%" }}
            className={({ isActive }) =>
              isActive ? `activeTab ${expandClass}` : expandClass
            }
            onClick={() => changeActiveTab(icon.name)}
          >
            {icon.icon}
            <h2>{icon.name}</h2>
          </NavLink>
        );
      })}
    </div>
  );
};

export default TopHeaderContent;
