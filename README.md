# School Website with Admin Panel

A complete, production-ready school website with a comprehensive admin panel, built with modern technologies and Docker deployment.

## 🚀 Features

### Public Website

- **Stunning Home Page** with animations, hero section, news carousel, featured events, stats, and teacher showcase
- **About Us Page** with mission, vision, and values
- **Events Page** with filtering (all/upcoming/past)
- **Teachers Page** with grid layout and detailed profiles
- **Contact Page** with functional contact form
- Fully responsive, mobile-first design

### Admin Panel

- JWT-based authentication
- Dashboard with statistics
- Full CRUD operations for:
  - News articles (with rich text editor and image upload)
  - Events (with image upload)
  - Teachers (with photo upload)
  - About page content
  - Home page statistics
- Image upload functionality
- Rich text editor for content management

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Admin Panel**: React + Vite
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Deployment**: Docker + Docker Compose

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)

## 🚀 Quick Start with Docker

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Start all services with Docker Compose:**

   ```bash
   docker-compose up -d
   ```

3. **Wait for services to start** (this may take a few minutes on first run)

4. **Access the applications:**

   - **Frontend Website**: http://localhost:3000
   - **Admin Panel**: http://localhost:3001
   - **Backend API**: http://localhost:5000

5. **Default Admin Credentials:**
   - Username: `admin`
   - Password: `admin123`

## 🛠️ Local Development Setup

### Backend Setup

1. Navigate to backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=5000
   DB_HOST=localhost
   DB_HOST=fdbfaab122c0842cf1db7eec.twc1.net
   DB_PORT=5432
   DB_NAME=db_Jomiweb
   DB_USER=umed
   DB_PASSWORD=umed2020
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development
   UPLOAD_PATH=./uploads
   ```

4. Database is already configured:
   - Host: `fdbfaab122c0842cf1db7eec.twc1.net`
   - Database: `db_Jomiweb`
   - User: `umed`
   - Password: `umed2020`

5. Run database migrations:

   ```bash
   npm run migrate
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access at http://localhost:3000

### Admin Panel Setup

1. Navigate to admin directory:

   ```bash
   cd admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Access at http://localhost:3001

## 📁 Project Structure

```
JomiWeb/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/       # Auth and upload middleware
│   │   ├── routes/          # API routes
│   │   └── server.js        # Express server
│   ├── uploads/             # Uploaded images
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── styles/          # CSS files
│   ├── Dockerfile
│   └── package.json
├── admin/
│   ├── src/
│   │   ├── components/      # Admin components
│   │   ├── pages/           # Admin pages
│   │   ├── services/        # API services
│   │   └── styles/          # CSS files
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## 🔐 API Endpoints

### Public Endpoints

- `GET /api/news` - Get all news articles
- `GET /api/events` - Get all events
- `GET /api/teachers` - Get all teachers
- `GET /api/about` - Get about page content
- `GET /api/stats` - Get home page statistics
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Require JWT)

- `POST /api/auth/login` - Admin login
- `GET /api/dashboard` - Get dashboard statistics
- `POST /api/news` - Create news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher
- `PUT /api/about` - Update about content
- `PUT /api/stats` - Update statistics

## 🎨 Design

- **Primary Colors**: Sky Blue (#7DD3FC) and Soft Violet (#C084FC)
- **Typography**: Poppins (body) and Playfair Display (headings)
- **Design Style**: Modern, clean, with smooth animations and gradients

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
DB_HOST=fdbfaab122c0842cf1db7eec.twc1.net
DB_PORT=5432
DB_NAME=db_Jomiweb
DB_USER=umed
DB_PASSWORD=umed2020
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=production
UPLOAD_PATH=./uploads
```

## 📝 Database Schema

The application uses the following main tables:

- `users` - Admin users
- `news` - News articles
- `events` - School events
- `teachers` - Teacher profiles
- `about_content` - About page sections
- `stats` - Home page statistics

## 🐳 Docker Commands

- **Start services**: `docker-compose up -d`
- **Stop services**: `docker-compose down`
- **View logs**: `docker-compose logs -f`
- **Rebuild services**: `docker-compose up -d --build`
- **Remove volumes**: `docker-compose down -v`

## 🔒 Security Notes

- Change the default admin password after first login
- Update `JWT_SECRET` in production
- Use strong database passwords in production
- Configure proper CORS settings for production
- Use HTTPS in production

## 📦 Production Deployment

1. Update environment variables in `docker-compose.yml`
2. Change default passwords
3. Set strong JWT secret
4. Configure proper domain names
5. Set up SSL certificates
6. Configure backup for PostgreSQL volume

## 🐛 Troubleshooting

- **Database connection issues**: Ensure PostgreSQL container is healthy
- **Image uploads not working**: Check uploads directory permissions
- **CORS errors**: Verify backend CORS configuration
- **Port conflicts**: Change ports in docker-compose.yml

## 📄 License

This project is open source and available for use.

## 👥 Support

For issues or questions, please check the codebase or create an issue in the repository.

---

**Built with ❤️ for educational institutions**
