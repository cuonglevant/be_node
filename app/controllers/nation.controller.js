import Nation from "../models/nation.model.js";
import slugify from "slugify";

// Create a new nation
export const createNation = async (req, res) => {
  try {
    const { name, flag, league } = req.body;
    const slug = slugify(name, { lower: true });
    const nation = new Nation({ name, flag, league, slug });
    await nation.save();
    res.status(201).json(nation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all nations
export const getNations = async (req, res) => {
  try {
    const nations = await Nation.find().populate("league");
    res.status(200).json(nations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single nation by ID
export const getNationById = async (req, res) => {
  try {
    const nation = await Nation.findById(req.params.id).populate("league");
    if (!nation) {
      return res.status(404).json({ message: "Nation not found" });
    }
    res.status(200).json(nation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single nation by slug
export const getNationBySlug = async (req, res) => {
  try {
    const nation = await Nation.findOne({ slug: req.params.slug }).populate(
      "league"
    );
    if (!nation) {
      return res.status(404).json({ message: "Nation not found" });
    }
    res.status(200).json(nation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a nation by ID
export const updateNation = async (req, res) => {
  try {
    const { name, flag, league } = req.body;
    const slug = slugify(name, { lower: true });
    const nation = await Nation.findByIdAndUpdate(
      req.params.id,
      { name, flag, league, slug },
      { new: true }
    ).populate("league");
    if (!nation) {
      return res.status(404).json({ message: "Nation not found" });
    }
    res.status(200).json(nation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a nation by slug
export const updateNationBySlug = async (req, res) => {
  try {
    const { name, flag, league } = req.body;
    const slug = slugify(name, { lower: true });
    const nation = await Nation.findOneAndUpdate(
      { slug: req.params.slug },
      { name, flag, league, slug },
      { new: true }
    ).populate("league");
    if (!nation) {
      return res.status(404).json({ message: "Nation not found" });
    }
    res.status(200).json(nation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a nation by ID
export const deleteNation = async (req, res) => {
  try {
    const nation = await Nation.findByIdAndDelete(req.params.id);
    if (!nation) {
      return res.status(404).json({ message: "Nation not found" });
    }
    res.status(200).json({ message: "Nation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a nation by slug
export const deleteNationBySlug = async (req, res) => {
  try {
    const nation = await Nation.findOneAndDelete({ slug: req.params.slug });
    if (!nation) {
      return res.status(404).json({ message: "Nation not found" });
    }
    res.status(200).json({ message: "Nation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
