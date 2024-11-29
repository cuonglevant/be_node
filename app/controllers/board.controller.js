import Board from "../models/board.model.js"; // Adjust the path as necessary

// Create a new board
export const createBoard = async (req, res) => {
  try {
    // Validate listID field
    if (req.body.listID && req.body.listID.length > 0) {
      req.body.listID = req.body.listID.filter((id) => id.trim() !== "");
    }

    const board = new Board({
      boardID: req.body.boardID,
      boardName: req.body.boardName,
      boardOwner: req.body.boardOwner,
      listID: req.body.listID,
      boardBackgroundColor: req.body.boardBackgroundColor,
    });

    const savedBoard = await board.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all boards
export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate("boardOwner").populate("listID");
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single board by ID
export const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate("boardOwner")
      .populate("listID");
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a board
export const updateBoard = async (req, res) => {
  try {
    // Validate listID field
    if (req.body.listID && req.body.listID.length > 0) {
      req.body.listID = req.body.listID.filter((id) => id.trim() !== "");
    }

    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        boardID: req.body.boardID,
        boardName: req.body.boardName,
        boardOwner: req.body.boardOwner,
        listID: req.body.listID,
        color: req.body.boardBackgroundColor,
      },
      { new: true }
    );
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a board
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
