NEJ.define([
  'base/klass',
  'util/event',
], function (_k, _t, _x, _p) {
  _p._$getAllTodos = function (cb) {
    let todos
    try {
      todos = Lockr.get('todos')
      alert('get data from cache!')
    } catch (err) {
      console.log(err)
      todos = []
    }
    return todos
  };
  _p._$addTodo = function (newTodo) {
    try {
      Lockr.get('todos')
      Lockr.sadd('todos', newTodo)
    } catch (err) {
      let todos =[newTodo]
      Lockr.set('todos', todos)
    }
  };
  _p._$deleteTodoById = function (id) {
    let todos = Lockr.get('todos')
    let index = todos.findIndex(e => e.id === id)
    todos.splice(index, 1)
    Lockr.set('todos', todos)
  };

  _p._$deleteTodoByIds = function (ids) {
    let todos = Lockr.get('todos')
    todos = todos.filter(e => ids.indexOf(e.id) === -1)
    Lockr.set('todos', todos)
  };

  _p._$editTodo = function (editedTodo) {
    let todos = Lockr.get('todos')
    todos = todos.map(e => {
      return e.id === editedTodo.id ? editedTodo : e
    })
    Lockr.set('todos', todos)
  }
  return _p;
});