NEJ.define([
  'base/klass',
  'util/event',
  'util/ajax/xdr'
], function (_k, _t, _x, _p) {
  _p._$makeGUID = function () {
    function S4 () {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    let guid = S4() + '-' + S4() + '-' + S4() + '-'+ S4()
    console.log(`new guid is ${guid}`)
    return guid;
  };
  _p._$getAllTodos = function (cb) {
    _x._$request('/todo/get_all', {
      sync: false,
      type: 'json',
      method: 'get',
      mode: 0,
      // timeout: 1000,
      onload: function (_data) {
        console.log('http onload finish')
        let isMongoEnable = _data.code !== 2
        if (Object.prototype.toString.call(cb).slice(8, -1) == 'Function') {
          cb(_data.data, isMongoEnable);
        }
        console.log(_data);
        alert(_data.message)
      },
      onerror: function (_error) {
        console.log({_error})
        alert(_error)
      }
    });
  };
  _p._$addTodo = function (newTodo) {
    _x._$request('/todo/new', {
      sync: false,
      type: 'json',
      method: 'post',
      data: newTodo,
      mode: 0
    });
  };
  _p._$deleteTodoById = function (id) {
    _x._$request('/todo/del/' + id, {
      sync: false,
      type: 'json',
      method: 'delete',
      mode: 0
    });
  };
  _p._$editTodo = function (editedTodo) {
    _x._$request('/todo/update', {
      sync: false,
      type: 'json',
      method: 'put',
      data: editedTodo,
      mode: 0
    });
  }
  return _p;
});