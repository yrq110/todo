import Router from 'koa-router'
import TodoController from '../controllers/TodoController'

const TodoRouter = new Router()

TodoRouter
  .get('/todo/get_all', TodoController.all_todo)
  .post('/todo/new', TodoController.new_todo)
  .delete('/todo/del/:id', TodoController.del_todo)
  .put('/todo/update', TodoController.edit_todo)
export default TodoRouter