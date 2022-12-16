import * as dao from './users-dao.js';

const UserController = (app) => {
  // use express instance app to declare HTTP GET
  app.get("/api/users", findUsers); // request pattern /api/users to call a function
  app.get("/api/users/:uid", findUserById);
  app.post("/api/users", createUser); // map URL pattern to handler function
  app.delete("/api/users/:uid", deleteUser);
  app.put("/api/users/:uid", updateUser);
  app.put("/api/users/watchlist/:uid", updateWatchList);
  app.put("/api/users/favorites/:uid", updateFavorites);
  app.put("/api/users/completed/:uid", updateCompleteList);
};
const findUsers = (req, res) => {
  const type = req.query.type; // retrieve type parameter from query
  if (type) {
    const usersOfType = users // find users of that type
      .filter((u) => u.type === type);
    res.json(usersOfType); // respond with users of that type
    return; // return so it doesn't continue
  }
  res.json(users); // otherwise respond with all users
};

const findUserById = async (req, res) => {
  const userId = req.params.uid;
  const user = await dao.findUserById(userId);
  res.json(user);
};

const createUser = (req, res) => {
  // function invoked if URL matches pattern
  const newUser = req.body; // extract new user from BODY in request
  newUser._id = new Date().getTime() + ""; // add an _id property with unique timestamp
  users.push(newUser); // append new user to users array
  res.json(newUser); // respond with new user to client
};

const deleteUser = (req, res) => {
  const userId = req.params["uid"];
  users = users.filter((usr) => usr._id !== userId);
  res.sendStatus(200);
};

const updateUser = (req, res) => {
  // handle PUT /api/users/:uid
  const userId = req.params["uid"]; // get user ID from path
  const updates = req.body; // BODY includes updated fields
  dao.updateUser(userId, updates);
  res.sendStatus(200); // return OK
};

const updateFavorites = async (req, res) => {
      // handle PUT /api/users/:uid
  const userId = req.params["uid"]; // get user ID from path
  const updates = req.body; // BODY includes updated fields
  const user = await dao.findUserById(userId);
  user.personalProfile.favorites.push(updates);

  const test = await dao.updateUser(userId, user);
  res.status(200).send(test);
}

const updateWatchList = async (req, res) => {
    // handle PUT /api/users/:uid
    const userId = req.params["uid"]; // get user ID from path
    const updates = req.body; // BODY includes updated fields
    const user = await dao.findUserById(userId);
    user.personalProfile.toBeWatched.push(updates);
    const test = await dao.updateUser(userId, user);
    res.status(200).send(test);
}

const updateCompleteList = async (req, res) => {
    // handle PUT /api/users/:uid
    const userId = req.params["uid"]; // get user ID from path
    const updates = req.body; // BODY includes updated fields
    const user = await dao.findUserById(userId);
    user.personalProfile.completed.push(updates);
    const test = await dao.updateUser(userId, user);
    res.status(200).send(test);
}

export default UserController; // exports so app.js can import
