import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#f6911d',
        ink: '#15171a',
      },
      fontFamily: {
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        sans: ['var(--font-mulish)', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
