(function() {

  /**
   *  Contains elements to allow commenting on commentable objects and to display a list of those comments
   **/
  var comments = angular.module('commentsModule', ['ui.router']);

  // <comments></comments> will expand to a list of comments with a form to add more
  // requires commentable to be in the parent scope
  comments.directive('comments', function(commentsService) {
    return {
        restrict: "E",
        scope: { commentable: '=' },
        controller: function ($scope, $filter) {
          $scope.comments = [];
          $scope.new_comment = {};

          $scope.addComment = function() {
            commentsService.addComment({body: $scope.new_comment.body, commentable_id: $scope.commentable.id})
            $scope.comments = commentsService.getComments($scope.commentable.id);
            $scope.new_comment = {};
          };

          init();
          function init() {
            $scope.comments = commentsService.getComments($scope.commentable.id);
          };

        },
        templateUrl: 'partials/comments/commentsList.html'
    };
  });

})();