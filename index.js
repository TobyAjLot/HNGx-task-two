const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Person = require("./models/person");
const Counter = require("./models/counter");

dotenv.config();

const app = express();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// To show list of all names present in the Database. P.S: This is for testing purpose
app.get("/api/people", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific person by querying with their name
app.get("/api/:user_id", async (req, res) => {
  try {
    const id = req.params.user_id;
    const person = await Person.findOne({ id });
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new person
app.post("/api", async (req, res) => {
  try {
    const personData = req.body;

    if (typeof personData.name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }
    const counter = await Counter.findByIdAndUpdate(
      "personId", // Use a unique ID for the counter document
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const person = new Person({
      id: counter.sequence_value,
      name: personData.name,
    });

    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a person by ID
app.put("/api/:user_id", async (req, res) => {
  try {
    const id = req.params.user_id;
    const updatedPersonData = req.body;

    if (typeof updatedPersonData.name !== "string") {
      return res.status(400).json({ error: "Name must be a string" });
    }
    const updatedPerson = await Person.findOneAndUpdate(
      { id },
      { $set: updatedPersonData },
      { new: true }
    );
    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a person by id
app.delete("/api/:user_id", async (req, res) => {
  try {
    const id = req.params.user_id;
    const deletedPerson = await Person.findOneAndRemove({ id });
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
