import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { ProjectDataProps } from "~/shared/interfaces/Projects";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  setRefresh,
  setProject,
  setProjectUsers,
  setSections,
} from "~/ProjectSlice";

export function ProjectLayout() {
  const { id } = useParams();

  const dispatch = useDispatch();

  async function fetchProject() {
    try {
      const res = await axios.get(
        `https://pm-server-production.up.railway.app/api/v1/projects/${id}`,
        { withCredentials: true }
      );
      dispatch(
        setProject({
          id: id,
          title: res.data.data.project.title,
          background: res.data.data.project.background,
        } as ProjectDataProps)
      );

      dispatch(
        setProjectUsers(
          res.data.data.project.users.map((user: any) => {
            return {
              id: user._id,
              username: user.name,
              avatar: user.avatar,
            };
          })
        )
      );
      dispatch(
        setSections(
          res.data.data.project.ordered_sections.map((section: any) => {
            return {
              id: section._id,
              title: section.title,
              order: section.order,
            };
          })
        )
      );
    } catch (err) {
      console.log(err);
      <Navigate to="/dashboard/" replace />;
    }
  }

  useEffect(() => {
    dispatch(setRefresh());
    fetchProject();
  }, [id]);

  return <Outlet />;
}

export function useProject() {
  return useOutletContext();
}

/*

// if (newProject == null) return <Navigate to="/dashboard/" replace />;
project (get here)
users (get here)
tasks (maybe get when you call for a section)
  Need to call each one by id in tasks to get comments
sections (get here)
    Need to call each one by id in sections to get tasks
comments (maybe get when you call for a task)


can write in the attributes into the types interfaces
Would need to grab the relationship to each one at the task level or comment level

*/

// const project = projectsData.find((project) => project.id === id);

// getProject();

// function getProject() {
//   axios
//     .get(`http://localhost:1337/api/projects/${id}?populate=*`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//       },
//     })
//     .then((res) => {
//       console.log(res.data);
//       project = res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
