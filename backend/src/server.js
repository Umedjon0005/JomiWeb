const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
require("dotenv").config();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8834",
  "http://localhost:8833",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:8834",
  "http://127.0.0.1:8833",
  "http://jomi.edu.tj",
  "https://jomi.edu.tj",
  "http://194.187.122.145",
  "https://194.187.122.145",
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // Check if origin is in allowed list or matches allowed patterns
      const isAllowed = allowedOrigins.some(allowed => {
        // Exact match
        if (origin === allowed) return true;
        // Match with or without port
        if (origin.startsWith(allowed + ':') || allowed.startsWith(origin)) return true;
        // Match subdomains
        if (allowed.includes('*')) {
          const pattern = allowed.replace(/\*/g, '.*');
          return new RegExp('^' + pattern + '$').test(origin);
        }
        return false;
      });
      
      if (isAllowed || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
const uploadDir = process.env.UPLOAD_PATH || path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "School Website API Documentation",
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/events", require("./routes/eventsRoutes"));
app.use("/api/olympiads", require("./routes/olympiadsRoutes"));
app.use("/api/teachers", require("./routes/teachersRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/moments", require("./routes/momentsRoutes"));
app.use("/api/photos", require("./routes/photosRoutes"));

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Server is running
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
