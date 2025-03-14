const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const loginRouter = require("./routes/loginRoute");
const registerRouter = require("./routes/registerRoute");
const businessRouter = require("./routes/businessRoute");
const superAdminRouter = require("./routes/superAdminRoute");

dotenv.config();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use(fileUpload());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/api", loginRouter);
app.use("/api", registerRouter);
app.use("/api", businessRouter);
app.use("/api", superAdminRouter);
