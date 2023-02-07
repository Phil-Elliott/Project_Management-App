import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { ProjectDataProps } from "~/shared/interfaces/Projects";

import { useDispatch } from "react-redux";
import { setProject } from "~/ProjectSlice";

type ProjectLayoutProps = {
  projectsData: ProjectDataProps[];
};

export function ProjectLayout({ projectsData }: ProjectLayoutProps) {
  const { id } = useParams();
  const project = projectsData.find((project) => project.id === id);

  const dispatch = useDispatch();

  if (project) dispatch(setProject(project.id));

  if (project == null) return <Navigate to="/dashboard" replace />;

  return <Outlet context={project} />;
}

export function useProject() {
  return useOutletContext<ProjectDataProps>();
}
