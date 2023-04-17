const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const cors = require('cors');
const { authenticatedUser } = require('./auth-router');
const { login, registerUser } = require('./auth');

server.use(cors([
  { origin: 'http://10.1.27.225:4200' },
  { origin: 'http://localhost:4200' },
]));


server.use(jsonServer.bodyParser);

server.use('/login', login);
server.use('/customers', registerUser);

server.use(authenticatedUser);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
