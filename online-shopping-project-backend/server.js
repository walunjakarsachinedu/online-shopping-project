const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const users = require('./users.json');
const jwt = require('jsonwebtoken');
const db = require('./db.json');
const cors = require('cors');
const fs = require('fs');
const beautify = require('json-beautify');

server.use(cors({ origin: 'http://localhost:4200' }));

server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.customers.find((u) => u.email === email && u.password === password);
  if (user) {
    const { id, name, role } = user;
    const token = jwt.sign({ id, name, email, role }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

server.post('/customers', (req, res) => {
  const { name, email, password, address } = req.body;
  const id = Date.now().toString(); // generate id based on current timestamp
  const role = "user";
  const existingUser = db.customers.find((u) => u.email == email);
  if(existingUser) {
    res.status(409).json({error: "User already exists"});
  } else {
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

server.use((req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, 'secret');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
