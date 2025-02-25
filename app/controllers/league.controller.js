import League from "../models/league.model.js";
import Team from "../models/team.model.js";
import Player from "../models/player.model.js";
import Match from "../models/match.model.js";
import slugify from "../middlewares/slugify.js";

// Create a new league
export const createLeague = async (req, res) => {
  try {
    const { name, description, nation, matches } = req.body;
    const slug = slugify(name, { lower: true });
    const league = new League({ name, description, nation, matches, slug });
    await league.save();
    res.status(201).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leagues
export const getLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get pending matches by league
export const getMatchSchedule = async (req, res) => {
  try {
    const matches = await Match.find({ slug: req.params.slug, status: "pending" })
      .sort({ date: 1 })
      .populate("homeTeam awayTeam league category media content");
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top 10 teams by points within the same league slug
export const getTopTeamsByPoints = async (req, res) => {
  try {
    const { slug } = req.params;
    const league = await League.findOne({ slug });
    if (!league) return res.status(404).json({ message: "League not found" });
    const topTeams = await Team.find({ league: league._id })
      .sort({ points: -1 })
      .limit(10)
      .populate("league");
    res.status(200).json(topTeams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get top 10 players by pointsScored within the same league slug
export const getTopPlayersByPoints = async (req, res) => {
  try {
    const { slug } = req.params;
    const league = await League.findOne({ slug });
    if (!league) return res.status(404).json({ message: "League not found" });
    const teams = await Team.find({ league: league._id });
    const teamIds = teams.map((team) => team._id);
    const topPlayers = await Player.find({ team: { $in: teamIds } })
      .sort({ pointsScored: -1 })
      .limit(10)
      .populate("team");
    res.status(200).json(topPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single league by ID
export const getLeagueById = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single league by slug
export const getLeagueBySlug = async (req, res) => {
  try {
    const league = await League.findOne({ slug: req.params.slug });
    if (!league) return res.status(404).json({ message: "League not found" });
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a league by ID
export const updateLeague = async (req, res) => {
  try {
    const { name, description, nation, matches } = req.body;
    const slug = slugify(name, { lower: true });
    const league = await League.findByIdAndUpdate(
      req.params.id,
      { name, description, nation, matches, slug },
      { new: true }
    );
    if (!league) return res.status(404).json({ message: "League not found" });
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a league by slug
export const updateLeagueBySlug = async (req, res) => {
  try {
    const { name, description, nation, matches } = req.body;
    const slug = slugify(name, { lower: true });
    const league = await League.findOneAndUpdate(
      { slug: req.params.slug },
      { name, description, nation, matches, slug },
      { new: true }
    );
    if (!league) return res.status(404).json({ message: "League not found" });
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a league by ID
export const deleteLeague = async (req, res) => {
  try {
    const league = await League.findByIdAndDelete(req.params.id);
    if (!league) return res.status(404).json({ message: "League not found" });
    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a league by slug
export const deleteLeagueBySlug = async (req, res) => {
  try {
    const league = await League.findOneAndDelete({ slug: req.params.slug });
    if (!league) return res.status(404).json({ message: "League not found" });
    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
