# Crave Crate - React Advertisement Website

A beautiful, responsive React website for Crave Crate, showcasing artisanal pastries and baked goods with a modern, elegant design.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, elegant design with warm color palette
- **Interactive Components**: 
  - FAQ accordion functionality
  - Email signup form
  - Hover effects and smooth transitions
- **Component-Based Architecture**: Modular React components for easy maintenance

## Sections

1. **Header**: Logo, navigation menu, cart icon, and discount button
2. **Hero Section**: Main headline with call-to-action buttons
3. **Why Choose Crave Crate**: Feature cards highlighting benefits
4. **Our Artisanal Pastries**: Product showcase with 6 pastry categories
5. **Customer Testimonials**: Customer reviews with star ratings
6. **Call-to-Action**: Email signup form
7. **FAQ**: Expandable accordion with common questions
8. **Footer**: Brand information and navigation links

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the files
2. Navigate to the project directory:
   ```bash
   cd crave-crate
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.js & Header.css
│   ├── Hero.js & Hero.css
│   ├── WhyChoose.js & WhyChoose.css
│   ├── Pastries.js & Pastries.css
│   ├── Testimonials.js & Testimonials.css
│   ├── CallToAction.js & CallToAction.css
│   ├── FAQ.js & FAQ.css
│   └── Footer.js & Footer.css
├── App.js & App.css
├── index.js & index.css
└── package.json
```

## Customization

### Colors
The website uses a warm, bakery-inspired color palette:
- Primary: `#3d2914` (Dark brown)
- Secondary: `#8b4513` (Medium brown)
- Background: `#faf8f5` (Cream)
- Card Background: `#f5f1eb` (Light beige)

### Typography
- Headings: Serif font family for elegance
- Body text: System font stack for readability

### Content
To customize the content, edit the respective component files:
- Update pastry types in `Pastries.js`
- Modify testimonials in `Testimonials.js`
- Change FAQ questions in `FAQ.js`
- Update feature descriptions in `WhyChoose.js`

## Technologies Used

- React 18
- CSS3 with Flexbox and Grid
- Responsive design principles
- Modern JavaScript (ES6+)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.
