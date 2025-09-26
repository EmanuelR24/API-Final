// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f0f',
        'dark-card': '#1a1a1a',
        'purple-accent': '#8b5cf6',
        'purple-hover': '#7c3aed',
        'soft-white': '#f8fafc',
        'light-gray': '#64748b',
        'border-gray': '#334155'
      }
    },
  },
  plugins: [],
}