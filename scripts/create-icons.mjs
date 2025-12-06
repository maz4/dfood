// Script to create PWA icons
// Run: node scripts/create-icons.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple base64 encoded 1x1 blue pixel PNG
// This is a placeholder - replace with actual icons
const createPlaceholderPNG = (size) => {
  // Create a simple blue square as base64
  // For a real implementation, use sharp or canvas library
  const canvas = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#3498db"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.floor(
        size * 0.4
      )}" fill="white" text-anchor="middle" dominant-baseline="middle">🐕</text>
    </svg>
  `;
  return canvas;
};

const publicDir = path.join(__dirname, "..", "public");

// Create SVG files that can be converted to PNG
const sizes = [192, 512];

sizes.forEach((size) => {
  const svg = createPlaceholderPNG(size);
  const svgPath = path.join(publicDir, `icon-${size}.svg`);
  fs.writeFileSync(svgPath, svg);
  console.log(`Created ${svgPath}`);
});

console.log("\nTo convert SVG to PNG, you can:");
console.log("1. Use an online converter: https://svgtopng.com/");
console.log("2. Use ImageMagick: convert icon-192.svg icon-192x192.png");
console.log("3. Use the generate-icons.html page in your browser");
console.log("\nOr install sharp and run: npm install sharp --save-dev");
