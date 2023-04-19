const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db.json');
const beautify = require('json-beautify');
const fs = require('fs');

const login = express.Router();
login.use('/', (req, res) => {
  const { email, password } = req.body;
  const user = db.customers.find((u) => u.email === email && u.password === password);
  if (user) {
    const { id, name, role } = user;
    const token = jwt.sign({ id, name, email, role }, 'secret', { expiresIn: '365d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const registerUser = express.Router();
registerUser.post('/', (req, res) => {
  const { name, email, password, address } = req.body;
  const id = Date.now().toString(); // generate id based on current timestamp
  const role = "user";
  const existingUser = db.customers.find((u) => u.email == email);
  if(existingUser) {
    res.status(409).json({error: "User already exists"});
  } 
  else if (name == undefined || email == undefined || password == undefined || address == undefined) {
    console.log("create user: some required fields are missing");
    res.status(400).json({error: "Missing required user data fields."});
  }
  else {
    console.log(name, email, password, address);
    const newUser = { id, name, email, password, address, role };
    db.customers.push(newUser);
    fs.writeFile('./db.json', beautify(db, null, 2, 80), (err) => {
      if (err) {
        res.status(500).send('Error writing to database');
      } else {
        res.status(201).json(newUser);
      }
    });
  }
});

exports.login = login; 
exports.registerUser = registerUser; 