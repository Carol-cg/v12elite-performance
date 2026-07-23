const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
});

// Catch unhandled promise rejections so the process fails loudly instead of silently
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled rejection: ${err.message}`);
  process.exit(1);
});