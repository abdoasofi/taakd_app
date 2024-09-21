module.exports = {
  presets: [require('frappe-ui/src/utils/tailwind.config')],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,  // This applies `m-auto` to center the container
        padding: {
          DEFAULT: '1rem', // Adds padding to the container, adjust as needed
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1400px",
      },
      fontFamily: {
        sans: ["poppins", "ui-sans-serif", "system-ui"],
      },
      colors: {
        bg: "#f6f6f6", // Custom primary color
        more_lighter_gray: "#E8E7E7", // Custom primary color
        lighter_gray: "#e6e6e6", // Custom primary color
        light_gray: "#D8D8D8", // Custom primary color
        mid_gray: "#969696", // Custom primary color
        overlay: "#00000080", // Custom primary color
        dark_gray: "#49454F", // Custom primary color
        darkest_gray: "#322F35", // Custom primary color
        secondary: "#81C045", // Custom secondary color
        // secondary_30: '#81C045', // Custom secondary color
        secondary_hover: "#9ACB6A", // Custom secondary color
        primary: "#3F4457", // Custom secondary color
        info: "#81C04529", // Custom secondary color
        warn: "#BA3939", // Custom secondary color
        // warn_20%: '#BA3939', // Custom secondary color
        warn_hover: "#BA393914", // Custom secondary color
        warn_hover_2: "#C25252", // Custom secondary color
        hover: "#81C0451A", // Custom secondary color
        strong: "#00a67e", // Custom secondary color
        // Custom secondary color
      },
    },
  },
  plugins: [],
}
