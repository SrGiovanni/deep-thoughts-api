const express = require('express');
const {
    createThought,
    getAllThoughts,
    getThoughById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

const router = express.Router();
// create a thought, push thought to user's thoughts list
// read all thoughts
router.use('/')
    .get(getAllThoughts)
    .post(createThought);

// read a single thought by ID
// update a thought by ID
// delete a thought by ID
router.use('/:id')
    .get(getThoughById)
    .put(updateThought)
    .delete(deleteThought)

// Reactions
// create a reaction at endpoint in comment reactions array /api/thoughts/:thoughtId/reactions
// delete reaction and pull it from the comment reaction array
router.use('/:thoughtId/reactions')
    .post(addReaction);

router.use('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
