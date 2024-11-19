import History from "../models/history.model.js"; // Adjust the path as necessary

// Create a new history entry
export const createHistory = async (req, res) => {
  try {
    const history = new History({
      historyID: req.body.historyID,
      historyDescription: req.body.historyDescription,
      cardID: req.body.cardID,
      userID: req.body.userID,
    });

    const savedHistory = await history.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all histories
export const getAllHistories = async (req, res) => {
  try {
    const histories = await History.find().populate("cardID").populate("userID");
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single history by ID
export const getHistoryById = async (req, res) => {
  try {
    const history = await History.findById(req.params.id).populate("cardID").populate("userID");
    if (!history) return res.status(404).json({ message: "History not found" });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a history entry
export const updateHistory = async (req, res) => {
  try {
    const history = await History.findByIdAndUpdate(
      req.params.id,
      {
        historyID: req.body.historyID,
        historyDescription: req.body.historyDescription,
        cardID: req.body.cardID,
        userID: req.body.userID,
      },
      { new: true }
    );
    if (!history) return res.status(404).json({ message: "History not found" });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a history entry
export const deleteHistory = async (req, res) => {
  try {
    const history = await History.findByIdAndDelete(req.params.id);
    if (!history) return res.status(404).json({ message: "History not found" });
    res.status(200).json({ message: "History deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
