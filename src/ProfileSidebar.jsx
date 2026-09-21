import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiLink } from "react-icons/fi";
import { profile } from "./data/profile";
import frontendSkills from "./frontend.json";
import otherSkills from "./otherskill.json";

const skills = [...frontendSkills, ...otherSkills].slice(0, 10);

function socialIcon(label) {
  const key = label.toLowerCase();
  if (key.includes("git")) return FiGithub;
  if (key.includes("linked")) return FiLinkedin;
  if (key.includes("mail") || key.includes("email")) return FiMail;
  return FiLink;
}

export default function ProfileSidebar() {
  return (
    <aside className="profile-sidebar">
      <img
        className="profile-avatar"
        src={profile.avatar}
        alt={profile.name}
        width={296}
        height={296}
      />

      <div className="profile-identity">
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-username">{profile.username}</p>
        <p className="profile-title">{profile.title}</p>
      </div>

      <p className="profile-bio">{profile.bio}</p>

      {profile.location ? (
        <p className="profile-meta">
          <FiMapPin aria-hidden />
          <span>{profile.location}</span>
        </p>
      ) : null}

      <ul className="profile-socials">
        {profile.socials.map((item) => {
          const Icon = socialIcon(item.label);
          return (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer">
                <Icon aria-hidden />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="profile-skills">
        <h2 className="profile-skills-heading">Skills</h2>
        <ul className="profile-skill-list">
          {skills.map((skill) => (
            <li key={skill.name} className="profile-skill-chip" title={skill.tag}>
              {skill.logo ? (
                <img src={skill.logo} alt="" width={16} height={16} />
              ) : null}
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
