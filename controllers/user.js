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


module.exports = { 
  getUsers
};