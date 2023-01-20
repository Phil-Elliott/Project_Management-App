import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
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
    {
      icon: <FaRegCircle />,
      name: "Projects hub",
      route: "/dashboard/",
    },
    {
      icon: <AiOutlineBell />,
      name: "Notifications",
      route: "/dashboard/settings",
    },

    {
      icon: <RiAccountCircleFill />,
      name: "Profile",
      route: "/dashboard/profile",
    },
  ];

  // const addProject = () => {
  //   displayProjectModal();
  //   changeActiveTab("Projects hub");
  // };

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
      ></NavLink>
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
            {expandMain && <h2>{icon.name}</h2>}
          </NavLink>
        );
      })}
    </div>
  );
};

export default TopHeaderContent;
