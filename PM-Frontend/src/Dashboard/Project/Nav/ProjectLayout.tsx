import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { projectData } from "../../Interfaces";

type ProjectLayoutProps = {
  projectsData: projectData[];
};

export function ProjectLayout({ projectsData }: ProjectLayoutProps) {
  const { id } = useParams();
  const project = projectsData.find((project) => project.id === id);

  if (project == null) return <Navigate to="/dashboard" replace />;

  return <Outlet context={project} />;
}

export function useProject() {
  return useOutletContext<projectData>();
}
