const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// getUsers function that gets all the users from the user collection
const getGuests = async (req, res) => {
  try {
  const result = await mongodb.getDb().db().collection('guest').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
}
  catch(error) {
    res.status(500).json({message:error});
  }
};

// getguest function that gets a single guest from the guest collection
const getGuest = async (req, res) => {
  try {
    const urlId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('guest').find({ _id: urlId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  }
  catch(error){
    res.status(500).json({message:error});
    }
  };

// addGuest function that creates a guest item in the guest collection
const addGuest = async (req, res) => {
  const guest = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    invitationSent: req.body.invitationSent,
    invitedToCeremony: req.body.invitedToCeremony,
    foodAllergies: req.body.foodAllergies,
    address: req.body.address,
    role: req.body.role
  };
  const response = await mongodb.getDb().db().collection('guest').insertOne(guest);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while adding the new guest.');
  }
};

// updateGuest function that updates an existing guest in the guest collection
const updateGuest = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const guest = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    invitationSent: req.body.invitationSent,
    invitedToCeremony: req.body.invitedToCeremony,
    foodAllergies: req.body.foodAllergies,
    address: req.body.address,
    role: req.body.role
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('guest')
    .replaceOne({ _id: userId }, guest);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the guest.');
  }
};

// deleteGuest function that deletes an existing guest item from the guest collection
const deleteGuest = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('guest').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the guest.');
  }
};


module.exports = { 
  getGuests,
  addGuest,
  getGuest,
  updateGuest,
  deleteGuest
};