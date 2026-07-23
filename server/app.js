const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

const { generalLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Security headers
app.use(helmet());

// CORS - only allow the configured frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsing with a size limit (mitigates large-payload abuse)
app.use(express.json({ limit: "10kb" }));

// Strip any keys starting with "$" or containing "." from user input (NoSQL injection prevention)
app.use(mongoSanitize());

// General request rate limiting
app.use(generalLimiter);

// Request logging (only in development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

// Routes
app.use("/api/auth", authRoutes);

// 404 + centralized error handler (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;