// This script generates placeholder icons for PWA
// In production, you should replace these with actual designed icons

const fs = require("fs");
const path = require("path");

// Create a simple SVG icon
const createIconSVG = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3498db"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${
    size * 0.3
  }" fill="white" text-anchor="middle" dominant-baseline="middle">🐕</text>
</svg>`;
};

// For now, we'll create a simple HTML file that can be converted to PNG
// In production, use a tool like sharp or ImageMagick to convert SVG to PNG
// Or use an online tool to create proper icons

const publicDir = path.join(__dirname, "..", "public");

// Create icon placeholders as SVG (you'll need to convert these to PNG)
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create SVG icons (these need to be converted to PNG for PWA)
fs.writeFileSync(path.join(publicDir, "icon-192.svg"), createIconSVG(192));

fs.writeFileSync(path.join(publicDir, "icon-512.svg"), createIconSVG(512));

console.log("Icon SVGs created. Please convert them to PNG format:");
console.log("1. icon-192.svg -> icon-192x192.png");
console.log("2. icon-512.svg -> icon-512x512.png");
console.log("You can use an online converter or ImageMagick:");
console.log("  convert icon-192.svg icon-192x192.png");
console.log("  convert icon-512.svg icon-512x512.png");
