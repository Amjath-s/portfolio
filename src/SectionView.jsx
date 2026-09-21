import { Link } from "./nav";
import { profile, TABS } from "./data/profile";
import AboutPanel from "./AboutPanel";
import ProjectsList from "./ProjectsList";
import ResumePanel from "./ResumePanel";

export default function SectionView({ sectionId }) {
  const section = TABS.find((t) => t.id === sectionId);

  if (!section) {
    return (
      <div className="repo-section">
        <p className="profile-placeholder">Section not found.</p>
        <Link to="/" className="repo-back-link">
          Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="repo-section">
      <nav className="repo-breadcrumb no-print" aria-label="Breadcrumb">
        <Link to="/" className="repo-breadcrumb-link">
          {profile.username}
        </Link>
        <span className="repo-breadcrumb-sep" aria-hidden>
          /
        </span>
        <Link to="/" className="repo-breadcrumb-link">
          portfolio
        </Link>
        <span className="repo-breadcrumb-sep" aria-hidden>
          /
        </span>
        <span className="repo-breadcrumb-current">{section.label}</span>
      </nav>

      {section.id === "about" ? (
        <AboutPanel />
      ) : section.id === "projects" ? (
        <ProjectsList />
      ) : section.id === "resume" ? (
        <ResumePanel />
      ) : null}
    </div>
  );
}
