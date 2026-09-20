/**
 * Single source of truth for every piece of content on the site.
 * Everything below comes from the resume PDF. Nothing is invented.
 * To update the site, edit this file (and replace public/Hariom_Kumar_Resume.pdf).
 */

const base = import.meta.env.BASE_URL

export const site = {
  name: 'Hariom Kumar',
  initials: 'HK',
  title: 'Final-year CSE (AI & ML) Student',
  focus: 'Python, Java, SQL, machine learning and full-stack development',
  intro:
    'Final-year B.Tech CSE (AI & ML) student at Galgotias University. I work with Python, Java, SQL and machine learning, build full-stack applications, and apply AI/ML techniques to real-world problems.',
  location: 'Greater Noida, Uttar Pradesh - 201306, India',
  shortLocation: 'Greater Noida, India',
  email: 'hariomkumarnke25@gmail.com',
  phone: '+91-7488748349',
  /** Set to false if you'd rather not publish your phone number on the site. */
  showPhone: true,
  links: {
    linkedin: 'https://www.linkedin.com/in/hariom-kumar-68b82b2ab',
    github: 'https://github.com/Hariomxlx',
    leetcode: 'https://leetcode.com/u/Hariom49/',
  },
  resume: {
    href: `${base}Hariom_Kumar_Resume.pdf`,
    fileName: 'Hariom_Kumar_Resume.pdf',
  },
  photo: {
    small: `${base}images/hariom-640.webp`,
    large: `${base}images/hariom-1024.webp`,
    alt: 'Portrait of Hariom Kumar in a navy suit and striped tie',
  },
} as const

/** Order matters: it drives the scroll-linked 3D scene as well as the navigation. */
export const sectionIds = [
  'home',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'certifications',
  'contact',
] as const

export type SectionId = (typeof sectionIds)[number]

export const navItems: { id: SectionId; label: string; alsoActiveOn?: SectionId }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education', alsoActiveOn: 'certifications' },
  { id: 'contact', label: 'Contact' },
]

export const heroFacts = [
  { title: 'B.Tech CSE (AI & ML)', detail: 'Galgotias University' },
  { title: 'Intern at Infosys', detail: 'August – October 2025' },
  { title: 'CGPA 8.75 / 10.00', detail: 'Since October 2023' },
] as const

export const about = {
  lede: 'A final-year CSE (AI & ML) student who builds software and applies machine learning to real-world problems.',
  background: {
    text: 'Final-year B.Tech student in CSE (AI & ML) at Galgotias University, Greater Noida.',
    facts: [
      { label: 'Degree', value: 'B.Tech CSE (AI & ML)' },
      { label: 'Studying since', value: 'October 2023' },
      { label: 'CGPA', value: '8.75 / 10.00' },
      { label: 'Based in', value: 'Greater Noida, India' },
    ],
  },
  focus:
    'Developing and testing software applications, working with REST APIs and databases, and applying AI/ML techniques to real-world problems.',
  interests: 'Problem-solving, Generative AI, and building scalable technology solutions.',
  foundations: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'SDLC'],
  strengths: ['Leadership', 'Teamwork', 'Problem-Solving', 'Communication'],
} as const

export const experience = [
  {
    id: 'infosys',
    company: 'Infosys',
    role: 'Intern',
    period: 'August 2025 – October 2025',
    bullets: [
      'Gained practical exposure to professional workflows, collaborative development, and project execution.',
      'Worked on AI/ML-based projects applying data preprocessing, model building, and performance evaluation to solve real-world problems.',
    ],
    workflow: ['Data preprocessing', 'Model building', 'Performance evaluation'],
  },
] as const

export type ProjectCategory = 'ai-ml' | 'full-stack'

export type Project = {
  id: string
  name: string
  period: string
  category: ProjectCategory
  summary: string
  tools: readonly string[]
  features: readonly string[]
  /** Heading above the detail list. Resume-written entries use "My contribution". */
  detailsHeading?: string
  details: readonly string[]
  github: string
  demo?: string
  /** Which schematic to draw. Every diagram only uses words from the project's own description. */
  preview:
    | { kind: 'usis' }
    | { kind: 'stack'; label: string; layers: readonly { title: string; body: string }[] }
}

export const projectFilters: readonly { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All projects' },
  { id: 'ai-ml', label: 'AI & ML' },
  { id: 'full-stack', label: 'Full-stack' },
]

/** Newest first. Repository details come from each project's own README on GitHub. */
export const projects: readonly Project[] = [
  {
    id: 'pathai',
    name: 'PathAI',
    period: 'August 2026',
    category: 'full-stack',
    summary:
      'A career guidance and personalised learning platform that shows learners which skills they have, which they are missing, and what to learn next.',
    tools: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    features: ['Skill gap analysis', 'Assessments', 'Learning paths', 'Progress tracking', 'Recommendations'],
    detailsHeading: 'What it does',
    details: [
      'Brings career exploration, skill gap analysis, assessments, personalised learning paths and progress tracking into one application.',
      'Includes registration and login, onboarding, a dashboard, an AI assistant interface, project recommendations and settings.',
      'React frontend deployed on Vercel; Node.js and Express backend with MongoDB, deployed on Render.',
    ],
    github: 'https://github.com/Hariomxlx/PathAi',
    demo: 'https://path-ai-roan.vercel.app',
    preview: {
      kind: 'stack',
      label: 'Diagram: PathAI moves a learner from onboarding to skill analysis to a tracked learning path.',
      layers: [
        { title: 'Onboarding', body: 'Register, log in, get set up' },
        { title: 'Skill gap analysis and assessments', body: 'What you know, what is missing' },
        { title: 'Learning path and progress', body: 'A roadmap you can track' },
      ],
    },
  },
  {
    id: 'covid-xai',
    name: 'COVID-19 Chest X-Ray Classification with Explainable AI',
    period: 'June 2026',
    category: 'ai-ml',
    summary:
      'Deep learning models that classify chest X-rays as COVID-19, Normal or Viral Pneumonia, with heatmaps showing which regions drove each prediction.',
    tools: ['Python', 'PyTorch', 'DenseNet-121', 'Vision Transformer', 'Grad-CAM', 'Integrated Gradients'],
    features: ['DenseNet-121', 'Vision Transformer', 'Grad-CAM', 'Integrated Gradients', 'Attention Rollout'],
    detailsHeading: 'What it does',
    details: [
      'Compares DenseNet-121 and a Vision Transformer (ViT-Base) on a chest X-ray dataset of 4,035 images.',
      'DenseNet-121 reached 99.54% accuracy on the test set.',
      'Explains predictions with Grad-CAM, Integrated Gradients and ViT Attention Rollout, and compares the methods using entropy, insertion, deletion and AOPC.',
    ],
    github: 'https://github.com/Hariomxlx/COVID19-XRay-Classification-XAI',
    preview: {
      kind: 'stack',
      label: 'Diagram: a chest X-ray goes through classifiers, then explainability heatmaps.',
      layers: [
        { title: 'Chest X-ray', body: 'COVID-19, Normal or Viral Pneumonia' },
        { title: 'DenseNet-121 and Vision Transformer', body: 'Image classification' },
        { title: 'Explainability heatmaps', body: 'Grad-CAM, Integrated Gradients, Attention Rollout' },
      ],
    },
  },
  {
    id: 'usis',
    name: 'University Student Information System (USIS)',
    period: 'April 2026 – June 2026',
    category: 'full-stack',
    summary:
      'A full-stack university management platform with role-based access for Students, Mentors, and Administrators.',
    tools: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Vite'],
    features: ['Attendance tracking', 'Grade management', 'Grievance handling', 'Real-time chat', 'Academic records'],
    details: [
      'Developed a full-stack university management platform with role-based access for Students, Mentors, and Administrators.',
      'Implemented and integrated features including attendance tracking, grade management, grievance handling, real-time chat, and academic record management.',
      'Tested different user workflows, authentication scenarios, API responses, and role-based access to identify and resolve application issues.',
    ],
    github: 'https://github.com/Hariomxlx/Student-information-System',
    demo: 'https://student-information-system-inky.vercel.app',
    preview: { kind: 'usis' },
  },
  {
    id: 'rag',
    name: 'RAG Hallucination Reducer',
    period: 'April 2026',
    category: 'ai-ml',
    summary:
      'A web app that grounds language-model answers in retrieved context to reduce hallucinations, and scores how well each answer matches its source.',
    tools: ['Python', 'FastAPI', 'FAISS', 'Sentence Transformers', 'OpenAI API', 'React.js', 'Vite'],
    features: ['Context retrieval', 'Grounded answers', 'Grounding score', 'Dashboard UI'],
    detailsHeading: 'What it does',
    details: [
      'Retrieves relevant context with FAISS and Sentence Transformers (all-MiniLM-L6-v2), then generates the answer from that context using an OpenAI model.',
      'Compares each answer with its context to assign a grounding score, which helps spot hallucinations.',
      'FastAPI backend with a React and Vite dashboard.',
    ],
    github: 'https://github.com/Hariomxlx/RAG--Hallucination--Reducer',
    preview: {
      kind: 'stack',
      label: 'Diagram: retrieve context, generate an answer from it, then score how well it is grounded.',
      layers: [
        { title: 'Retrieve', body: 'FAISS and Sentence Transformers find context' },
        { title: 'Generate', body: 'An OpenAI model answers from that context' },
        { title: 'Score', body: 'A grounding score compares answer and context' },
      ],
    },
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    period: 'July 2025 – August 2025',
    category: 'full-stack',
    summary:
      'A full-stack e-commerce platform built with Spring Boot and MySQL, covering products, users, cart and orders.',
    tools: ['Java', 'Spring Boot', 'MySQL'],
    features: ['Product management', 'User authentication', 'Shopping cart', 'Order processing'],
    details: [
      'Built a full-stack e-commerce platform with Spring Boot and MySQL, implementing product management, user authentication, shopping cart, and order processing functionalities.',
      'Created responsive interfaces and structured workflows for browsing products, adding items to cart, and placing orders efficiently.',
      'Developed reusable backend components and RESTful services for smooth integration between application modules and database systems.',
    ],
    github: 'https://github.com/Hariomxlx/e-commerce',
    preview: {
      kind: 'stack',
      label: 'Diagram: a storefront on top of Spring Boot REST services and a MySQL database.',
      layers: [
        { title: 'Storefront', body: 'Browse products, add to cart, place orders' },
        { title: 'RESTful services', body: 'Spring Boot backend components' },
        { title: 'Database', body: 'MySQL' },
      ],
    },
  },
]

export const skillGroups = [
  { name: 'Programming Languages', items: ['Python', 'Java', 'SQL'] },
  {
    name: 'CS Fundamentals',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'SDLC'],
  },
  {
    name: 'AI & Machine Learning',
    items: [
      'TensorFlow',
      'PyTorch',
      'scikit-learn',
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Generative AI',
      'Prompt Engineering',
    ],
  },
  { name: 'Web Technologies', items: ['HTML', 'JavaScript', 'CSS', 'React.js'] },
  { name: 'Database Systems', items: ['MySQL', 'MongoDB'] },
  { name: 'Soft Skills', items: ['Leadership', 'Teamwork', 'Problem-Solving', 'Communication'] },
] as const

export const education = [
  {
    id: 'galgotias',
    degree: 'B.Tech CSE (AI & ML)',
    institution: 'Galgotias University',
    place: 'Greater Noida, India',
    period: 'October 2023 – Present',
    current: true,
    score: { label: 'CGPA', value: '8.75 / 10.00' },
  },
  {
    id: 'intermediate',
    degree: 'Intermediate',
    institution: 'T.P. Verma College (BSEB)',
    place: 'Narkatiaganj, W. Champaran, India',
    period: 'April 2022 – May 2023',
    current: false,
    score: { label: 'Percentage', value: '83.5%' },
  },
  {
    id: 'high-school',
    degree: 'High School',
    institution: 'SPS Balhn More Areraj (CBSE)',
    place: 'Motihari, E. Champaran, India',
    period: 'April 2020 – April 2021',
    current: false,
    score: { label: 'Percentage', value: '81%' },
  },
] as const

export type Certification = {
  id: string
  issuer: string
  title: string
  detail: string | null
  date: string
  score?: string
}

/** Newest first. */
export const certifications: readonly Certification[] = [
  { id: 'aws', issuer: 'AWS Training', title: 'AWS Cloud Essentials', detail: 'Certification', date: 'May 2026' },
  { id: 'nptel', issuer: 'NPTEL', title: 'Software Engineering', detail: null, date: 'April 2026' },
  {
    id: 'amcat',
    issuer: 'AMCAT',
    title: 'English Communication Assessment',
    detail: 'Assessment score',
    score: '613 / 800',
    date: 'January 2026',
  },
  {
    id: 'guvi',
    issuer: 'GUVI, HCL and Intel',
    title: 'Generative AI Workshop',
    detail: 'Held at IIT Delhi',
    date: 'March 2025',
  },
  { id: 'oracle', issuer: 'Oracle', title: 'Database Design', detail: null, date: 'November 2024' },
]
