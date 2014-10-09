(function() {

var journal = angular
  .module('lessonSummaryModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lesson_summary', {
        url: "summary/{lessonId}",
        parent: 'root',
        views: {
          'lesson-summary-modal-view': { 
            templateUrl: 'partials/lesson/lessonsummary.html',
            controller: 'lessonSummaryController'
          }
        }
      });
  })
  
  .controller('lessonSummaryController', function($scope, breezeService, $stateParams) {
    $scope.lesson = {};
    init();
    function init() {
      breezeService.getEntityByID('ELesson', $stateParams.lessonId, ['modules']).then(function(data){
        $scope.lesson = data[0];
      });
    }
  });
  

})();