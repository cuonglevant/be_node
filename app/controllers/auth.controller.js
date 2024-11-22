import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const User = db.user;
const Role = db.role;

export const signup = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging statement

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const savedUser = await user.save();

    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      savedUser.roles = roles.map((role) => role._id);
      await savedUser.save();
    } else {
      const role = await Role.findOne({ name: "user" });
      savedUser.roles = [role._id];
      await savedUser.save();
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
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles.map((role) => "ROLE_" + role.name.toUpperCase()),
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
    res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.error("Error during signout:", err); // Debugging statement
    res.status(500).send({ message: err.message });
  }
};
