import { FiGithub, FiLinkedin, FiMail, FiLink } from "react-icons/fi";
import { profile } from "./data/profile";
import { technologies, tools, softSkills } from "./data/skills";
import ContributionGraph from "./ContributionGraph";

function socialIcon(label) {
  const key = label.toLowerCase();
  if (key.includes("git")) return FiGithub;
  if (key.includes("linked")) return FiLinkedin;
  if (key.includes("mail") || key.includes("email")) return FiMail;
  return FiLink;
}

function SkillSection({ title, children }) {
  return (
    <section className="about-skill-section">
      <h3 className="about-skill-heading">{title}</h3>
      {children}
    </section>
  );
}

export default function AboutPanel() {
  return (
    <div className="about-panel">
      <header className="about-hero">
        <p className="about-eyebrow">{profile.title}</p>
        <h2 className="about-headline">{profile.headline}</h2>
        <div className="about-bio">
          {profile.about.map((block, index) => {
            if (typeof block === "string") {
              return <p key={index}>{block}</p>;
            }
            if (block.type === "internship") {
              return (
                <p key={index}>
                  {block.before}
                  <a
                    href={block.orgUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="about-inline-link"
                  >
                    {block.org}
                  </a>
                  {block.middle}
                  <strong>{block.project}</strong>
                  {block.after}
                </p>
              );
            }
            return null;
          })}
        </div>

        <ul className="about-socials">
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
      </header>

      <SkillSection title="Technologies">
        <ul className="about-tech-list">
          {technologies.map((item) => (
            <li key={item.name} className="about-tech-item">
              {item.logo ? (
                <img src={item.logo} alt="" width={20} height={20} />
              ) : null}
              <span>{item.name}</span>
              {item.tag ? (
                <span className="about-tech-tag">{item.tag}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </SkillSection>

      <SkillSection title="Tools">
        <ul className="about-tech-list">
          {tools.map((item) => (
            <li key={item.name} className="about-tech-item">
              {item.logo ? (
                <img src={item.logo} alt="" width={20} height={20} />
              ) : null}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </SkillSection>

      <SkillSection title="Soft skills">
        <ul className="about-soft-list">
          {softSkills.map((skill) => (
            <li key={skill} className="about-soft-chip">
              {skill}
            </li>
          ))}
        </ul>
      </SkillSection>

      <ContributionGraph />
    </div>
  );
}
