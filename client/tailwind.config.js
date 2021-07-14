module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: [
        /^bg-gradient-to-\w+/,
        /^from-\w+/,
        /^to-\w+/,
        /^via-\w+/,
        /^bg-\w+/,
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
