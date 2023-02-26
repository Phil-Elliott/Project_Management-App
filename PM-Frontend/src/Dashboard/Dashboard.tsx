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

  function getUser() {
    axios
      .get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getProjects() {
    axios
      .get(`http://localhost:1337/api/users/me?populate=*`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        dispatch(setProjects(res.data.projects));
      })
      .catch((err) => {
        console.log(err);
      });
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
  - tooltip to avatar
  - pencil icon
  - Show image in nav


    - Add hover tags
    - Make forget password work
    - Get filter to work
    - Fix up comments
    - launch project
    - put on portfolio website
    - add to resume

    - could put avatar on the account icon for nav

  



    

*/
