import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  cardID: String,
  cardName: String,
  cardDescription: String,
  listID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
