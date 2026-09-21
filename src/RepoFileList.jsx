import { Link } from "./nav";
import { FiFile, FiFolder } from "react-icons/fi";
import { TABS, profile } from "./data/profile";

export default function RepoFileList() {
  return (
    <nav className="repo-nav" aria-label="Profile sections">
      <div className="repo-nav-header">
        <span className="repo-nav-branch">
          <span className="repo-nav-dot" aria-hidden />
          {profile.username}
        </span>
        <span className="repo-nav-hint">portfolio</span>
      </div>

      <ul className="repo-file-list">
        {TABS.map((tab) => {
          const Icon = tab.kind === "folder" ? FiFolder : FiFile;

          return (
            <li key={tab.id}>
              <Link to={`/${tab.id}`} className="repo-file-row">
                <span className="repo-file-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="repo-file-name">{tab.label}</span>
                <span className="repo-file-desc">{tab.description}</span>
                <span className="repo-file-meta">{tab.meta}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
