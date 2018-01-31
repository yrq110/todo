import Router from 'koa-router'
import mongoose from 'mongoose'
import { mongoAddress } from '../data'
import {
  getAllTodos,
  addTodo,
  removeTodo,
  updateTodo
} from '../utils/TodoFunc'
const TodoRouter = new Router()

TodoRouter
  .get('/todo/get_all', async (ctx, next) => {
    await mongoose.connect(mongoAddress, {
      useMongoClient: true
    }).then(
      () => {
        return new Promise((resolve, reject) => {
          getAllTodos({}, (sid, message, data) => {
            if (sid === 1) {
              ctx.body = {
                code: 1,
                message: message + ' from Mongo',
                data: data
              }
            } else {
              ctx.body = {
                code: 0,
                message: message,
                error: data
              }
            }
            console.log(message)
            resolve(next())
          })
        })
      },
      err => {
        ctx.body = {
          code: 2,
          message: 'Mongo connection error',
          error: err
        }
        next()
      }
    )
  })
  .post('/todo/new', (ctx, next) => {
    let data = ctx.request.body
    return new Promise((resolve, reject) => {
      addTodo(data, (sid, message, data) => {
        if (sid === 1) {
          ctx.body = {
            code: 1,
            message: message
          }
        } else {
          ctx.body = {
            code: 0,
            message: message,
            error: data
          }
        }
        resolve(next())
      })
    })
  })
  .delete('/todo/del/:id', (ctx, next) => {
    let id = ctx.params.id
    return new Promise((resolve, reject) => {
      removeTodo({
        id: id
      }, (sid, message, data) => {
        if (sid === 1) {
          ctx.body = {
            code: 1,
            message: message
          }
        } else {
          ctx.body = {
            code: 0,
            message: message,
            error: data
          }
        }
        resolve(next())
      })
    })
  })
  .put('/todo/update', (ctx, next) => {
    let todo = ctx.request.body
    return new Promise((resolve, reject) => {
      updateTodo(todo, (sid, message, data) => {
        if (sid === 1) {
          ctx.body = {
            code: 1,
            message: message
          }
        } else {
          ctx.body = {
            code: 0,
            message: message,
            error: data
          }
        }
        resolve(next())
      })
    })
  })
export default TodoRouter