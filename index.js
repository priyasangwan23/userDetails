const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json()); // Middleware to read JSON body

// In-memory database
const users = [
  { att: "90", uid: 108572, total_sub: 14, bonus: "12", name: "Priya" },
  { att: "85", uid: 108802, total_sub: 14, bonus: "19", name: "Nandini" },
  { att: "95", uid: 108570, total_sub: 14, bonus: "16", name: "Kreya" },
  { att: "90", uid: 108571, total_sub: 14, bonus: "14", name: "Dhruvi" },
  { att: "88", uid: 108578, total_sub: 14, bonus: "11", name: "Hetavi" },
];

// 🌍 Root Route (for Render check)
app.get("/", (req, res) => {
  res.send("User API is running 🚀");
});

// 1️⃣ GET ALL USERS
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// 2️⃣ GET SINGLE USER
app.get("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// 3️⃣ CREATE USER
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.uid || !newUser.name) {
    return res.status(400).json({ message: "uid and name required" });
  }

  const exists = users.find(u => u.uid === newUser.uid);
  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

// 4️⃣ FULL UPDATE (PUT)
app.put("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = { ...users[index], ...req.body };

  res.status(200).json({
    message: "User updated successfully",
    user: users[index]
  });
});

// 5️⃣ PARTIAL UPDATE (PATCH)
app.patch("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.att) user.att = req.body.att;
  if (req.body.total_sub) user.total_sub = req.body.total_sub;
  if (req.body.bonus) user.bonus = req.body.bonus;

  res.status(200).json({
    message: "User partially updated",
    user
  });
});

// 6️⃣ DELETE USER
app.delete("/users/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0]
  });
});

// 🔥 Dynamic Port for Local + Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
