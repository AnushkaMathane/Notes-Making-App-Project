const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groups");
const noteRoutes = require("./routes/notes");

const authMiddleware = require("./middleware/authMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/groups", groupRoutes);

app.use("/api/notes", noteRoutes);

app.get("/api/secret", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 4000, () =>
      console.log("Server running on port", process.env.PORT || 4000)
    );
  })
  .catch((err) => console.log(err));
