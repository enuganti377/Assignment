const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db");

dotenv.config();

const app = express();
app.use(express.json());

// DB
connectDB();

// ROUTES
app.use("/api", require("./routes/signup"));
app.use("/api", require("./routes/login"));
app.use("/api/events", require("./routes/events"));
app.use("/api/events", require("./routes/rsvm")); // ✅ FIXED

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
