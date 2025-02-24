import Media from "../models/media.model.js";

// Create a new media
export const createMedia = async (req, res) => {
  try {
    const { url, type, description } = req.body;
    const media = new Media({ url, type, description });
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all media
export const getMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single media by ID
export const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a media by ID
export const updateMedia = async (req, res) => {
  try {
    const { url, type, description } = req.body;
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { url, type, description },
      { new: true }
    );
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a media by ID
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }
    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
