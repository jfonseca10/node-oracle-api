const express = require("express");

const api = express.Router();

let users = [{ id: 1, name: "Alex" }, { id: 2, name: "Jose" }];
api.use(express.json());
api.get("/list", (req, res) => {
  res.send(users);
});

api.post("/create", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.send(newUser);
});

api.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  console.log(typeof id);

  users.map((user, idx) => {
    console.log(typeof user.id);
    if (user.id === parseInt(id, 10)) {
      users[idx] = { ...user, ...newData };
    }
  });
  console.log(id, newData);
  res.send(id);
});

api.delete("/delete", (req, res) => {
  const { id } = req.query;
  console.log("es:", id);
  users.map((user, idx) => {
    if (user.id === parseInt(id, 10)) {
      users.splice(idx, 1);
    }
  });
  res.send(users);
});

module.exports = api;
