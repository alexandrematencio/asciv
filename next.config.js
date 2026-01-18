/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
	turbopack: {
		// Ensure Turbopack resolves the project root correctly when multiple lockfiles exist
		root: __dirname,
	},
	// Keep other defaults
};

module.exports = nextConfig;