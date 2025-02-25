import League from "../models/league.model.js";
import slugify from "slugify";

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

// Get a single league by ID
export const getLeagueById = async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single league by slug
export const getLeagueBySlug = async (req, res) => {
  try {
    const league = await League.findOne({ slug: req.params.slug });
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
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
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
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
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a league by ID
export const deleteLeague = async (req, res) => {
  try {
    const league = await League.findByIdAndDelete(req.params.id);
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a league by slug
export const deleteLeagueBySlug = async (req, res) => {
  try {
    const league = await League.findOneAndDelete({ slug: req.params.slug });
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
