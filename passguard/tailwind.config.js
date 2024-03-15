/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,js,tsx}",
		"node_modules/flowbite-react/lib/esm/**/*.js",
	],
	theme: {
		extend: {
			fontFamily: {
				nunito: ["Nunito", "sans-serif"],
				roboto: ["Roboto", "sans-serif"],
			},
			colors: {
				yellow: {
					400: "#facc15",
				},
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
