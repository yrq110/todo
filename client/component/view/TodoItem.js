NEJ.define([
  'regular!./TodoItem.html'
], function (tpl) {

  var TodoItem = Regular.extend({
    name: 'todoItem',
    template: tpl,
    // editing todo
    editing: function () {
      var data = this.data;
      data.cache = data.todo.title;
      data.todo.editing = true;
      this.$refs.edit.focus();
      // this.$refs.edit.select();
    },
    // edit todo
    editTodo: function () {
      var todo = this.data.todo;
      if (!todo.editing) {
        return;
      } else {
        todo.editing = false;
      }
      todo.title = todo.title.trim();
      if (todo.title === '') {
        this.$emit('remove');
      } else {
        this.$emit('edit');
      }
    },
    cancelEdit: function () {
      var todo = this.data.todo;
      todo.title = this.data.cache;
      todo.editing = false;
    },
    toggle: function () {
      console.log('item toggle')
      this.data.todo.completed = !this.data.todo.completed;
      this.$emit('toggle');
    }
  });

  return TodoItem;
});