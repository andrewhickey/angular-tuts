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
        views: {
          "profile-left-pane": { templateUrl: "partials/profile/profileSummary.html" },
          "profile-right-pane": {
            templateUrl: "partials/profile/profileDetails.html",
            controller: 'ProfileDetailsController'
          }
        }
      })

      .state('profile.personal_business_quest', {
        url: "/personalquest",
        views: {
          "profile-left-pane": { templateUrl: "partials/profile/profileSummary.html" },
          "profile-right-pane": {
            templateUrl: "partials/profile/personalBusinessQuestProfile.html",
            data: {
              commentable_name: 'personal_quest'
            }  
          }
        }
      })

      .state('profile.focus_areas', {
        url: "/focusareas",
        views: {
          "profile-left-pane": { templateUrl: "partials/profile/profileSummary.html" },
          "profile-right-pane": {
            templateUrl: "partials/profile/focusAreasProfile.html",
            data: {
              commentable_name: 'focus_areas'
            }  
          }
        }
      })

      .state('profile.notifications', {
        url: "/notifications",
        views: {
          "profile-left-pane": { 
            templateUrl: "partials/profile/notificationsList.html",
            controller: 'ProfileNotificationsController'
          },
          "profile-right-pane": {
            templateUrl: "partials/profile/notificationProfile.html"
          }
        }
      })

      .state('profile.notifications_id', {
        url: "/notifications/{notificationId}",
        views: {
          "profile-left-pane": { 
            templateUrl: "partials/profile/notificationsList.html",
            controller: 'ProfileNotificationsController'
          },
          "profile-right-pane": {
            templateUrl: "partials/profile/notificationProfile.html",
            controller: 'ProfileNotificationsController'
          }
        }
      })
  })

  .directive('profilePopout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/profile/profile.html',
      controller: function($scope, userFactory) {
        $scope.user = {};
        init();
        function init() {
          $scope.user = userFactory.getUser();
        }
      }
    };
  })

  .controller('ProfileNotificationsController', function($scope, notificationsFactory, $stateParams){
    $scope.notifications = [];
    $scope.active_notification = {};

    init();
    function init() {
      $scope.notifications = notificationsFactory.getNotifications();
      
      if($stateParams.notificationId) {
        $scope.active_notification = notificationsFactory.getNotification($stateParams.notificationId);
      }
    }

  })

  .controller('ProfileDetailsController', function($scope){
    $scope.profile_edit_mode = false;
    $scope.setEditMode = function(value) {
      $scope.profile_edit_mode = value;

      init();
      function init() {
        $scope.user = userFactory.getUser();
      }
    };
  })

  .directive('talkingPoint', function(){
    return {
      restrict: 'E',
      scope: { commentable: '=' },
      templateUrl: 'partials/profile/profileTalkingPoint.html'
    };
  });



 



})();