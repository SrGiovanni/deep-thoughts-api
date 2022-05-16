const router = require('express').Router();
const { 
    createUser,
    getAllUsers,
    getUserByID,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// create User
// read all users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// read a user by ID
// update a user by ID
// delete a user by ID, and see if I can delete all thoughts by that user
router.route('/:id')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser);

// add a friend to a user's friend array
// remove a friend from a user's friend array
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
