const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
require("dotenv").config();

const app = express();

// Middleware
const allowedOrigins = [
  "http://194.187.122.145:5000",
  "http://194.187.122.145:8834",
  "http://194.187.122.145:8833",
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // In production, allow all origins from the same server (for flexibility)
      // In development, check against allowed list
      if (process.env.NODE_ENV === "production") {
        // Allow all origins in production (or be more specific if needed)
        callback(null, true);
      } else {
        // In development, check against allowed list
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files - use the same upload directory as the upload middleware
const uploadDir = process.env.UPLOAD_PATH 
  ? process.env.UPLOAD_PATH 
  : path.resolve(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadDir));
console.log(`Serving static files from: ${uploadDir}`);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
