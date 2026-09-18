/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#1B1A17',
        paper: '#F7F4EE',
        amber: '#E8A33D',
        teal: '#3E6259',
        rust: '#B5533C',
        line: '#D9D3C4',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
