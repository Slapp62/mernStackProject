const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
  },
  subtitle: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 1024,
  },
  phone: {
    type: String,
    required: true,
    match: [
      /^(\+972[-\s]?|972[-\s]?|0)((2|3|4|8|9)[-\s]?\d{7}|5[0-9][-\s]?\d{7})$/,
      "Phone must be a valid Israeli phone number",
    ],
  },
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"],
  },
  web: {
    type: String,
    default: "",
  },
  image: {
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    alt: {
      type: String,
      default: "man at work",
      maxLength: 256,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  address: {
    state: {
      type: String,
      default: "Unspecified",
      maxLength: 256,
    },
    country: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    city: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    street: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    houseNumber: {
      type: Schema.Types.Mixed,
      required: true,
    },
    zip: {
      type: Schema.Types.Mixed,
      required: true,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  bizNumber: {
    type: Number,
    required: true,
    min: 1000000,
    max: 9999999,
  },
  likes: [
    {
      type: String,
    },
  ],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cards = model("Cards", cardSchema);
module.exports = Cards;
