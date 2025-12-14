"use client";

import { ProjectCard } from "@/components";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

type Post = {
  metadata: Metadata;
  slug: string;
  content: string;
};

interface ProjectsProps {
  posts: Post[];
}

export function Projects({ posts }: ProjectsProps) {
  const displayedProjects = posts;

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
    <>
      <style jsx>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
          grid-auto-rows: minmax(280px, auto);
          gap: clamp(1rem, 2vw, 1.5rem);
          width: 100%;
        }

        .bento-item {
          min-height: 280px;
        }

        /* Mobile: all items single column */
        @media (max-width: 768px) {
          .bento-item {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
          }
        }

        /* Tablet: allow some spanning */
        @media (min-width: 769px) and (max-width: 1024px) {
          .bento-item[data-span-col="2"] {
            grid-column: span 1;
          }
          .bento-item[data-span-row="2"] {
            grid-row: span 1;
          }
        }
      `}</style>
      <div className="bento-grid">
        {displayedProjects.map((post, index) => {
          const layout = getBentoLayout(index, displayedProjects.length);
          return (
            <div
              key={post.slug}
              className="bento-item"
              data-span-col={layout.gridColumn.includes("span 2") ? "2" : "1"}
              data-span-row={layout.gridRow.includes("span 2") ? "2" : "1"}
              style={layout}
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
    </>
  );
}
