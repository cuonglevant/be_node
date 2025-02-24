import Player from "../models/player.model.js";

// Create a new player
export const createPlayer = async (req, res) => {
  try {
    const { name, position, team } = req.body;
    const player = new Player({ name, position, team });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all players
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team");
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single player by ID
export const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("team");
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a player by ID
export const updatePlayer = async (req, res) => {
  try {
    const { name, position, team } = req.body;
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { name, position, team },
      { new: true }
    ).populate("team");
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a player by ID
export const deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
