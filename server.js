const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable all CORS requests
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI =
  "mongodb+srv://info:b6FZHE0HhNJi1rz0@cluster0.x5nvsfm.mongodb.net/my-mern-app"; // Replace "my-mern-app" with your database name
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB Atlas:", err);
});

// Define a schema for the messages
const messageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  data: { type: String, required: true },
});

// Create a model based on the schema
const Message = mongoose.model("Message", messageSchema);

// Route to handle incoming messages
app.post("/messages", async (req, res) => {
  const { user, data } = req.body;

  try {
    // Create a new message document and save it to the collection
    const newMessage = new Message({ user, data });
    await newMessage.save();

    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save the message" });
  }
});

// Route to get all messages
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
