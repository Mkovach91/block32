const express = require("express");
const router = express.Router();
const employees = require("../employees")

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    next({ status: 404, message: `Employee with id ${id} does not exist.` });
  }
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if(!name || name.trim().length === 0) {
    return res.status(400).json({ message: "A name is required"})
  }
  const newId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
  const newEmployee = { id: newId, name };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
})

module.exports = router;