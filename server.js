import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import Role from "./app/models/role.model.js"; // Adjust the path as necessary

dotenv.config();

const app = express();

const corsOptions = {
  origin: true, // Replace with your frontend's origin
  credentials: true, // Allow credentials
  optionsSuccessStatus: 200,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

app.use(cors(corsOptions));
/* for Angular Client (withCredentials) */
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:8081"],
//   })
// );

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "cuonglevant-session",
    secret: process.env.COOKIE_SECRET, // Ensure you have COOKIE_SECRET in your .env file
    httpOnly: true,
  })
);

// Set strictQuery option to suppress deprecation warning
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial(); // Initialize roles
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// Import routes
import authRoutes from "./app/routes/auth.routes.js"; // Adjust the path as necessary
import boardRoutes from "./app/routes/board.routes.js"; // Adjust the path as necessary
import listRoutes from "./app/routes/list.routes.js"; // Adjust the path as necessary
import historyRoutes from "./app/routes/history.routes.js"; // Adjust the path as necessary
import cardRoutes from "./app/routes/card.routes.js"; // Adjust the path as necessary
import userRoutes from "./app/routes/user.routes.js"; // Adjust the path as necessary

authRoutes(app);
boardRoutes(app);
listRoutes(app);
historyRoutes(app);
cardRoutes(app);
userRoutes(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
