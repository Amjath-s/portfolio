import { FiAward, FiZap } from "react-icons/fi";
import { profile } from "./data/profile";
import { achievements, hackathons } from "./data/extras";

export function HackathonsPanel() {
  return (
    <ListFolder
      branchLabel={`${profile.username} / hackathons`}
      items={hackathons}
      icon={FiZap}
      emptyText="No hackathons listed yet."
    />
  );
}

export function AchievementsPanel() {
  return (
    <ListFolder
      branchLabel={`${profile.username} / achievements`}
      items={achievements}
      icon={FiAward}
      emptyText="No achievements listed yet."
    />
  );
}

function ListFolder({ branchLabel, items, icon: Icon, emptyText }) {
  return (
    <div className="projects-panel">
      <nav className="repo-nav" aria-label={branchLabel}>
        <div className="repo-nav-header">
          <span className="repo-nav-branch">
            <span className="repo-nav-dot" aria-hidden />
            {branchLabel}
          </span>
          <span className="repo-nav-hint">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <p className="profile-placeholder" style={{ margin: "1rem" }}>
            {emptyText}
          </p>
        ) : (
          <ul className="repo-file-list">
            {items.map((item) => {
              const content = (
                <>
                  <span className="repo-file-icon" aria-hidden>
                    <Icon />
                  </span>
                  <span className="repo-file-name">{item.title}</span>
                  <span className="repo-file-desc">{item.description}</span>
                  <span className="repo-file-meta">{item.meta}</span>
                </>
              );

              return (
                <li key={item.id}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="repo-file-row"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="repo-file-row is-static">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
}
