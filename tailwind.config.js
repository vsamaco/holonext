module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      screens: {
        'sm': '640px',
        'md': '768px',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
