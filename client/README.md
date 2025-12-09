# ShowcaseFlow - Frontend (React + Tailwind CSS)

A modern, responsive React application for showcasing projects and managing client testimonials with a powerful admin panel.

![React](https://img.shields.io/badge/React-19.2.1-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwind-css)
![React Router](https://img.shields.io/badge/React_Router-7.10.1-CA4245?logo=react-router)

## 🌐 Live Demo

**Frontend is Live!**
- **Website:** [https://fullstackproject-gules.vercel.app/](https://fullstackproject-gules.vercel.app/)
- **Admin Panel:** [https://fullstackproject-gules.vercel.app/admin](https://fullstackproject-gules.vercel.app/admin)

## 🎯 Overview

This is the frontend application for ShowcaseFlow, built with React and styled with Tailwind CSS. It features a public-facing portfolio website and a comprehensive admin panel for content management.

## ✨ Features

### Public Pages
- **Hero Section** - Eye-catching landing page with call-to-action
- **Projects Showcase** - Grid layout displaying all projects with images
- **Client Testimonials** - Professional client reviews with ratings
- **Contact Form** - Easy-to-use contact submission
- **Newsletter** - Email subscription functionality
- **Responsive Header** - Fixed navigation with mobile menu

### Admin Panel
- **Projects Management**
  - Create, read, update, delete projects
  - Image upload with preview
  - Character counter (500 max)
  - Search and filter
  
- **Clients Management**
  - Add and manage client testimonials
  - Photo upload with preview
  - Edit client information
  
- **Contact Submissions**
  - View all contact form submissions
  - Delete submissions
  
- **Newsletter Subscribers**
  - View subscriber list
  - Manage subscriptions

### UI/UX Features
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Beautiful gradients and animations
- 🔔 Toast notifications for user feedback
- 🖼️ Image preview before upload
- 🔍 Real-time search and filter
- ⚡ Fast and smooth transitions
- 🎯 Smooth scroll navigation
- ♿ Accessible components

## 🛠️ Tech Stack

- **React 19.2.1** - UI library with hooks
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.10.1** - Client-side routing
- **Axios 1.13.2** - HTTP client for API calls
- **PostCSS 8.4.49** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixing

## 📁 Project Structure

```
client/
├── public/
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx  # Admin dashboard (769 lines)
│   │   ├── Clients.jsx     # Client testimonials section
│   │   ├── ContactForm.jsx # Contact form component
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Hero.jsx        # Hero/landing section
│   │   ├── Newsletter.jsx  # Newsletter subscription
│   │   └── Projects.jsx    # Projects showcase section
│   ├── App.js              # Main app with routing
│   ├── App.css             # Component styles
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles + Tailwind
│   ├── setupTests.js       # Test configuration
│   └── reportWebVitals.js  # Performance monitoring
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to client directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
