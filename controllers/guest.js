const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// getUsers function that gets all the users from the user collection
const getGuests = async (req, res) => {
  const result = await mongodb.getDb().db().collection('guest').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// getguest function that gets a single guest from the guest collection
const getGuest = async (req, res) => {
    const urlId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('guest').find({ _id: urlId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
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


module.exports = { 
  getGuests,
  addGuest,
  getGuest
};