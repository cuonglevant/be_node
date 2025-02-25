import Match from "../models/match.model.js";

// Create a new match
export const createMatch = async (req, res) => {
  try {
    const {
      date,
      homeTeam,
      awayTeam,
      league,
      category,
      media,
      score,
      status,
      content,
    } = req.body;
    const newMatch = new Match({
      date,
      homeTeam,
      awayTeam,
      league,
      category,
      media,
      score,
      status,
      content,
    });
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all matches
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("league")
      .populate("category")
      .populate("media")
      .populate("content");
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single match by ID
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("league")
      .populate("category")
      .populate("media")
      .populate("content");
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a match by ID
export const updateMatch = async (req, res) => {
  try {
    const {
      date,
      homeTeam,
      awayTeam,
      league,
      category,
      media,
      score,
      status,
      content,
    } = req.body;
    const updatedMatch = await Match.findByIdAndUpdate(
      req.params.id,
      {
        date,
        homeTeam,
        awayTeam,
        league,
        category,
        media,
        score,
        status,
        content,
      },
      { new: true }
    )
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("league")
      .populate("category")
      .populate("media")
      .populate("content");
    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a match by ID
export const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
