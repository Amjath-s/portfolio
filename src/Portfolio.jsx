import { useEffect, useState } from "react";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import { TABS } from "./data/profile";

function getTabFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (TABS.some((t) => t.id === hash)) return hash;
  return "about";
}

function TabPanel({ id, active, title, children }) {
  if (id !== active) return null;
  return (
    <section
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className="profile-panel"
    >
      <h2 className="profile-panel-title">{title}</h2>
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(getTabFromHash);

  useEffect(() => {
    const onHash = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function handleTabChange(id) {
    setActiveTab(id);
    window.location.hash = id;
  }

  return (
    <div className="profile-page">
      <div className="profile-shell">
        <ProfileSidebar />

        <div className="profile-main">
          <ProfileTabs activeTab={activeTab} onChange={handleTabChange} />

          <div className="profile-panels">
            <TabPanel id="about" active={activeTab} title="About">
              <p className="profile-placeholder">
                About content and contribution graph come in Phase 2.
              </p>
            </TabPanel>

            <TabPanel id="projects" active={activeTab} title="Projects">
              <p className="profile-placeholder">
                Project list comes in Phase 3.
              </p>
            </TabPanel>

            <TabPanel id="resume" active={activeTab} title="Resume">
              <p className="profile-placeholder">
                Resume content comes in Phase 5.
              </p>
            </TabPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
