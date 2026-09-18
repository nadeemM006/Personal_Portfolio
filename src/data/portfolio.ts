export const IDENTITY = {
  name: 'Muhammad Nadeem',
  brand: 'Nadeem.',
  role: 'AI & Full-Stack Developer',
  tagline: 'BS Artificial Intelligence Student',
  location: 'Lahore, Pakistan',
  email: 'infowithnadeem@gmail.com',
  github: 'https://github.com/nadeemM006',
  linkedin: 'https://www.linkedin.com/in/muhammad-nadeem-240546389',
  status: 'Open to opportunities',
  year: '2026',
}

export const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export interface HeroPhrase {
  lines: [string, string]
  meta: string
  copy: string
  year: string
}

/** Phrases the pinned hero scrubs through as the visitor scrolls. */
export const HERO_PHRASES: HeroPhrase[] = [
  {
    lines: ['CREATIVE', 'DEVELOPER'],
    meta: 'TURNING IDEAS INTO REALITY',
    copy: 'Available for hire. Building fast, responsive web applications using modern tech stacks.',
    year: '2022',
  },
  {
    lines: ['SCALABLE', 'SYSTEMS'],
    meta: 'ROBUST BACKEND ARCHITECTURE',
    copy: 'Architecting backend pipelines, data models, and cloud-ready services that hold up under real load.',
    year: '2024',
  },
  {
    lines: ['AI-POWERED', 'PRODUCTS'],
    meta: 'INTELLIGENT SOFTWARE',
    copy: 'Designing AI products with LLMs, RAG pipelines, and automation workflows that do real work.',
    year: '2026',
  },
]

export const ABOUT_PARAGRAPH =
  "I'm a BS Artificial Intelligence student and AI & Full-Stack Developer dedicated to crafting clean, functional, and scalable applications. I specialize in high-performance architectures, intuitive user experiences, and AI-powered automation — turning ideas into working products while continuously learning."

export const ABOUT_CARDS = [
  { title: 'Full-Stack', sub: 'ARCHITECTURE' },
  { title: 'React & Node', sub: 'CORE TECH' },
  { title: 'AI & LLMs', sub: 'SPECIALTY' },
]

export const EXPERTISE = [
  {
    id: 'BOOT #1',
    title: 'Frontend Development',
    desc: 'Responsive, high-performance interfaces built with modern component architecture.',
    tag: 'React & Tailwind',
  },
  {
    id: 'BOOT #2',
    title: 'Backend Development',
    desc: 'Robust REST APIs, data pipelines, and database-driven services that scale.',
    tag: 'Node.js & Databases',
  },
  {
    id: 'BOOT #3',
    title: 'AI & Machine Learning',
    desc: 'Intelligent models, RAG pipelines, and automated AI-driven workflows.',
    tag: 'Generative AI & LLMs',
  },
  {
    id: 'BOOT #4',
    title: 'Automation & Integration',
    desc: 'Wiring agents, APIs, and services together with event-driven automation.',
    tag: 'n8n & Webhooks',
  },
]

export const STACK = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Node.js',
  'Express.js',
  'Python',
  'C++',
  'SQL',
  'PostgreSQL',
  'Supabase',
  'REST APIs',
  'Git & GitHub',
  'n8n',
  'Streamlit',
  'Tailwind CSS',
  'Machine Learning',
  'NLP',
  'Computer Vision',
  'Generative AI',
  'LLMs',
  'RAG',
  'Prompt Engineering',
  'Embeddings',
  'Vector Databases',
  'Webhooks',
]
