import { getPosts } from "@/utils/utils";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Projects({ range, exclude }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  // Logique de disposition Bento Grid
  const getBentoLayout = (index: number, total: number) => {
    // Si seulement 1 projet, pleine largeur
    if (total === 1) return { gridColumn: "1 / -1", gridRow: "auto" };

    // Si 2 projets, côte à côte
    if (total === 2) return { gridColumn: "span 1", gridRow: "auto" };

    // Pour 3+ projets, layout asymétrique
    if (total >= 3) {
      const patterns = [
        { gridColumn: "span 2", gridRow: "span 2" }, // Premier grand
        { gridColumn: "span 1", gridRow: "span 1" }, // Deuxième normal
        { gridColumn: "span 1", gridRow: "span 1" }, // Troisième normal
        { gridColumn: "span 1", gridRow: "span 1" }, // Quatrième normal
        { gridColumn: "span 2", gridRow: "span 1" }, // Cinquième large
      ];
      return patterns[index % patterns.length];
    }

    return { gridColumn: "span 1", gridRow: "auto" };
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
        gridAutoRows: "minmax(280px, auto)",
        gap: "clamp(1rem, 2vw, 1.5rem)",
        width: "100%",
      }}
    >
      {displayedProjects.map((post, index) => {
        const layout = getBentoLayout(index, displayedProjects.length);
        return (
          <div
            key={post.slug}
            style={{
              ...layout,
              minHeight: "280px",
            }}
          >
            <ProjectCard
              priority={index < 2}
              href={`/work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
              link={post.metadata.link || ""}
            />
          </div>
        );
      })}
    </div>
  );
}
