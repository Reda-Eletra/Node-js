// )
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

dotenv.config({ path: 'config.env' }); 


mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

const petSchema = new mongoose.Schema({
    name:    String,
    age:     Number,
    species: String
  });

const Pet = mongoose.model("Pet", petSchema);

const userSchema = new mongoose.Schema({
  name:  String,
  phone: String,
  age: Number
});

const User = mongoose.model("User", userSchema);



app.post("/api/pets", async (req, res) => {
  try {
    const pet = await new Pet(req.body);
    pet.save();
    res.status(201).send(pet);
  } catch (error) {
    res.status(400).send("messagenot nofound pet" );
  }
});



app.get("/api/pets", async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send( "message: error.message ");
  }
});



app.put("/api/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).send( "Pet not found" );
    res.status(200).send(pet);
  } catch (error) {
    res.status(400).send(" message: error.message ");
  }
});




app.delete("/api/pets/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).send( "Pet not found" );
    res.status(200).send("Pet deleted successfully" );
  } catch (error) {
    res.status(500).send(" message: error.message ");
  }
});




app.post("/api/users", async (req, res) => {
  try {
    const user =  new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(" message: error.message ");
  }
});



app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(" message: error.message ");
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send( "User not found" );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("message: error.message ");
  }
});


app.delete("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send( "User not found" );
    res.status(200).send("User deleted successfully" );
  } catch (error) {
    res.status(500).send(" message: error.message ");
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
