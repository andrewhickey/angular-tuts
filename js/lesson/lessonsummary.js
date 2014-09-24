(function() {

var journal = angular
  .module('lessonSummaryModule', ['ui.router'])

  .directive('lessonSummaryPopout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/lesson/lessonsummary.html',
      controller: 'lessonSummaryController'
    };
  })
  
  .controller('lessonSummaryController', function($scope, lessonService, $stateParams) {
    $scope.lesson = {};
    init();
    function init() {
      $scope.lesson = lessonService.getLesson($stateParams.lessonId);
    }
  });
  

})();