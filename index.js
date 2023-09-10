const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Person = require("./models/person");
const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");

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

// Input validation middleware
const validateName = [
  check("name").isString().withMessage("Name must be a string"),
];

// To show list of all names present in the Database. P.S: This is for testing purpose
app.get("/api/names", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific person by querying their name
app.get("/api", async (req, res) => {
  try {
    const name = req.query.name;
    if (typeof name != String) {
      return res.status(406).json({ error: "Only string values are allowed" });
    }
    const people = await Person.find({
      name: { $regex: new RegExp(name, "i") },
    });
    if (people.length === 0) {
      return res
        .status(404)
        .json({ error: "No persons found with the specified name" });
    }
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new person
app.post("/api", validateName, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const person = new Person(req.body);
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Find and update person by name
app.put("/api/:name", validateName, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const nameToUpdate = req.params.name;
    const updateData = req.body;

    const updatedPerson = await Person.findOneAndUpdate(
      { name: { $regex: new RegExp(nameToUpdate, "i") } },
      { $set: updateData },
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

// Delete a person by name
app.delete("/api/:name", async (req, res) => {
  try {
    const nameToDelete = req.params.name;

    const deletedPerson = await Person.findOneAndRemove({ name: nameToDelete });

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
