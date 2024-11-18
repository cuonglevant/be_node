const Board = require("../models/board.model"); // Adjust the path as necessary

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const board = new Board({
      boardID: req.body.boardID,
      boardName: req.body.boardName,
      boardOwner: req.body.boardOwner,
      listID: req.body.listID,
    });

    const savedBoard = await board.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find().populate("boardOwner").populate("listID");
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single board by ID
exports.getBoardById = async (req, res) => {
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
exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndUpdate(
      req.params.id,
      {
        boardID: req.body.boardID,
        boardName: req.body.boardName,
        boardOwner: req.body.boardOwner,
        listID: req.body.listID,
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
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByIdAndDelete(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
