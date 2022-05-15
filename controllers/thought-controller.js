const { Thought, User } = require('../models');
const { param } = require('../routes');

const thoughtController = {
    // create a thought, push thought to user's thoughts list
    createThought( { body }, res ) {
        console.log(body);
        const {thoughText, username, userId } = body
        Thought.create( {thoughText, username } )
            .then( ( {_id} ) => {
              return User.findOneAndUpdate(
                  { _id: userId },
                  { $push: { thoughts: _id } },
                  { new: true}
                );
            })
            .then( (dbThoughtData) => {
                if (!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                  };
                  res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // read all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then((dbThoughtData) => { res.json(dbThoughtData) })
            .catch((err) => {
              console.log(err);
              res.status(400).JSON(err);
            });
    },
    // read a single thought by ID
    getThoughById( { params }, res) {
        Thought.findOne( { _id: params.id })
            .then( (dbThoughtData) => {
                if (!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                };
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // update a thought by ID
    updateThought( {params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
            .then( (dbThoughtData) => {
                if (!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                };
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // delete a thought by ID
    deleteThought( { params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
            .then( (dbThoughtData) => {
                if (!dbThoughtData){
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                };
                User.findByIdAndUpdate( 
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: dbThoughtData._id }},
                    { new: true }
                );
                return dbThoughtData;
            })
            .then(dbThoughtData => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Reactions
    // create a reaction at endpoint in comment reactions array /api/thoughts/:thoughtId/reactions
    // delete reaction and pull it from the comment reaction array
};

module.exports = thoughtController;