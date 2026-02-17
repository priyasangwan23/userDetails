
const express = require("express");
const app = express();

app.use(express.json());


const users = [
  {att: "90", uid: 108572,total_sub: 14, bonus: "12", name: "Priya" },
  {att: "85", uid: 108802, total_sub: 14, bonus: "19", name: "Nandini" },
  {att: "95", uid: 108570, total_sub: 14, bonus: "16", name: "Kreya" },
  {att : "90", uid: 108571, total_sub: 14, bonus: "14", name: "Dhruvi" },
  {att: "88", uid: 108578, total_sub: 14, bonus: "11", name: "Hetavi" },
];

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);

  const user = users.find(u => u.uid === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);


});



app.put("/user/:uid", (req, res) => {
  const userId = Number(req.params.uid);
  const updatedData = req.body;

  const index = users.findIndex(u => u.uid === userId);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = { ...users[index], ...updatedData };

  res.status(200).json({
    message: "User updated successfully",
    user: users[index]
  });

});





app.post("/user", (req, res) => {
  const newUser = req.body;

  if (!newUser.uid || !newUser.name) {
    return res.status(400).json({ message: "uid and name required" });
  }
  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});


app.delete("/user/:uid", (req, res) => {
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


//  PATCH - 
app.patch("/user/:uid", (req, res) => {
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
    message: "User updated",
    user
  });
});




app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});