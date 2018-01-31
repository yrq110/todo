NEJ.define([
  './component/container/Todo.js',
  './utils/http.js',
  './utils/cache.js'
], function (TodoApp, http, cache) {
  function createTodoApp(data, enabled) {
    let todos
    if (enabled) {
      todos = data
    } else {
      todos = cache._$getAllTodos();
    }
    let todoApp = new TodoApp({
      data: {
        todos: todos || [],
        activeTodos: todos || [],
        mongoOn: enabled,
        list: 'all',
      }
    }).$inject('#todoapp');
  }
  http._$getAllTodos(createTodoApp);
});