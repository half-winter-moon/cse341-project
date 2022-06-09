const mongodb = require('../db/connect');

//to be used when returning single user's data
// const ObjectId = require('mongodb').ObjectId;

// getUsers function that gets all the users from the user collection
const getUsers = async (req, res) => {
  try {
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
}
  catch(error) {
    res.status(500).json({message:error});
  }
};

// getuser function that gets a single user from the user collection
const getUser = async (req, res) => {
  try {
    const urlId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('user').find({ _id: urlId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
  catch(error){
    res.status(500).json({message:error});
    }
  };

// addUser function that creates a user item in the user collection
const addUser = async (req, res) => {
  const user = {
    tenant: req.body.tenant, 
    connection: req.body.connection, 
    email: req.body.email, 
    password: req.body.password,
    debug: req.body.debug,
    email_verified: req.body.email_verified
  };
  const response = await mongodb.getDb().db().collection('user').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding the new user.');
  }
};

// updateUser function that updates an existing user in the user collection
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    tenant: req.body.tenant, 
    connection: req.body.connection, 
    email: req.body.email, 
    password: req.body.password,
    debug: req.body.debug,
    email_verified: req.body.email_verified
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('user')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

// deleteUser function that deletes an existing user item from the user collection
const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('user').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};


module.exports = { 
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser
};