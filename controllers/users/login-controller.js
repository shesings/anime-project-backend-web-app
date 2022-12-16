import * as dao from './users-dao.js';
let users = [
  {
    username: "admin",
    type: "ADMIN",
    _id: "123",
    password: "pass",
    email: "user@admin.com",
  },
  {
    username: "test1",
    type: "USER",
    _id: "123",
    password: "pass",
    email: "test1@admin.com",
  },
  {
    username: "test2",
    type: "PREMIUM_USER",
    _id: "123",
    password: "pass",
    email: "test2@admin.com",
  },
];

const LoginController = (app) => {
  app.post("/api/signup", signUp);
  app.post("/api/login", login);
  app.get("/api/getAll", findUsers);
};
// admin only. remove later
const findUsers = (req, res) => {
  res.json(users);
};

const signUp = async (req, res) => {
  const newUser = req.body;
  const { email } = newUser;
  try{
    const createdUser = await dao.createUser(newUser);
    res.json(createdUser);
  } catch(e) {
    if(e.code == 11000) {
      res.status(400).send('NON_UNIQUE_EMAIL');
    } else {
      res.status(403).send(e);
    }
  } 
};

const login = async (req, res) => {
  const user = req.body;
  const { username, password, email } = user;
  const currentUser = await dao.findUserByEmail(email);
  if (!currentUser) {
    res.sendStatus(403);
  }

  if (password === currentUser.password && username === currentUser.username) {
    res.json(currentUser);
  }
  res.sendStatus(403);
};

export default LoginController; // exports so app.js can import
