import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  ProjectDataProps,
  User,
  SectionProps,
} from "~/shared/interfaces/Projects";

import { useDispatch } from "react-redux";
import { setProject } from "~/ProjectSlice";
import axios from "axios";
import { useEffect, useState } from "react";

type UsersProps = {
  attributes: User;
  id: string;
};

type OutletProps = [ProjectDataProps, UsersProps[], SectionProps[]];

export function ProjectLayout() {
  const { id } = useParams();
  const [newProject, setNewProject] = useState<ProjectDataProps>({
    id: "",
    title: "",
    background: "",
  });
  const [users, setUsers] = useState<UsersProps[]>();
  const [sections, setSections] = useState<SectionProps[]>();

  async function fetchProject() {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/projects/${id}?populate[0]=sections&populate[1]=users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setNewProject(res.data.data.attributes);
      setUsers(res.data.data.attributes.users.data);
      setSections(res.data.data.attributes.sections.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [id]);

  const dispatch = useDispatch();

  if (newProject) dispatch(setProject(id));

  if (newProject == null) return <Navigate to="/dashboard/" replace />;

  return <Outlet context={[newProject, users, sections]} />;
}

export function useProject() {
  return useOutletContext<OutletProps>();
}

/*

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
