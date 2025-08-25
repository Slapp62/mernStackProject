const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    middle: {
      type: String,
      minLength: 2,
      maxLength: 256,
      default: "",
    },
    last: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 256,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  phone: {
    type: String,
    required: true,
    match: [/^(\+972|972|0)(2|3|4|8|9|5\d)\d{7}$/, "Phone must be a valid Israeli phone number"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,20}$/,
      "Password must be between 8 and 20 characters and contain at least 1 uppercase, 1 number, and 1 special character"
    ],
  },
  image: {
    url: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
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
      default: "",
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);
module.exports = User;
