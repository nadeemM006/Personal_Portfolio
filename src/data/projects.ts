export interface Project {
  id: string
  index: string
  title: string
  summary: string
  role: string
  year: string
  stack: string[]
  color: string
}

export const projects: Project[] = [
  {
    id: 'mediflow-ai',
    index: '01',
    title: 'MediFlow AI',
    summary: 'An AI-powered hospital assistant for healthcare information, appointments, reports, prescriptions, and hospital services.',
    role: 'AI / Full-Stack Project',
    year: 'Featured',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'n8n', 'RAG', 'AI APIs'],
    color: '#a78bfa',
  },
  {
    id: 'ayafind',
    index: '02',
    title: 'AyaFind',
    summary: 'An AI-powered platform designed to help users find and discover relevant services and information through an intelligent, user-friendly interface.',
    role: 'AI / Frontend Project',
    year: 'Featured',
    stack: ['React', 'JavaScript', 'AI / LLMs', 'APIs'],
    color: '#22d3ee',
  },
  {
    id: 'pucit-ai-hub',
    index: '03',
    title: 'PUCIT AI Hub',
    summary: 'A centralized platform for BS-AI students to access courses, resources, faculty information, blogs, and academic content.',
    role: 'Academic Platform',
    year: 'Featured',
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: '#f59e0b',
  },
  {
    id: 'personal-ai-assistant',
    index: '04',
    title: 'Personal AI Assistant',
    summary: 'An AI assistant integrating chat, email management, calendar events, tasks, notes, and expense tracking through automation workflows.',
    role: 'AI / Automation Project',
    year: 'Featured',
    stack: ['Python', 'Streamlit', 'n8n', 'Webhooks', 'AI / LLMs'],
    color: '#34d399',
  },
  {
    id: 'mini-os',
    index: '05',
    title: 'Mini Operating System Simulation',
    summary: 'A console-based operating system simulation featuring authentication, file management, terminal commands, calculator, notepad, games, and command history.',
    role: 'Systems / C++ Project',
    year: 'Featured',
    stack: ['C++'],
    color: '#fb7185',
  },
]
