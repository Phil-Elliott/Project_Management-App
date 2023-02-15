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
import Profile from "./Profile/Profile";

const Dashboard = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state: RootState) => state.project.jwt);

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/signin/");
    } else if (jwt === "") {
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
        // console.log(res);
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
        // console.log(res.data.projects, "projects");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function getProject() {
  //   axios
  //     .get(`http://localhost:1337/api/projects/4?populate=*`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.data.attributes);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
            <Route path="/profile" element={<Profile />} />
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
  
  1) Handle the main hub
         1) Grab projects data and user data and set in the redux store
         2) Be able to create a project and add to redux store

              - Look at using redux thunk to handle async actions (database and then redux store)

  2) Handle the board
          1) Grab and display everything in the board
          2) Start adding functionality to the board

  3) User profile
    - Make a page for editing the user profile or maybe just a modal



    -airtutors

*/
