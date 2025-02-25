import mongoose from "mongoose";
import User from "./user.model.js";
import Role from "./role.model.js";
import League from "./league.model.js";
import Team from "./team.model.js";
import Player from "./player.model.js";
import Match from "./match.model.js";
import Nation from "./nation.model.js";
import Category from "./category.model.js";
import Content from "./content.model.js";
import Media from "./media.model.js";

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: User,
  role: Role,
  league: League,
  team: Team,
  player: Player,
  match: Match,
  nation: Nation,
  category: Category,
  content: Content,
  media: Media,
};

export default db;
