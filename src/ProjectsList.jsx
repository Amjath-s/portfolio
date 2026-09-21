import { FiFolder } from "react-icons/fi";
import { Link } from "./nav";
import { projects } from "./data/projects";
import { profile } from "./data/profile";

export default function ProjectsList() {
  return (
    <div className="projects-panel">
      <nav className="repo-nav" aria-label="Projects">
        <div className="repo-nav-header">
          <span className="repo-nav-branch">
            <span className="repo-nav-dot" aria-hidden />
            {profile.username} / projects
          </span>
          <span className="repo-nav-hint">{projects.length} folders</span>
        </div>

        <ul className="repo-file-list">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link to={`/projects/${project.slug}`} className="repo-file-row">
                <span className="repo-file-icon" aria-hidden>
                  <FiFolder />
                </span>
                <span className="repo-file-name">{project.project_name}</span>
                <span className="repo-file-desc">{project.summary}</span>
                <span className="repo-file-meta">folder</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
