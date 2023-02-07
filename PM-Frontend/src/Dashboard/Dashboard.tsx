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
import { setJwt, setUser } from "~/ProjectSlice";
import axios from "axios";
import Profile from "./Profile/Profile";

const Dashboard = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = useSelector((state: RootState) => state.project.jwt);
  const user = useSelector((state: RootState) => state.project.user);

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/signin/");
    } else if (jwt === "") {
      dispatch(setJwt(localStorage.getItem("jwt")!));
      getUser();
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

  return (
    <div className="dashboard-container">
      <Layout>
        <div className="content">
          <Routes>
            <Route path="/" element={<MainHub projects={projects} />} />
            <Route path="/profile" element={<Profile />} />
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
