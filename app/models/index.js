import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import List from "./list.model.js";
import Card from "./card.model.js";
import Board from "./board.model.js";
import History from "./history.model.js";

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: User,
  role: Role,
  list: List,
  card: Card,
  board: Board,
  history: History,
  ROLES: ["user", "admin", "moderator"],
};

export default db;
