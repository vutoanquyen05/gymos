import { colors, typography, spacing } from '../../packages/design-tokens/src/index';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        semantic: colors.semantic,
      },
      fontFamily: {
        sans: typography.fontFamily.sans,
      },
      spacing: spacing,
    },
  },
  plugins: [],
};
