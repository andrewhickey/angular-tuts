(function() {

var profile = angular
  .module('lessonMapModule', ['ui.router'])
  

  .directive('lessonMap', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/lesson/lessonmap.html',
      controller: function($scope, breezeService) {
        $scope.lessons = [];
        init();
        function init() {
          breezeService.getEntities('ELesson', [['instance_id', 'eq', 1]]).then(function(data){
            $scope.lessons = data;
          });
        }
      }
    };
  });

})();