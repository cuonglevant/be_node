import List from "../models/list.model.js"; // Adjust the path as necessary

// Create a new list
export const createList = async (req, res) => {
  try {
    const list = new List({
      listID: req.body.listID,
      listName: req.body.listName,
      boardID: req.body.boardID,
      cardID: req.body.cardID,
    });

    const savedList = await list.save();
    res.status(201).json(savedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all lists
export const getAllLists = async (req, res) => {
  try {
    const lists = await List.find().populate("boardID").populate("cardID");
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single list by ID
export const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate("boardID").populate("cardID");
    if (!list) return res.status(404).json({ message: "List not found" });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a list
export const updateList = async (req, res) => {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.id,
      {
        listID: req.body.listID,
        listName: req.body.listName,
        boardID: req.body.boardID,
        cardID: req.body.cardID,
      },
      { new: true }
    );
    if (!list) return res.status(404).json({ message: "List not found" });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a list
export const deleteList = async (req, res) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) return res.status(404).json({ message: "List not found" });
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
