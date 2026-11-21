const { colors, spacing } = require('../../packages/design-tokens/src/index');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        neutral: colors.neutral,
        semantic: colors.semantic,
      },
      spacing: spacing,
    },
  },
  plugins: [],
};
