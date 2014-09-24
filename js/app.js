(function() {
 

  var questApp = angular
  
  .module('quest',['ui.router', 'ct.ui.router.extras', 'profileModule', 'journalModule', 'commentsModule', 'UserModel', 'lessonModel', 'lessonModule', 'lessonSummaryModule', 'lessonMapModule', 'commentsModel', 'moduleModel', 'setModel', 'pageModel', 'questionsModel'])

  .config( function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/profile/view");
    $stateProvider
      .state('popover', {
        url: '/popover',
        views: {
          "popover-view": { template: '<ui-view></ui-view>' },
        },
        onEnter: function($previousState){
          $previousState.memo("before-popover");
        },
      })
      .state('profile', {
        url: "/profile",
        parent: 'popover',
        template: "<profile-popover></profile-popover>",
        sticky: true
      })
      .state('journal', {
        url: "/journal",
        parent: 'popover',
        template: "<journal-popover></journal-popover>",
        sticky: true
      })

      .state('lesson', {
        url: "/lesson",
        abstract: true,
        views: {
          "popout-view": { template: '<ui-view></ui-view>' },
        },
        sticky: true
      })
      .state('lesson.view', {
        url: "/view/{lessonId}",
        template: "<lesson-popout></lesson-popout>",
        sticky: true
      })
      .state('lesson.summary', {
        url: "/summary/{lessonId}",
        template: "<lesson-summary-popout></lesson-summary-popout>",
        sticky: true
      })
  })

  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams, $previousState) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications. For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$previousState = $previousState;
      }
    ]
  )

  

  .factory('journalService', function( $filter, $http, $q ) {
    var service = {};
    var entries = [
      {
        id: 1,
        title: 'Practice 2 notes',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit rerum numquam provident ullam nemo ducimus itaque voluptatum doloribus, consectetur, consequuntur repudiandae fuga possimus ipsum, nulla vitae tenetur aliquid sapiente odit?'
      },
      {
        id: 2,
        title: 'Feedback from advisor 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit rerum numquam provident ullam nemo ducimus itaque voluptatum doloribus, consectetur, consequuntur repudiandae fuga possimus ipsum, nulla vitae tenetur aliquid sapiente odit?'
      },
    ];
    var i = 3;
    service.getEntries = function() {
      return entries;
    }

    service.getEntry = function(entry_id) {
      entry_id = parseInt(entry_id);
      var entries = service.getEntries();
      var found = $filter('filter')(service.getEntries(), {id: entry_id}, true);
      return found[0];
    }

    service.addEntry = function(entry) {
      var deferred = $q.defer();
      entry.id = i;
      i += 1;
      entries.push(entry);
      
      $http({
        method: 'JSONP',
        url: 'http://dummydata'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data){
        deferred.reject('There was an error');
      });
      return entry;
      return deferred.promise;
    }

    return service;
  })
  
  .factory('notificationsService', function( $filter ) {
    var service = {};
    var notifications = [
      {
        id: 1,
        title: 'Module completed',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit rerum numquam provident ullam nemo ducimus itaque voluptatum doloribus, consectetur, consequuntur repudiandae fuga possimus ipsum, nulla vitae tenetur aliquid sapiente odit?'
      },
      {
        id: 2,
        title: 'New content ',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit rerum numquam provident ullam nemo ducimus itaque voluptatum doloribus, consectetur, consequuntur repudiandae fuga possimus ipsum, nulla vitae tenetur aliquid sapiente odit?'
      }
    ];
      
    service.getNotifications = function() {
      return notifications;
    }

    service.getNotification = function(notification_id) {
      notification_id = parseInt(notification_id);
      var found = $filter('filter')(service.getNotifications(), {id: notification_id}, true);
      return found[0];
    }

    return service;
  });


  

})();