const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username:{
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email:{
      type: String,
      required: true,
      unique:true,
      trim: true,
      validate: (email) => {/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email)}
    },
    thoughts:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// create the User model from the User schema
const User = model('User', UserSchema);

// Virtuals
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// exports the User model
module.exports = User;