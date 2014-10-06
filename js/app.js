(function() {

  angular.module('quest',[
    'ui.router',
    'ct.ui.router.extras',
    'profileModule',
    'journalModule',
    'commentsModule',
    'breezeDataModule'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
        }
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
      });
  }])

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
  );

})();