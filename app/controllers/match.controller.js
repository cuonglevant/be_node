import Match from "../models/match.model.js";
import slugify from "../middlewares/slugify.js";

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
      views,
    } = req.body;
    const slug = slugify(`${homeTeam} vs ${awayTeam}`, { lower: true });
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
      slug,
      views,
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

// Get matches by date
export const getMatchesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const matches = await Match.find({
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
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

// Get a single match by slug
export const getMatchBySlug = async (req, res) => {
  try {
    const match = await Match.findOne({ slug: req.params.slug })
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

// View a match
export const viewMatch = async (req, res) => {
  try {
    const userId = req.userId;
    const matchId = req.params.matchId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).send({ message: "Match not found" });
    }

    if (!user.viewedMatches.includes(matchId)) {
      user.viewedMatches.push(matchId);
      await user.save();
    }

    match.views = (match.views || 0) + 1;
    await match.save();

    res.status(200).send({ message: "Match viewed successfully" });
  } catch (err) {
    console.error("Error during viewing match:", err);
    res.status(500).send({ message: err.message });
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
    const slug = slugify(`${homeTeam} vs ${awayTeam}`, { lower: true });
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
        slug,
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

// Update a match by slug
export const updateMatchBySlug = async (req, res) => {
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
    const slug = slugify(`${homeTeam} vs ${awayTeam}`, { lower: true });
    const updatedMatch = await Match.findOneAndUpdate(
      { slug: req.params.slug },
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
        slug,
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

// Delete a match by slug
export const deleteMatchBySlug = async (req, res) => {
  try {
    const match = await Match.findOneAndDelete({ slug: req.params.slug });
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
