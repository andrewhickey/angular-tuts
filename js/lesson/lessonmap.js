(function() {

var profile = angular
  .module('lessonMapModule', ['ui.router'])
  

  .directive('lessonMap', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/lesson/lessonmap.html',
      controller: function($scope, lessonService) {
        $scope.lessons = [];
        init();
        function init() {
          $scope.lessons = lessonService.getLessons();
        }
      }
    };
  });

})();