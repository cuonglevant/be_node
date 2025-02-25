import Content from "../models/content.model.js";
import User from "../models/user.model.js";
import slugify from "../middlewares/slugify.js";

// Create a new content
export const createContent = async (req, res) => {
  try {
    const {
      title,
      content,
      publishDate,
      author,
      media,
      comment,
      category,
      numOfViews,
    } = req.body;
    const slug = slugify(title, { lower: true });
    const newContent = new Content({
      title,
      slug,
      content,
      publishDate,
      author,
      media,
      comment,
      category,
      numOfViews,
    });
    await newContent.save();
    res.status(201).json(newContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewContent = async (req, res) => {
  try {
    const userId = req.userId;
    const contentId = req.params.contentId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).send({ message: "Content not found" });
    }

    if (!user.viewedContent.includes(contentId)) {
      user.viewedContent.push(contentId);
      await user.save();
    }

    content.numOfViews = (content.numOfViews || 0) + 1;
    await content.save();

    res.status(200).send({ message: "Content viewed successfully" });
  } catch (err) {
    console.error("Error during viewing content:", err);
    res.status(500).send({ message: err.message });
  }
};

// Get all content
export const getContents = async (req, res) => {
  try {
    const contents = await Content.find()
      .populate("author")
      .populate("media")
      .populate("category")
      .populate("comment.author");
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get content by date
export const getContentsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const contents = await Content.find({
      publishDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("author")
      .populate("media")
      .populate("category")
      .populate("comment.author");

    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single content by ID
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate("author")
      .populate("media")
      .populate("category")
      .populate("comment.author");
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single content by slug
export const getContentBySlug = async (req, res) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug })
      .populate("author")
      .populate("media")
      .populate("category")
      .populate("comment.author");
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a content by ID
export const updateContent = async (req, res) => {
  try {
    const {
      title,
      content,
      publishDate,
      author,
      media,
      comment,
      category,
      numOfViews,
    } = req.body;
    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        publishDate,
        author,
        media,
        comment,
        category,
        numOfViews,
      },
      { new: true }
    )
      .populate("author")
      .populate("media")
      .populate("category")
      .populate("comment.author");
    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a content by slug
export const updateContentBySlug = async (req, res) => {
  try {
    const {
      title,
      content,
      publishDate,
      author,
      media,
      comment,
      category,
      numOfViews,
    } = req.body;
    const slug = slugify(title, { lower: true });
    const updatedContent = await Content.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        slug,
        content,
        publishDate,
        author,
        media,
        comment,
        category,
        numOfViews,
      },
      { new: true }
    )
      .populate("author")
      .populate("media")
      .populate("category")
      .populate("comment.author");
    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a content by ID
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a content by slug
export const deleteContentBySlug = async (req, res) => {
  try {
    const content = await Content.findOneAndDelete({ slug: req.params.slug });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
