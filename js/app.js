(function() {

  angular.module('quest',[
    'ui.router',
    'ct.ui.router.extras',
    'ngAnimate',
    'profileModule',
    'journalModule',
    'commentsModule',
    'breezeDataModule'
  ])

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/profile/view");
    $stateProvider
      .state('root', {
        url: '/',
        views: {
          "root-view": { templateUrl: 'root.html' },
        },
        resolve: {
          // waits for the breeze service to finish loading before loading the state and any sub states
          breezeReady:  function(breezeService) { 
            return breezeService.whenReady;
          }
        }

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