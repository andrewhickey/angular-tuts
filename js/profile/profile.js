(function() {

var profile = angular
  .module('profileModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/profile/view");
    //$urlRouterProvider.when('/profile', '/profile/view');
    
    $stateProvider
      .state('profile.view', {
        url: "/view",
        templateUrl: "partials/profile/viewProfileDetails.html",
      })
      .state('profile.personal_business_quest', {
        url: "/personalquest",
        templateUrl: "partials/profile/personalBusinessQuestProfile.html"
      })
      .state('profile.focus_areas', {
        url: "/focusareas",
        templateUrl: "partials/profile/focusAreasProfile.html"
      })
      .state('profile.notifications', {
        url: "/notifications",
        templateUrl: "partials/profile/notificationsProfile.html",
        controller: function($scope) {
          $scope.things = ["A", "Set", "Of", "Things"];
        }
      });
  })

  .directive('profilePopout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/profile/profile.html',
      controller: function($scope, userFactory) {
        
        $scope.tab = 1;
        $scope.user = {};

        init();
        function init() {
          $scope.user = userFactory.getUser();
        }

        $scope.setTab = function(value) {
          $scope.tab = value;
        }

        $scope.isTab = function(value) {
          return $scope.tab === value;
        }
      }
    };
  });

})();