import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./Dashboard.scss";
import Layout from "./Layout/Layout";
import MainHub from "./MainHub/MainHub";
import Board from "./Board/Board";
import { ProjectLayout } from "./Board/ProjectLayout/ProjectLayout";
import { RootState } from "./Store";

const Dashboard = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <div className="dashboard-container">
      <Layout>
        <div className="content">
          <Routes>
            <Route path="/" element={<MainHub projects={projects} />} />
            <Route
              path="/:id"
              element={<ProjectLayout projectsData={projects} />}
            >
              <Route index element={<Board />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;

/*
  Fix up projecthub
  Make add project modal 
  Make edit project modal 
  Add more functionality to task section
  Make everything responsive

  Fix up signin page
  Connect to a database

  Make sure all data in the app works with the database

  Make a landing page

  Continue to add functionality 
  Maybe add a dashboard for each project



*/
