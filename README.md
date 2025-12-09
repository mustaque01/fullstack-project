# ShowcaseFlow - Full-Stack Portfolio Management Platform

A modern full-stack web application for managing and showcasing projects, client testimonials, and contact information. Built with React, Node.js, Express, and MongoDB.

![React](https://img.shields.io/badge/React-19.2.1-61dafb?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0.1-47a248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8?logo=tailwind-css)

## 🌐 Live Demo

**🚀 Application is Live!**

- **Frontend:** [https://fullstackproject-gules.vercel.app/](https://fullstackproject-gules.vercel.app/)
- **Admin Panel:** [https://fullstackproject-gules.vercel.app/admin](https://fullstackproject-gules.vercel.app/admin)
- **Backend API:** [https://fullstack-project-backend-5i7o.onrender.com/](https://fullstack-project-backend-5i7o.onrender.com/)

> **Note:** Backend hosted on Render free tier - first request may take 30-60 seconds to wake up from sleep mode.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Frontend
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🔄 Real-time data updates
- 📊 Admin panel for CRUD operations
- 🖼️ Image upload with preview
- 🔍 Search and filter functionality
- 🔔 Toast notifications
- 🎯 Smooth scroll navigation
- 🌙 Professional gradient designs

### Backend
- 🔐 RESTful API architecture
- 📝 Complete CRUD operations
- 🗄️ MongoDB database integration
- 📤 File upload handling (Multer)
- ✅ Input validation
- 🛡️ Error handling middleware
- 🌐 CORS enabled
- 📊 MVC architecture pattern

## 🛠️ Tech Stack

### Frontend
- **React 19.2.1** - UI library
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.10.1** - Client-side routing
- **Axios 1.13.2** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 9.0.1** - ODM for MongoDB
- **Multer 2.0.2** - File upload middleware
- **Cloudinary 2.8.0** - Image hosting (optional)
- **CORS 2.8.5** - Cross-origin resource sharing
- **Dotenv 17.2.3** - Environment variables

## 📁 Project Structure

```
fullstack-project/
├── client/                 # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminPanel.jsx     # Admin dashboard with CRUD
│   │   │   ├── Clients.jsx        # Client testimonials display
│   │   │   ├── ContactForm.jsx    # Contact form
│   │   │   ├── Header.jsx         # Navigation header
│   │   │   ├── Hero.jsx           # Hero section
│   │   │   ├── Newsletter.jsx     # Newsletter subscription
│   │   │   └── Projects.jsx       # Projects showcase
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── server/                 # Backend Node.js application
    ├── config/
    │   ├── db.js          # MongoDB connection
    │   └── multer.js      # File upload configuration
    ├── controllers/
    │   ├── clientController.js
    │   ├── contactController.js
    │   ├── newsletterController.js
    │   └── projectController.js
    ├── models/
    │   ├── Client.js
    │   ├── Contact.js
    │   ├── Newsletter.js
    │   └── Project.js
    ├── routes/
    │   ├── clientRoutes.js
    │   ├── contactRoutes.js
    │   ├── newsletterRoutes.js
    │   ├── projectRoutes.js
    │   └── uploadRoutes.js
    ├── uploads/           # Uploaded images storage
    ├── .env
    ├── server.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/mustaque01/fullstack-project.git
cd fullstack-project
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Setup Environment Variables**

Create `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/showcaseflow
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/showcaseflow?retryWrites=true&w=majority
```

5. **Start the Backend Server**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

6. **Start the Frontend**
```bash
cd client
npm start
```

The application will open at:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 🔑 Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/showcaseflow
NODE_ENV=development
```

## 📡 API Endpoints

### Projects
```
GET    /api/projects        # Get all projects
GET    /api/projects/:id    # Get single project
POST   /api/projects        # Create project
PUT    /api/projects/:id    # Update project
DELETE /api/projects/:id    # Delete project
```

### Clients
```
GET    /api/clients         # Get all clients
GET    /api/clients/:id     # Get single client
POST   /api/clients         # Create client
PUT    /api/clients/:id     # Update client
DELETE /api/clients/:id     # Delete client
```

### Contact
```
GET    /api/contact         # Get all contacts
POST   /api/contact         # Submit contact form
DELETE /api/contact/:id     # Delete contact
```

### Newsletter
```
GET    /api/newsletter      # Get all subscribers
POST   /api/newsletter      # Subscribe to newsletter
DELETE /api/newsletter/:id  # Unsubscribe
```

### Upload
```
POST   /api/upload          # Upload image file
```

## 📸 Screenshots

### Landing Page
Modern and responsive landing page with hero section, projects showcase, and client testimonials.

### Admin Panel
Complete admin dashboard with:
- Project management (Create, Read, Update, Delete)
- Client testimonials management
- Contact form submissions
- Newsletter subscribers list
- Image upload with preview
- Search and filter functionality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**MD MUSTAK**

- GitHub: [@mustaque01](https://github.com/mustaque01)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the flexible database
- Tailwind CSS for the utility-first CSS framework
- The open-source community

---

Made with ❤️ by MD MUSTAK
