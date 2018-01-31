import mongoose from 'mongoose'
import {
  Todo
} from './Model'
// use Node Promise
// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const getAllTodos = (info, callback) => {
  Todo.find({}, (err, result) => {
    if (err) {
      // console.log('mongo error')
      callback(0, 'Mongo error', err)
    } else {
      // console.log('mongo get datas')
      if (result.length > 0) {
        callback(1, 'Get all todos', result)
      } else {
        callback(0, 'No result')
      }
    }
  })
}

const addTodo = (info, callback) => {
  Todo.find({
    title: info.title
  }, function (err, result) {
    if (err) {
      callback(0, 'Mongo error', err)
    } else {
      if (result.length > 0) {
        callback(0, 'Already exited')
      } else {
        let todo = new Todo(info)
        todo.save((err, result) => {
          if (err) {
            callback(0, 'Mongo error', err)
          } else {
            callback(1, `Save succeed: ${info.title}`)
          }
        })
      }
    }
  })
}

const removeTodo = (info, callback) => {
  Todo.remove({
    id: info.id
  }, (err, result) => {
    if (err) {
      callback(0, 'Mongo error', err)
    } else {
      callback(1, `Remove succeed: ${info.id}`)
    }
  })
}

const updateTodo = (info, callback) => {
  Todo.update({
    id: info.id
  }, info, (err) => {
    if (err) {
      callback(0, 'Mongo error', err)
    } else {
      callback(1, `Update succeed: ${info.id}`)
    }
  })
}

export {
  getAllTodos,
  addTodo,
  removeTodo,
  updateTodo
}