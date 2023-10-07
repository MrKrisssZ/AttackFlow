require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/userRoutes");
// To-do: to add the handling for the report as well
const reportRoutes = require("./routes/reportRoutes");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const mongoose = require("mongoose");

// routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);

// connect to db
const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 5001;

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established");
    // listen for requests
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.error("MongoDB connection failed:", error.message));

// Google drive
const { google } = require("googleapis");
const multer = require("multer");

const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app1 = express();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.fieldname}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });
app1.use(cors());

app1.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "key.json",
      scopes: ["https://www.googleapis.com/auth/drive"],




    });
    console.log(auth);
    const drive = google.drive({
      version: "v3",
      auth,
    });
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const responseGD = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimeType,
          parents: ["1NNIzWvBy0xS9-00jImN24KsYcU2KeSX9"],
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      });
      uploadFiles.push(responseGD.data);
    }
    res.json({ files: uploadFiles });
  } catch (error) {
    console.log("error");

  }
});

app1.listen(5005, () => {
  console.log("App1 is listening on port 5005");
});