import gradient from "@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient";
import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "background-gradient":
          "linear-gradient(to bottom, rgba(30, 32, 34, .3), rgba(33, 50, 91, .2))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-login-input":
          "linear-gradient(0deg, rgba(121, 116, 126, .16), rgba(121, 116, 126, .16)), linear-gradient(0deg, #DFE2EB, #DFE2EB)",
        cats: "url(path_to_image)",
      },
      height: {
        "screen-65": "calc(100vh - 65px)",
        "screen-145": "calc(100vh - 145px)",
      },
      boxShadow: {
        inner: "0px 0px 15px 0px #0000001C inset",
      },
    },
  },

  plugins: [],
});
export default config;
