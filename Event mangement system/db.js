const mongoose = require("mongoose");

// ---------------- CONNECT DB ----------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

// ---------------- USER ----------------
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});

const Usermodel =
  mongoose.models.User || mongoose.model("User", UserSchema);

// ---------------- EVENT ----------------
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  dateTime: String,
  location: String,
  capacity: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Eventmodel = mongoose.model("Event", EventSchema);


// ---------------- RSVP ----------------
const RSVPschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

const RSVPmodel = mongoose.model("RSVP", RSVPschema);

// ---------------- EXPORT ----------------
module.exports = {
  connectDB,
  Usermodel,
  Eventmodel,
  RSVPmodel,
};
