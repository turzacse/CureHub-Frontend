
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         gradientAnimation: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' },
//         },
//       },
//       animation: {
//         gradient: 'gradientAnimation 5s ease infinite',
//       },
//       backgroundImage: {
//         gradient: 'linear-gradient(270deg, #0066cc, #00cc99, #ffcc00, #ff3366)',
//       },
//     },
//   },
//   plugins: [
//     require('daisyui'),
//   ],
// }



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradientAnimation: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        gradient: 'gradientAnimation 5s ease infinite',
        scroll: 'scroll 20s linear infinite',
      },
      backgroundImage: {
        gradient: 'linear-gradient(270deg, #0066cc, #00cc99, #ffcc00, #ff3366)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
