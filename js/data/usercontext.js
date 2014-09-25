(function() {

  questApp.factory('setService', function($filter) {
    var service = {
      addPropertyChangeHandler: addPropertyChangeHandler,
      createTodo: createTodo,
      deleteTodo: deleteTodo,
      getTodos: getTodos,
      hasChanges: hasChanges,
      purge: purge,
      reset: reset,
      saveChanges: saveChanges
    };

  });

})();