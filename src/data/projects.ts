export interface Project {
  id: string
  index: string // e.g. "01" — used because these ARE a sequence, listed in order
  title: string
  summary: string
  role: string
  year: string
  stack: string[]
  color: string // accent used for this project's panel
}

export const projects: Project[] = [
  {
    id: 'northwind-dashboard',
    index: '01',
    title: 'Northwind Analytics Dashboard',
    summary:
      'A real-time operations dashboard for a logistics team, rebuilt around one question per screen instead of a wall of charts.',
    role: 'Product design & frontend build',
    year: '2025',
    stack: ['React', 'TypeScript', 'D3', 'Tailwind CSS'],
    color: '#3E6259',
  },
  {
    id: 'fieldnote',
    index: '02',
    title: 'Fieldnote — Research Capture App',
    summary:
      'A note-taking tool for field researchers that works offline first, syncing photos, audio, and geotags when connection returns.',
    role: 'End-to-end design & development',
    year: '2024',
    stack: ['React Native', 'TypeScript', 'SQLite'],
    color: '#B5533C',
  },
  {
    id: 'atlas-commerce',
    index: '03',
    title: 'Atlas — Storefront Motion System',
    summary:
      'A scroll-driven product storytelling system for a homeware brand, built around restraint: one animated moment per page, not per element.',
    role: 'Motion design & frontend implementation',
    year: '2024',
    stack: ['React', 'GSAP', 'Tailwind CSS'],
    color: '#E8A33D',
  },
]
