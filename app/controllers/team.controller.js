import Team from "../models/team.model.js";

// Create a new team
export const createTeam = async (req, res) => {
  try {
    const { name, description, league, category, media, player, nation } =
      req.body;
    const team = new Team({
      name,
      description,
      league,
      category,
      media,
      player,
      nation,
      flag,
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
    const teams = await Team.find()
      .populate("league")
      .populate("category")
      .populate("media")
      .populate("player")
      .populate("nation")
      .populate("flag");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("league")
      .populate("category")
      .populate("media")
      .populate("player")
      .populate("nation")
      .populate("flag");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a team by ID
export const updateTeam = async (req, res) => {
  try {
    const { name, description, league, category, media, player, nation } =
      req.body;
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description, league, category, media, player, nation },
      { new: true }
    )
      .populate("league")
      .populate("category")
      .populate("media")
      .populate("player")
      .populate("nation")
      .populate("flag");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a team by ID
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
