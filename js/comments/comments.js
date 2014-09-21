(function() {

  /**
   *  Contains elements to allow commenting on commentable objects and to display a list of those comments
   **/
  var comments = angular.module('commentsModule', ['ui.router']);

  // <comments></comments> will expand to a list of comments with a form to add more
  // requires commentable to be in the parent scope
  comments.directive('comments', function(commentsFactory) {
    return {
        restrict: "E",
        controller: function ($scope) {
          $scope.comments = [];
          $scope.new_comment = {};

          $scope.addComment = function() {
            $scope.comments.push({body: $scope.new_comment.body});
            $scope.new_comment = {};
          };

          init();
          function init() {
            $scope.comments = commentsFactory.getComments($scope.commentable.id);
          };

        },
        templateUrl: 'partials/comments/commentsList.html'
    };
  });

})();