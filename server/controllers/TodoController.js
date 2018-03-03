import mongoose from 'mongoose'
import {
  Todo
} from '../utils/Model'

class TodoController {
  static async all_todo(ctx, next) {
    ctx.body = {
      code: 500,
      message: 'Nothing'
    }
    await Todo.find({}, (err, result) => {
      if (err) {
        // console.log('mongo error')
        ctx.body = {
          code: 408,
          message: 'Mongo error',
          error: err
        }
      } else {
        // console.log('mongo get datas')
        if (result.length > 0) {
          ctx.body = {
            code: 200,
            message: ' get all todos from Mongo',
            data: result
          }
        } else {
          ctx.body = {
            code: 404,
            message: 'Find no result'
          }
        }
      }
      next()
    })
  }

  static async new_todo(ctx, next) {
    let data = ctx.request.body
    await Todo.find({
      title: data.title
    }, (err, result) => {
      if (err) {
        ctx.body = {
          code: 408,
          message: 'Mongo error',
          error: err
        }
      } else {
        if (result.length > 0) {
          ctx.body = {
            code: 201,
            message: 'Already exited'
          }
        } else {
          let todo = new Todo(data)
          todo.save()
          ctx.body = {
            code: 200,
            message: `Save succeed: ${data.title}`
          }
        }
      }
      next()
    })
  }

  static async del_todo(ctx, next) {
    let id = ctx.params.id
    await Todo.remove({
      id: id
    }, (err, result) => {
      if (err) {
        ctx.body = {
          code: 408,
          message: 'Mongo error',
          error: err
        }
      } else {
        ctx.body = {
          code: 200,
          message: `Remove succeed: ${id}`
        }
      }
      next()
    })
  }

  static async edit_todo(ctx, next) {
    let todo = ctx.request.body
    await Todo.update({
      id: todo.id
    }, todo)
    ctx.body = {
      code: 200,
      message: `Update succeed: ${todo.id}`
    }
    next()
  }
}

export default TodoController