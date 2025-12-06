# 🐕 Dog Food Calculator

[dfood live page](https://maz4.github.io/dfood/)

A Next.js Progressive Web App (PWA) to calculate the appropriate amount of dog food based on your dog's age, weight, and other factors.

## Features

- Calculate food amounts for dry food only or dry food with sachet
- Support for puppies, adults, and senior dogs
- Special diet options (weight management, kidney/heart health)
- Expandable tables showing all reference data
- Responsive design
- **Progressive Web App (PWA)** - Installable on mobile and desktop devices
- **Offline support** - Works offline after first visit

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. Enter your dog's age in months
2. Enter your dog's weight in kilograms
3. Select whether your dog is spayed/neutered
4. Choose between "Dry Food Only" or "Dry Food + Sachet"
5. If using dry food only, you can select special diet options
6. The calculator will display the recommended amount in cups and grams

## Tables

All reference tables are available on the page in expandable sections:

- Dry Food + Sachet tables (puppy, adult, senior, weight management)
- Dry Food Only tables (puppy, adult, senior, weight management, kidney/heart health)

## PWA Setup

This app is configured as a Progressive Web App. To complete the setup:

### Generate Icons

1. Open `public/generate-icons.html` in your browser to generate the required icon files
2. Or use an online tool to create 192x192 and 512x512 PNG icons
3. Place the icons in the `public` folder as:
   - `icon-192x192.png`
   - `icon-512x512.png`

### Install as PWA

- **Chrome/Edge**: Click the install icon in the address bar
- **Safari (iOS)**: Tap Share → Add to Home Screen
- **Firefox**: Click the menu → Install

The app will work offline after the first visit and can be installed on your device.
