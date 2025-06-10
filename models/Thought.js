import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    maxlength: [1000, 'Content cannot be more than 1000 characters'],
  },
  userId: { // Link thought to a Clerk user (optional but good practice)
    type: String,
    required: [true, 'Thought must be associated with a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Thought || mongoose.model('Thought', ThoughtSchema);