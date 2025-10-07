const express = require("express");
const http = require("http");
const cors = require("cors");

const adminRoute = require("./routes/admin/adminRoute");
const userRoute = require("./routes/user/userRoute");
const dbConnect = require("./config/db");
const { initializeAdmin } = require("./controller/admin/adminController");

const app = express();
const port = 3001;

// ✅ List of allowed frontend domains
const allowedOrigins = [
  "http://localhost:5173",

];

// ✅ Custom CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // allow cookies/JWTs if needed
  })
);

app.use(express.json());
dbConnect();

initializeAdmin();

app.use("/admin", adminRoute);
app.use("/user", userRoute);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
