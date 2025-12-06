# PWA Setup Instructions

## Icon Generation

The app requires two PNG icon files for PWA functionality:

- `public/icon-192x192.png` (192x192 pixels)
- `public/icon-512x512.png` (512x512 pixels)

### Option 1: Use the HTML Generator

1. Open `public/generate-icons.html` in your browser
2. The icons will be automatically downloaded
3. Move them to the `public` folder

### Option 2: Convert SVG to PNG

SVG icons have been created at:

- `public/icon-192.svg`
- `public/icon-512.svg`

Convert them using one of these methods:

**Using ImageMagick:**

```bash
convert public/icon-192.svg public/icon-192x192.png
convert public/icon-512.svg public/icon-512x512.png
```

**Using Online Converter:**

- Visit https://svgtopng.com/ or similar
- Upload the SVG files and download as PNG
- Rename to `icon-192x192.png` and `icon-512x512.png`

**Using Node.js with sharp:**

```bash
npm install sharp --save-dev
node -e "const sharp = require('sharp'); sharp('public/icon-192.svg').png().toFile('public/icon-192x192.png'); sharp('public/icon-512.svg').png().toFile('public/icon-512x512.png');"
```

## Testing PWA

1. Build the app: `npm run build`
2. Start the server: `npm start`
3. Open in Chrome/Edge and check for install prompt
4. Test offline functionality by going offline after first visit

## PWA Features

- ✅ Web App Manifest
- ✅ Service Worker for offline support
- ✅ Installable on mobile and desktop
- ✅ Theme color and icons configured
- ✅ Apple touch icon support
