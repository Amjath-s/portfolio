import ProfileSidebar from "./ProfileSidebar";
import RepoFileList from "./RepoFileList";
import SectionView from "./SectionView";
import ProjectDetail from "./ProjectDetail";
import { usePath } from "./nav";
import { TABS } from "./data/profile";

export default function Portfolio() {
  const path = usePath();
  const parts = path.replace(/^\//, "").split("/").filter(Boolean);
  const sectionId = parts[0] || "";
  const projectSlug = sectionId === "projects" ? parts[1] : null;
  const isSection = TABS.some((t) => t.id === sectionId);

  let main = <RepoFileList />;
  if (projectSlug) {
    main = <ProjectDetail slug={projectSlug} />;
  } else if (isSection) {
    main = <SectionView sectionId={sectionId} />;
  }

  return (
    <div className="profile-page">
      <div className="profile-shell">
        <ProfileSidebar />
        <div className="profile-main">{main}</div>
      </div>
    </div>
  );
}
