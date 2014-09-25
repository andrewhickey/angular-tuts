(function() {

var profile = angular
  .module('profileModule', ['ui.router', 'breezeDataModule'])
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
        },
        deepStateRedirect: true,
        sticky: true
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
        },
        deepStateRedirect: true,
        sticky: true
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
        },
        deepStateRedirect: true,
        sticky: true
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
        },
        deepStateRedirect: true,
        sticky: true
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
      });
  })

  .directive('profilePopover', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/profile/profile.html',
      controller: function($scope, userService, breezeService) {
        $scope.members = [];
        
        breezeService.getMembers().then( function(members) {
          $scope.message = 'Got '+ members.length+ ' Members';
          $scope.members = members;
          angular.forEach($scope.members, function(page) {
            console.log(page.set());
          });
          console.log(breezeService.filterPages());
        });



        $scope.user = {};
        init();
        function init() {
          $scope.user = userService.getUser();
        }
      }
    };
  })

  .controller('ProfileNotificationsController', function($scope, notificationsService, $stateParams, $state){
    $scope.notifications = [];
    $scope.active_notification = {};

    init();
    function init() {
      $scope.notifications = notificationsService.getNotifications();
      
      if($stateParams.notificationId) {
        $scope.active_notification = notificationsService.getNotification($stateParams.notificationId);
      } 

      if ($state.current.name === 'profile.notifications' && $scope.notifications.length > 0) $state.go('profile.notifications_id', {notificationId: $scope.notifications[0].id} );
    }

  })

  .controller('ProfileDetailsController', function($scope){
    $scope.profile_edit_mode = false;
    $scope.setEditMode = function(value) {
      $scope.profile_edit_mode = value;

      init();
      function init() {
        $scope.user = userService.getUser();
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