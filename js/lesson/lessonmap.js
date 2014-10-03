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
          lessonService.getLessons().then(function(data){ 
            console.log(data);
            $scope.lessons = data;
            console.log($scope.lessons);
          });
        }
      }
    };
  });

})();