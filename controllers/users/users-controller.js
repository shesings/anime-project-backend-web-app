let users = [
    { "username": "admin",   "type": "ADMIN", "_id": "123", password: 'pass', email: 'user@admin.com' },
    { "username": "test1",   "type": "USER", "_id": "123", password: 'pass', email: 'test1@admin.com' },
    { "username": "test2",   "type": "PREMIUM_USER", "_id": "123", password: 'pass', email: 'test2@admin.com' }
];

const UserController = (app) => {       // use express instance app to declare HTTP GET
    app.get('/api/users', findUsers);    // request pattern /api/users to call a function
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);     // map URL pattern to handler function
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}
const findUsers = (req, res) => {
    const type = req.query.type             // retrieve type parameter from query
    if(type) {                              // if type parameter in query
        const usersOfType = users           // find users of that type
            .filter(u => u.type === type)
        res.json(usersOfType)               // respond with users of that type
        return                              // return so it doesn't continue
    }
    res.json(users)                         // otherwise respond with all users
}

const findUserById = (req, res) => {
    const userId = req.params.uid;
    const user = users.find(u => u._id === userId);
    res.json(user);
}

const createUser = (req, res) => {                  // function invoked if URL matches pattern
    const newUser = req.body;                       // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + '';      // add an _id property with unique timestamp
    users.push(newUser);                            // append new user to users array
    res.json(newUser);                              // respond with new user to client
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];
    users = users.filter(usr =>
        usr._id !== userId);
    res.sendStatus(200);
}

const updateUser = (req, res) => {      // handle PUT /api/users/:uid
    const userId = req.params['uid'];   // get user ID from path
    const updates = req.body;           // BODY includes updated fields
    users = users.map((usr) =>    // create a new array of users
        usr._id === userId ?            // if current user's ID matches ID we want to update
            {...usr, ...updates} :      // merge old usr with new updates
            usr                         // otherwise keep the old user
    );
    res.sendStatus(200);                // return OK
}

export default UserController           // exports so app.js can import
