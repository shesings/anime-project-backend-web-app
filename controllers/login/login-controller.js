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
  const currentUserArr = users.filter((user) => user.email === email);
  if (currentUserArr && currentUserArr.length) {
    res.status(400).send("email already exists");
  }
  users.push(newUser); // dao.createUser()
  res.json(users);
};

const login = async (req, res) => {
  const user = req.body;
  console.log(user);
  // const tuits = await tuitsDao.findTuits()
  const { username, password, email } = user;
  const currentUserArr = users.filter((user) => user.email === email);
  if (!currentUserArr || !currentUserArr.length) {
    res.sendStatus(403);
  }
  const currentUser = currentUserArr[0];

  if (password === currentUser.password && username === currentUser.username) {
    res.json({ currentUser, authenticated: true });
  }
  res.sendStatus(403);
};

export default LoginController; // exports so app.js can import
