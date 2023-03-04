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
      .get("https://strapi-production-7520.up.railway.app/api/users/me", {
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
      .get(
        `https://strapi-production-7520.up.railway.app/api/users/me?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
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

  Go to project
  Go to mainhub 
  go back to project and tasks in wrong section or section and section name in wrong place
  Think it has to do with the sections


  1) Take out comments
  2) Make navbar zindex higher for responsiveness
  3) Make sure there is padding on bottom of mainhub responsive



  1) Figure out what is wrong with deployed site and dragging and dropping
  2) Fix image problem
  4) Fix api call when being dragged (maybe can save to local storage somehow)
  

  

  drag and drop is not working right

  need to delete all of the comments
  
  2) Add reply to comment
  3) Maybe have loader while adding new comments or updating comments
  4) Work on filter modal
  5) Get a new logo
  7) Add forget password
  8) Figure out why task data taking so long to load (maybe cant do anything)


  There is a blur when editing description






    

*/
