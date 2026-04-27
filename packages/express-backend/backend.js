console.log("RUNNING THIS BACKEND FILE");
import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);

mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .then(() => console.log("Connected to MongoDB")) // ✅ added (optional but helpful)
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// ---------------- ROUTES ----------------

// Hello World
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ✅ Mongo GET
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((err) => res.status(500).send(err));
});

// ✅ Mongo GET by ID
app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    })
    .catch((err) => res.status(500).send(err));
});

// ✅ Mongo POST
app.post("/users", (req, res) => {
  const user = req.body;

  userService
    .addUser(user)
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) => res.status(500).send(err));
});

// ✅ Mongo DELETE
app.delete("/users/:id", (req, res) => {
  userService
    .deleteUserById(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        res.status(404).send("User not found");
      } else {
        res.status(204).send();
      }
    })
    .catch((err) => res.status(500).send(err));
});

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});