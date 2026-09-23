/**
 * CENTRAL DATA & CONTENT ARCHITECTURE
 * Chandrashekhar Jha — Portfolio Architecture
 */

export interface EducationInfo {
  degree: string;
  field: string;
  institution: string;
  location: string;
  status: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  focusArea: string;
  degree: string;
  location: string;
  coordinates: string;
  status: string;
  bio: string;
  education: EducationInfo;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  number: string;
  badge?: string;
}

export interface ProjectTechnology {
  name: string;
  category: 'core' | 'ai' | 'backend' | 'infra' | 'frontend';
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: 'AI Engineering' | 'Full-Stack' | 'Systems' | 'Experimental';
  year: string;
  featured: boolean;
  technologies: ProjectTechnology[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  media: {
    thumbnail: string;
    heroImage?: string;
    accentColor?: string;
  };
  metadata: {
    role: string;
    duration: string;
    impact?: string;
    architectureType?: string;
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  code: string;
  skills: Array<{
    name: string;
    proficiency: 'Core' | 'Advanced' | 'Exploring';
    note?: string;
  }>;
}

export interface Experiment {
  id: string;
  number: string;
  title: string;
  status: 'EXPERIMENT' | 'PROTOTYPE' | 'TESTING' | 'UNFINISHED' | 'ARCHIVE' | 'CONCEPT';
  category: string;
  description: string;
  year?: string;
  tags?: string[];
  link?: string;
  notes?: string[];
  escapedProjectRef?: {
    name: string;
    link: string;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon?: string;
}

export interface SiteConfig {
  personal: PersonalInfo;
  navigation: NavigationItem[];
  projects: Project[];
  skills: SkillCategory[];
  experiments: Experiment[];
  social: SocialLink[];
  contact: {
    email: string;
    availability: string;
    timezone: string;
    responseWindow: string;
  };
}

export const siteConfig: SiteConfig = {
  personal: {
    name: "Chandrashekhar Jha",
    shortName: "C. Jha",
    role: "Web Developer / Full-Stack Engineer",
    focusArea: "Full-Stack Web Engineering & Interactive System Architecture",
    degree: "B.Tech AI & Machine Learning Student",
    location: "India",
    coordinates: "INDIA",
    status: "Building Scalable Web Applications & Interactive Interfaces",
    bio: "B.Tech AI/ML student specializing in full-stack web engineering. Building responsive user interfaces, robust APIs, and interactive web applications with React, Node.js, Express, MongoDB, PostgreSQL, and TypeScript.",
    education: {
      degree: "B.Tech",
      field: "Artificial Intelligence & Machine Learning",
      institution: "JSPM University",
      location: "Wagholi, Pune, India",
      status: "Currently in 7th Semester",
    },
  },
  navigation: [
    { id: "overview", label: "HOME", path: "#overview", number: "01" },
    { id: "identity", label: "ABOUT", path: "#identity", number: "02" },
    { id: "work", label: "PROJECTS", path: "#work", number: "03", badge: "06" },
    { id: "stack", label: "SKILLS", path: "#stack", number: "04" },
    { id: "proof", label: "BACKGROUND", path: "#proof", number: "05" },
    { id: "contact", label: "CONTACT", path: "#contact", number: "06" },
  ],
  projects: [
    {
      id: "opsflow",
      slug: "opsflow",
      title: "OPSFLOW",
      tagline: "Full-Stack Operations Portal for Wholesale & Distribution Enterprises",
      description: "Combines customer management, inventory operations, sequential sales challans (CH-2026-XXXX), role-based access control (RBAC), audit logging, and automated client-side PDF invoice generation.",
      category: "Full-Stack",
      year: "2026",
      featured: true,
      technologies: [
        { name: "React 18", category: "frontend" },
        { name: "TypeScript", category: "core" },
        { name: "Node.js / Express", category: "backend" },
        { name: "Supabase PostgreSQL", category: "infra" },
        { name: "jsPDF", category: "core" },
        { name: "JWT & RBAC", category: "backend" },
      ],
      links: {
        live: "https://opsflow-psi.vercel.app/",
        github: "https://github.com/Chandrashekhar-jha/opsflow",
      },
      media: {
        thumbnail: "/assets/projects/opsflow.webp",
        accentColor: "#38bdf8",
      },
      metadata: {
        role: "FULL-STACK DEVELOPMENT",
        duration: "Full-Stack System",
        architectureType: "CUSTOMER → ORDER → CHALLAN → INVENTORY → INVOICE",
        impact: "RBAC: ADMIN | SALES | WAREHOUSE | ACCOUNTS",
      },
    },
    {
      id: "shopnest",
      slug: "shopnest",
      title: "SHOPNEST",
      tagline: "Full-Stack MERN E-Commerce Platform with Razorpay Payments",
      description: "Complete storefront with search & category filtering, JWT auth, product catalog, cart state management, Razorpay backend payment signature validation, Cloudinary image uploads, and admin inventory control.",
      category: "Full-Stack",
      year: "2025",
      featured: true,
      technologies: [
        { name: "React", category: "frontend" },
        { name: "Node.js / Express", category: "backend" },
        { name: "MongoDB / Mongoose", category: "backend" },
        { name: "Razorpay SDK", category: "infra" },
        { name: "Cloudinary / Multer", category: "infra" },
        { name: "Redux Toolkit", category: "frontend" },
      ],
      links: {
        live: "https://e-commerce-indol-omega-12.vercel.app/",
        github: "https://github.com/Chandrashekhar-jha/E-Commerce",
      },
      media: {
        thumbnail: "/assets/projects/shopnest.webp",
        accentColor: "#10b981",
      },
      metadata: {
        role: "FULL-STACK DEVELOPMENT",
        duration: "MERN / Commerce",
        architectureType: "PRODUCT → CART → CHECKOUT → PAYMENT → ORDER → INVENTORY",
      },
    },
    {
      id: "valyrian-web",
      slug: "valyrian-web",
      title: "VALYRIAN WEB",
      tagline: "Electron Desktop Browser & Experimental AI Search Engine",
      description: "Custom desktop browser built with Electron.js experimenting with Intent Engine search parsing, session context memory, site credibility/reputation signaling, reader mode, and custom tab navigation.",
      category: "Systems",
      year: "2025",
      featured: true,
      technologies: [
        { name: "Electron.js", category: "infra" },
        { name: "JavaScript / HTML / CSS", category: "frontend" },
        { name: "Google Gemini API", category: "ai" },
        { name: "DuckDuckGo API", category: "core" },
        { name: "Electron Builder", category: "infra" },
      ],
      links: {
        github: "https://github.com/Chandrashekhar-jha/Valyrian-Web",
      },
      media: {
        thumbnail: "/assets/projects/valyrian.webp",
        accentColor: "#f59e0b",
      },
      metadata: {
        role: "SOLE DEVELOPER",
        duration: "Desktop Software",
        architectureType: "DESKTOP BROWSER / INTENT ENGINE",
      },
    },
    {
      id: "smartchain-ai",
      slug: "smartchain-ai",
      title: "SMARTCHAIN AI",
      tagline: "Supply Chain Intelligence & 3PL Orchestration Web Interface",
      description: "Four-person final-year team project consolidating control towers, supplier/buyer interfaces, vehicle tracking, capacity monitoring, and perishable goods expiry risk visualization into a high-density frontend dashboard.",
      category: "Full-Stack",
      year: "2025",
      featured: true,
      technologies: [
        { name: "React", category: "frontend" },
        { name: "Vite", category: "core" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "React Router", category: "frontend" },
        { name: "Supabase", category: "infra" },
      ],
      links: {
        live: "https://smart-chain-ai-nu.vercel.app/",
      },
      media: {
        thumbnail: "/assets/projects/smartchain.webp",
        accentColor: "#a855f7",
      },
      metadata: {
        role: "FRONTEND / WEB INTERFACE (TEAM PROJECT)",
        duration: "Web Platform",
        architectureType: "CONTROL TOWER → INVENTORY → VEHICLE TRACKING",
        impact: "TEMPORARY LIVE DEPLOYMENT // DEMO DATA (50k kg stock, 78% capacity)",
      },
    },
    {
      id: "bathroom-talk",
      slug: "bathroom-talk",
      title: "BATHROOM TALK",
      tagline: "Next.js Web Platform for Anonymous Social Conversations",
      description: "Modern, responsive web application exploring anonymous interaction concepts, dynamic Next.js route navigation, and mobile-friendly component layouts.",
      category: "Experimental",
      year: "2024",
      featured: false,
      technologies: [
        { name: "Next.js", category: "frontend" },
        { name: "React", category: "frontend" },
        { name: "Tailwind CSS", category: "frontend" },
        { name: "TypeScript", category: "core" },
      ],
      links: {
        live: "https://bathroom-talk.vercel.app/",
      },
      media: {
        thumbnail: "/assets/projects/bathroom-talk.webp",
        accentColor: "#64748b",
      },
      metadata: {
        role: "SOLE DEVELOPER",
        duration: "Web Application",
        architectureType: "NEXT.JS / ANONYMOUS PLATFORM",
      },
    },
    {
      id: "edusity",
      slug: "edusity",
      title: "EDUSITY",
      tagline: "First React Learning Project — College Landing Page",
      description: "Frontend-only college website created while learning React. Demonstrates early milestones in component structure, CSS layout, and state management.",
      category: "Experimental",
      year: "2024",
      featured: false,
      technologies: [
        { name: "React", category: "frontend" },
        { name: "JavaScript", category: "core" },
        { name: "CSS3", category: "frontend" },
      ],
      links: {
        live: "https://edusity8966.vercel.app/",
      },
      media: {
        thumbnail: "/assets/projects/edusity.webp",
        accentColor: "#475569",
      },
      metadata: {
        role: "FIRST REACT LEARNING PROJECT",
        duration: "Frontend Only",
        architectureType: "REACT FRONTEND LANDING PAGE",
      },
    },
  ],
  skills: [
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      code: "MODELS_01",
      skills: [
        { name: "PyTorch / TensorFlow", proficiency: "Advanced" },
        { name: "LLM Architectures & RAG", proficiency: "Core" },
        { name: "Agentic Workflows (LangChain/AutoGPT)", proficiency: "Core" },
        { name: "Computer Vision (OpenCV)", proficiency: "Advanced" },
      ],
    },
    {
      id: "fullstack",
      title: "Full-Stack Architecture",
      code: "STACK_02",
      skills: [
        { name: "React / Next.js / TypeScript", proficiency: "Core" },
        { name: "Node.js / Express / REST / GraphQL", proficiency: "Core" },
        { name: "MongoDB / PostgreSQL / Redis", proficiency: "Core" },
        { name: "Tailwind CSS & CSS Systems", proficiency: "Core" },
      ],
    },
  ],
  experiments: [
    {
      id: "exp-01",
      number: "01",
      title: "BROWSER / AGAIN",
      status: "EXPERIMENT",
      category: "INTERACTION / DESKTOP",
      description: "A personal exploration into what a browser could feel like when the interface is treated as part of the experience rather than just a container for web pages.",
      year: "2025",
      tags: ["Electron", "Browser UI", "Intent Parsing"],
      escapedProjectRef: {
        name: "VALYRIAN WEB",
        link: "https://github.com/Chandrashekhar-jha/Valyrian-Web",
      },
    },
    {
      id: "exp-02",
      number: "02",
      title: "INTERFACE WITHOUT CARDS",
      status: "PROTOTYPE",
      category: "UI / LAYOUT",
      description: "An exploration of structuring complex information using pure typography, architectural lines, whitespace, and visual positioning rather than conventional card-grid patterns.",
      year: "2026",
      tags: ["Typography", "Grid", "Asymmetry"],
    },
    {
      id: "exp-03",
      number: "03",
      title: "CURSOR / OBJECT",
      status: "EXPERIMENT",
      category: "INTERACTION",
      description: "A contextual interaction engine where the cursor adapts its physical representation based on the object it encounters (TEXT, POINTER, PROJECT, CROSSHAIR).",
      year: "2026",
      tags: ["Physics", "Cursor", "Feedback"],
    },
    {
      id: "exp-04",
      number: "04",
      title: "SCROLL AS INPUT",
      status: "PROTOTYPE",
      category: "MOTION / INTERACTION",
      description: "An experiment exploring vertical scroll position as a continuous input variable influencing scale, opacity, line expansion, and information density.",
      year: "2026",
      tags: ["Framer Motion", "Scroll", "Parallax"],
    },
    {
      id: "exp-05",
      number: "05",
      title: "SYSTEM / 001",
      status: "UNFINISHED",
      category: "SYSTEM / VISUALIZATION",
      description: "A technical diagram composition exploring data flow pipelines across system nodes, leaving an intentional UNKNOWN node unresolved.",
      year: "2026",
      tags: ["Node Graph", "Unresolved", "Blueprint"],
    },
    {
      id: "exp-06",
      number: "06",
      title: "FAILED IDEAS & LAB NOTES",
      status: "ARCHIVE",
      category: "ARCHIVE / LAB NOTES",
      description: "An interactive log of discarded concepts and lessons learned during development iterations.",
      year: "2025-2026",
      notes: [
        "Too much motion. Distracted from content.",
        "Looked good. Explained nothing.",
        "Technically interesting. Completely unnecessary.",
        "Started as a feature. Became a problem.",
        "Removed in refactor.",
      ],
    },
  ],
  social: [
    { platform: "GitHub", url: "https://github.com/Chandrashekhar-jha", handle: "@chandrashekhar-jha" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/chandrashekhar-jha-b95240285/?isSelfProfile=true", handle: "chandrashekhar-jha" },
  ],
  contact: {
    email: "contact@chandrashekharjha.dev",
    availability: "Open for AI Engineering & Full-Stack Collaborations",
    timezone: "IST (UTC +5:30)",
    responseWindow: "Within 24 Hours",
  },
};
