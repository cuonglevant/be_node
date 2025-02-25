import Team from "../models/team.model.js";
import slugify from "../middlewares/slugify.js";

// Create a new team
export const createTeam = async (req, res) => {
  try {
    const { name, league, players, media, nation, points } = req.body;
    const slug = slugify(name, { lower: true });
    const shortName = name.substring(0, 3).toUpperCase();
    const team = new Team({
      name,
      league,
      players,
      media,
      nation,
      slug,
      points,
      shortName,
    });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("league");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("league");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by slug
export const getTeamBySlug = async (req, res) => {
  try {
    const team = await Team.findOne({ slug: req.params.slug }).populate(
      "league"
    );
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a team by ID
export const updateTeam = async (req, res) => {
  try {
    const { name, league, players, media, nation, points } = req.body;
    const slug = slugify(name, { lower: true });
    const shortName = name.substring(0, 3).toUpperCase();
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, league, players, media, nation, slug, points, shortName },
      { new: true }
    ).populate("league");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a team by slug
export const updateTeamBySlug = async (req, res) => {
  try {
    const { name, league, players, media, nation, points } = req.body;
    const slug = slugify(name, { lower: true });
    const shortName = name.substring(0, 3).toUpperCase();
    const team = await Team.findOneAndUpdate(
      { slug: req.params.slug },
      { name, league, players, media, nation, slug, points, shortName },
      { new: true }
    ).populate("league");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a team by ID
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a team by slug
export const deleteTeamBySlug = async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ slug: req.params.slug });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
