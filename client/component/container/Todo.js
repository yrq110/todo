NEJ.define([
  'regular!./Todo.html',
  '../view/TodoItem.js',
  '../../utils/http.js',
  '../../utils/cache.js'
], function (tpl, TodoItem, http, cache) {
  const dom = Regular.dom;
  const TodoApp = Regular.extend({
    template: tpl,
    addTodo: function (title) {
      if (title === undefined || title === null || title.trim() === '') {
        alert('Input error: nil')
        return
      }
      let todoTitle = title.trim();
      let data = this.data;
      let newTodo = {
        title: todoTitle,
        completed: false,
        id: http._$makeGUID()
      }
      data.todos.push(newTodo);
      if (data.mongoOn) {
        http._$addTodo(newTodo);
      } else {
        cache._$addTodo(newTodo);
      }
      data.title = '';
      // console.log(`add todo-${newTodo.id}`)
    },
    clearCompleted: function () {
      let data = this.data;
      let completedTodoIds = [];
      data.todos = data.todos.filter(function (todo) {
        if (todo.completed) {
          completedTodoIds.push(todo.id);
        }
        return !todo.completed;
      });
      data.activeTodos = data.todos
      data.list = 'all'
      if (data.mongoOn) {
        completedTodoIds.forEach(function (id) {
          http._$deleteTodoById(id);
        });
      } else {
        cache._$deleteTodoByIds(completedTodoIds);
      }
      // console.log('clear all completed todos')
    },
    removeTodo: function (idx) {
      let data = this.data
      let removedTodo = data.todos[idx];
      let index = data.todos.indexOf(removedTodo);
      data.todos.splice(index, 1);
      if (data.mongoOn) {
        http._$deleteTodoById(removedTodo.id);
      } else {
        cache._$deleteTodoById(removedTodo.id);
      }
      // console.log(`remove todo-${removedTodo.id}`)
    },
    editTodo: function (idx) {
      let data = this.data
      // console.log('container edit')
      if (data.mongoOn) { 
        http._$editTodo(data.todos[idx]);
      } else {
        cache._$editTodo(data.todos[idx]);
      }
      data.activeTodos = this.todoSelector(data.list);
    },
    todoSelector: function (type) {
      let data = this.data
      data.list = type
      console.log(`type is ${type}`)
      console.log(this)
      switch (type) {
        case 'all':
          return data.todos;
        case 'active':
          return data.todos.filter( e => {
            return !e.completed;
          });
        case 'compeleted':
          return data.todos.filter( e => {
            return e.completed;
          });
      };
    },
    computed: {
      completedTodos: function (data) {
        return data.todos.filter(e => {
          return e.completed;
        })
      },
      uncompletedTodos: function (data) {
        return data.todos.filter(e => {
          return !e.completed;
        })
      },
      completedLength: "this.completedTodos.length",
      activeCount: "this.uncompletedTodos.length",
      allCompleted: {
        get: function (data) {
          return data.todos.length === this.completedLength
        },
        set: function (sign, data) {
          // console.log(`sign is ${sign}`)
          data.todos.forEach(function (todo) {
            todo.completed = sign;
            if (data.mongoOn) {
              http._$editTodo(todo);
            } else {
              cache._$editTodo(todo);
            }
          });
          this.data.list = 'all'
        }
      }
    }
  });
  Regular.event('enter', function (elem, fire) {
    function update(ev) {
      if (ev.which == 13) {
        ev.preventDefault();
        fire(ev);
      }
    }
    dom.on(elem, 'keypress', update);
    return function destroy() {
      dom.off(elem, 'keypress', update);
    }
  });
  Regular.event('esc', function (elem, fire) {
    function update(ev) {
      if (ev.which == 27) {
        ev.preventDefault();
        fire(ev);
      }
    }
    dom.on(elem, 'keydown', update);
    return function destroy() {
      dom.off(elem, 'keydown', update);
    }
  });
  return TodoApp;
});