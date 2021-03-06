const router = require('express').Router();
const {
    createThought,
    getAllThoughts,
    getThoughById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// create a thought, push thought to user's thoughts list
// read all thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// read a single thought by ID
// update a thought by ID
// delete a thought by ID
router.route('/:id')
    .get(getThoughById)
    .put(updateThought)
    .delete(deleteThought)

// Reactions
// create a reaction at endpoint in comment reactions array /api/thoughts/:thoughtId/reactions
// delete reaction and pull it from the comment reaction array
router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
