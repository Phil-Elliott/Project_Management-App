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
  
  1) Board
    - Finish comment section
    - Add (change name and delete section for sections elipsis)
    - Add project settings (delete project, change name, change background)
    - Add filter functionality
    - add invite members functionality
    - Fix all styles

  2) User profile
    - Make a modal for editing the user profile (change name, change avatar, change password, change username, delete account)

  3) Stylings
    - add loader screens
    - Fix signin and signup pages

    

*/
