import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "./nav";
import { getProjectBySlug } from "./data/projects";
import { profile } from "./data/profile";

function Section({ id, title, children }) {
  if (!children) return null;
  return (
    <section className="pd-section" aria-labelledby={id}>
      <h3 id={id} className="pd-section-title">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function ProjectDetail({ slug }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="repo-section">
        <p className="profile-placeholder">Project not found.</p>
        <Link to="/projects" className="repo-back-link">
          Back to projects
        </Link>
      </div>
    );
  }

  const hasLinks = Boolean(project.demo || project.github);

  return (
    <article className="repo-section project-detail">
      <nav className="repo-breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="repo-breadcrumb-link">
          {profile.username}
        </Link>
        <span className="repo-breadcrumb-sep" aria-hidden>
          /
        </span>
        <Link to="/projects" className="repo-breadcrumb-link">
          Projects
        </Link>
        <span className="repo-breadcrumb-sep" aria-hidden>
          /
        </span>
        <span className="repo-breadcrumb-current">{project.project_name}</span>
      </nav>

      <header className="pd-hero">
        <h1 className="pd-title">{project.project_name}</h1>
        {hasLinks ? (
          <div className="project-detail-actions">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="project-action"
              >
                <FiExternalLink aria-hidden />
                Live URL
              </a>
            ) : null}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="project-action"
              >
                <FiGithub aria-hidden />
                GitHub
              </a>
            ) : null}
          </div>
        ) : null}
      </header>

      <div
        className={`pd-cover${project.coverImage ? "" : " is-placeholder"}`}
        style={
          project.coverImage
            ? { backgroundImage: `url(${project.coverImage})` }
            : undefined
        }
        role="img"
        aria-label={`Cover for ${project.project_name}`}
      >
        {!project.coverImage ? (
          <span className="pd-cover-label">{project.project_name}</span>
        ) : null}
      </div>

      <Section id="pd-overview" title="Overview">
        <p className="pd-prose">{project.overview}</p>
        {project.overviewExtra ? (
          <p className="pd-prose">{project.overviewExtra}</p>
        ) : null}
      </Section>

      {project.technologies.length > 0 ? (
        <Section id="pd-tech" title="Technologies">
          <ul className="pd-tech-list">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.features.length > 0 ? (
        <Section id="pd-features" title="Features">
          {project.featuresIntro ? (
            <p className="pd-prose">{project.featuresIntro}</p>
          ) : null}
          <ul className="pd-bullet-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.challenges.length > 0 ? (
        <Section id="pd-challenges" title="Development and Challenges">
          {project.challenges.map((item) => (
            <div key={item.title} className="pd-challenge">
              <h4 className="pd-challenge-title">{item.title}</h4>
              <p className="pd-prose">{item.body}</p>
            </div>
          ))}
        </Section>
      ) : null}

      {project.conclusion ? (
        <Section id="pd-conclusion" title="Conclusion">
          <p className="pd-prose">{project.conclusion}</p>
        </Section>
      ) : null}
    </article>
  );
}
