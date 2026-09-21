import { FiFile, FiFolder } from "react-icons/fi";
import { TABS, profile } from "./data/profile";

export default function ProfileTabs({ activeTab, onChange }) {
  return (
    <nav className="repo-nav" aria-label="Profile sections">
      <div className="repo-nav-header">
        <span className="repo-nav-branch">
          <span className="repo-nav-dot" aria-hidden />
          {profile.username}
        </span>
        <span className="repo-nav-hint">portfolio</span>
      </div>

      <ul className="repo-file-list" role="tablist">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const Icon = tab.kind === "folder" ? FiFolder : FiFile;

          return (
            <li key={tab.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                className={`repo-file-row${isActive ? " is-active" : ""}`}
                onClick={() => onChange(tab.id)}
              >
                <span className="repo-file-icon" aria-hidden>
                  <Icon />
                </span>
                <span className="repo-file-name">{tab.label}</span>
                <span className="repo-file-desc">{tab.description}</span>
                <span className="repo-file-meta">{tab.meta}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
