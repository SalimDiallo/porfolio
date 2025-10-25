import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Sidy Mohamed Salim",
  lastName: "Diallo",
  name: "Salim Diallo",
  role: "Data IA et Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "sidymamadousalim@gmail.com",
  location: "Africa/Casablanca", // Identifiant de fuseau horaire IANA pour Rabat, Maroc
  languages: ["Français", "Anglais"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Abonnez-vous à la newsletter de {person.firstName}</>,
  description: <>Retours d'expérience en software engineering, data science et développement moderne</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/salimdiallo",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/sidy-mohamed-salim-diallo-855696264/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Accueil",
  title: `Portfolio de ${person.name}`,
  description: `Site portfolio présentant mon travail en tant que ${person.role}`,
  headline: <>Construire des solutions innovantes grâce à la data, l'IA et le software engineering</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Projet à la une</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Réalisations récentes
        </Text>
      </Row>
    ),
    href: "/work/louratech",
  },
  subline: (
    <>
      Je suis Salim Diallo, Data et Software Engineer spécialisé dans les applications web modernes,
      <br /> le data engineering, et des solutions boostées par l'IA. Je réalise actuellement des projets innovants
      <br /> qui relient technologie et besoins réels des entreprises.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "À propos",
  title: `À propos – ${person.name}`,
  description: `Rencontrez ${person.name}, ${person.role} basé à ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/sidy-mohamed-salim-diallo-nkvfem/30min?overlayCalendar=true",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Salim est un Data et Software Engineer basé à Rabat, passionné par la création d'applications modernes et performantes. Formé à l'Institut National de Statistique et d'Économie Appliquée (INSEA) et fort d'une expérience au Haut Commissariat au Plan, il se spécialise dans le full-stack development, le data engineering et les solutions IA.
      </>
    ),
  },
  work: {
    display: true,
    title: "Expériences professionnelles",
    experiences: [
      {
        company: "Projets Freelance",
        timeframe: "2022 - Présent",
        role: "Data, IA et Full-Stack Developer",
        achievements: [
          <>
            Réalisation de solutions web sur mesure pour divers clients, dont des agences de voyage et des systèmes de gestion d'entreprise.
          </>,
          <>
            Développement d'applications IA pour l'extraction automatisée de données et l'assistance intelligente aux études, comprenant le scraping et le nettoyage de données.
          </>,
        ],
        images: [],
      },
      {
        company: "Moroccan Collegiate Programming Contest 2025",
        timeframe: "Novembre 2025",
        role: "Problem Solving Contestant",
        achievements: [
          <>
            Participation au concours national de programmation, résolution de problèmes algorithmiques et informatiques complexes sous contraintes de temps.
          </>,
          <>
            Renforcement des compétences en travail d'équipe, communication et pensée critique à travers la résolution collaborative et en temps réel de problèmes.
          </>,
          <>
            Acquisition d'une expérience pratique des stratégies de competitive programming et des dernières techniques de résolution de problèmes.
          </>,
        ],
        images: [],
      },
      {
        company: "Haut Commissariat au Plan",
        timeframe: "Juillet 2025",
        role: "Stage de découverte du monde professionnel",
        achievements: [
          <>
            Découverte des rouages d'une administration centrale à travers l'observation et la participation à des missions au Haut Commissariat au Plan.
          </>,
          <>
            Première expérience avec des outils statistiques, des technologies de l'information et des processus de gestion des données au sein de l'organisation.
          </>
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Études",
    institutions: [
      {
        name: "Institut National de Statistique et d'Économie Appliquée (INSEA)",
        description: <>Spécialisation en Data et Software Engineering, axée sur les pratiques de développement moderne et la data science.</>,
      },
      {
        name: "Formation continue",
        description: <>Auto-apprentissage de l'IA (RAG, fine-tuning, LLMs), automatisation avec n8n, et travail avec des frameworks tels que Django et Next.js.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Compétences techniques",
    skills: [
      {
        title: "Full-Stack Development",
        description: (
          <>Construction d'applications web modernes avec Django, Next.js, TypeScript et Tailwind CSS</>
        ),
        tags: [
          {
            name: "Django",
            icon: "django",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        title: "Data Engineering & AI",
        description: (
          <>Travail en Python, scraping de data, pipelines ETL et conception d'applications IA utilisant le fine-tuning, le Retrieval-Augmented Generation (RAG), le Model Context Protocol (MCP), et plus.</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "SQL",
            icon: "sql",
          },
        ],
        images: [],
      },
      {
        title: "Base de données & Cloud",
        description: (
          <>Expérience avec PostgreSQL, MongoDB, Firebase et les plateformes cloud modernes.</>
        ),
        tags: [
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "MongoDB",
            icon: "mongodb",
          },
          {
            name: "Oracle",
            icon: "oracle",
          },
        ],
        images: [],
      },
      {
        title: "Automatisation & Intégration",
        description: (
          <>Création de workflows automatisés dans N8N avec l'API Notion, intégration Gmail et bots Telegram.</>
        ),
        tags: [
          {
            name: "API",
            icon: "api",
          },
          {
            name: "N8N",
            icon: "n8n",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Écriture sur le développement, la data et la technologie...",
  description: `Lisez ce que ${person.name} fait récemment`,
};

const work: Work = {
  path: "/work",
  label: "Projets",
  title: `Projets – ${person.name}`,
  description: `Projets software et data réalisés par ${person.name}`,
  // Exemples de projets en portfolio :
  // - Application de gestion d'agence (gestion client/employé/projet)
  // - Site web d'agence de voyage (tours au Sénégal avec réservation en ligne)
  // - Portfolio personnel
  // - Car Data Scraper (stockage base de données)
  // - AI Study Assistant (flashcards intelligentes)
  // - Automation Gmail vers Notion
  // - Crypto Price Tracker (suivi temps réel)
  // - Bot d'envoi de masse Telegram
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galerie",
  title: `Galerie photo – ${person.name}`,
  description: `Collection de photos par ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };