const { User, Thought } = require('../models');

const userController = {
  // create User
  createUser({ body }, res) {
    console.log(body);
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch( (err) => res.status(400).json(err));
  },
  // read all users
  getAllUsers(req, res) {
    User.find({})
          .then(dbUserData => res.json(dbUserData))
          .catch((err) => {
            console.log(err)
            res.status(400).json(err)
          });
  },
  // read a user by ID
  getUserByID({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((dbUserData) => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No user with this id!' })
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      });
  },
  // update a user by ID
  updateUser( {params, body}, res) {
    User.findOneAndUpdate({_id: params.id }, body, { new: true, runValidators: true})
      .then( (dbUserData) => {
        if (!dbUserData){
          res.status(404).json({message: "No user found with this id!"});
          return;
        };
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // delete a user by ID, and see if I can delete all thoughts by that user
  deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id})
      .then( (dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({message: "No user found with this id!"});
          return;
        }
        // @todo find the thoughts and delete them
        dbUserData.thoughts.forEach(element => {
          Thought.findOneAndDelete({ _id: element })
        });
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // add a friend to a user
  addFriend({ userId, friendId }, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      { $push: {friends: friendId} },
      { new: true, runValidators: true }
    )
    .then( (dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({message: "No user found with this id!"});
        return;
      };
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
    
  },
  // delete a friend to a user
  removeFriend({ userId, friendId}, res) {
    User.findOneAndUpdate(
      {_id: userId},
      { $pull: { friends: { _id: friendId } } },
      { new: true}
    )
    .then( (dbUserData) => { 
      if (!dbUserData) {
        res.status(404).json({message: "No user found with this id!"});
        return;
      };
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  }
};

module.exports = userController;