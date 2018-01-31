import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Todo Schema
let todo = new Schema({
  id: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  title: {
    type: String,
    require: true,
    trim: true
  },
  completed: {
    type: Boolean,
    require: true
  },
  editing: {
    type: Boolean,
    require: false
  }
})
export const Todo = mongoose.model('Todo', todo)