import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./Dashboard.scss";
import { useEffect } from "react";
import Layout from "./Layout/Layout";
import MainHub from "./MainHub/MainHub";
import Board from "./Board/Board";
import { ProjectLayout } from "./Board/ProjectLayout/ProjectLayout";
import { RootState } from "~/Store";
import { useDispatch } from "react-redux";
import { setJwt, setUser, setProjects } from "~/ProjectSlice";
import axios from "axios";

const Dashboard = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state: RootState) => state.project.jwt);

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/");
    } else if (jwt) {
      getUser();
      getProjects();
    } else {
      dispatch(setJwt(localStorage.getItem("jwt")!));
      getUser();
      getProjects();
    }
  }, [jwt]);

  async function getUser() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/me`,
        { withCredentials: true }
      );
      dispatch(setUser(response.data.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  async function getProjects() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/projects`,
        { withCredentials: true }
      );
      dispatch(setProjects(response.data.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="dashboard-container">
      <Layout>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <MainHub projects={projects} getProjects={getProjects} />
              }
            />
            <Route path="/:id" element={<ProjectLayout />}>
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

  1) Add reply to comment
  3) Have a number and x next to filter bttn
  4) Add an admin and maybe emails next to members
  5) Add forget password

  http://localhost:3000/

*/
