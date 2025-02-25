import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;

export const signup = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging statement

    // Check if the username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send({ message: "Username is already taken!" });
    }

    const user = new User({
      username: req.body.username,
      dob: req.body.dob,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phoneNumber: req.body.phoneNumber,
      idCard: req.body.idCard,
    });

    console.log("User to be saved:", user); // Debugging statement

    const savedUser = await user.save();
    console.log("Saved user:", savedUser); // Debugging statement

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      console.log("Roles found:", roles); // Debugging statement
      savedUser.roles = roles.map((role) => role._id);
      await savedUser.save();
      console.log("User with roles saved:", savedUser); // Debugging statement
    } else {
      const role = await Role.findOne({ name: "user" });
      console.log("Default role found:", role); // Debugging statement
      savedUser.roles = [role._id];
      await savedUser.save();
      console.log("User with default role saved:", savedUser); // Debugging statement
    }

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    console.error("Error during signup:", err); // Debugging statement
    res.status(500).send({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging statement

    const user = await User.findOne({ username: req.body.username }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      console.log("User not found"); // Debugging statement
      return res.status(404).send({ message: "User Not found." });
    }

    console.log("User found:", user); // Debugging statement

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      console.log("Invalid password"); // Debugging statement
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    console.log("Generated token:", token); // Debugging statement

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error("Error during signin:", err); // Debugging statement
    res.status(500).send({ message: err.message });
  }
};

export const signout = (req, res) => {
  try {
    req.session = null;
    console.log("User signed out"); // Debugging statement
    res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.error("Error during signout:", err); // Debugging statement
    res.status(500).send({ message: err.message });
  }
};
