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
				blue: {
					999: "rgb(55 65 81 / 1)"
				},
				darkwhite: {
					999: "#F5F5F5"
				}
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
