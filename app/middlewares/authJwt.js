import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.user;
const Role = db.role;

dotenv.config();
const verifyToken = async (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    for (const element of roles) {
      if (element.name === "admin") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    for (const element of roles) {
      if (element.name === "moderator") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export { verifyToken, isAdmin, isModerator };
