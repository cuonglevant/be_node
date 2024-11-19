import Card from "../models/card.model.js"; // Adjust the path as necessary

// Create a new card
export const createCard = async (req, res) => {
  try {
    const card = new Card({
      cardID: req.body.cardID,
      cardName: req.body.cardName,
      cardDescription: req.body.cardDescription,
      listID: req.body.listID,
    });

    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cards
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("listID");
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single card by ID
export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate("listID");
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a card
export const updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      {
        cardID: req.body.cardID,
        cardName: req.body.cardName,
        cardDescription: req.body.cardDescription,
        listID: req.body.listID,
      },
      { new: true }
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
