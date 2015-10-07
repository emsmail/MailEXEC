angular
  .module('app')
  .controller('TodoController', ['$scope', '$state', 'ToDo', function($scope,
      $state, ToDo) {
    $scope.todos = [];
    function getTodos() {
      ToDo
        .find()
        .$promise
        .then(function(results) {
          $scope.todos = results;
        });
    }
    getTodos();

    $scope.addTodo = function() {
      ToDo
        .create($scope.newTodo)
        .$promise
        .then(function(todo) {
          $scope.newTodo = '';
          $scope.todoForm.content.$setPristine();
          $('.focus').focus();
          getTodos();
        });
    };

    $scope.removeTodo = function(item) {
      ToDo
        .deleteById(item)
        .$promise
        .then(function() {
          getTodos();
        });
    };
  }]);
