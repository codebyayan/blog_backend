const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store (replace with database in production)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// POST new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const user = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(user);
  res.status(201).json(user);
});

// PUT update user
app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  user.name = name;
  user.email = email;
  res.json(user);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "User not found" });

  users.splice(index, 1);
  res.status(204).send();
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
