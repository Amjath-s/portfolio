import rawProjects from "../Project.json";

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const projects = rawProjects.map((p) => {
  const overview = p.overview || p.content || "";
  const summarySource = overview || p.content || "";
  return {
    ...p,
    slug: slugify(p.project_name),
    github: (p.github || "").trim(),
    demo: (p.demo || "").trim(),
    coverImage: (p.coverImage || "").trim(),
    overview,
    overviewExtra: p.overviewExtra || "",
    technologies: p.technologies || [],
    featuresIntro: p.featuresIntro || "",
    features: p.features || [],
    challenges: p.challenges || [],
    conclusion: p.conclusion || "",
    summary:
      summarySource.length > 140
        ? `${summarySource.slice(0, 140).trim()}…`
        : summarySource,
  };
});

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getOtherProjects(slug) {
  return projects.filter((p) => p.slug !== slug);
}
