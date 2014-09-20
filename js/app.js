(function() {
 

  var questApp = angular
  
  .module('quest',['ui.router', 'profileModule', 'journalModule'])

  .config( function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/profile/view");
    $stateProvider
      .state('profile', {
        url: "/profile",
        views: {
          "popout-view": { template: "<profile-popout></profile-popout>" }
        }
      })
      .state('journal', {
        url: "/journal",
        views: {
          "popout-view": { template: "<journal-popout></journal-popout>" },
        }
      })
  })

  .run(
    ['$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications. For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      }
    ]
  )

  .factory('userFactory', function() {
    var factory = {};
    var user = {
      fname: 'Andrew', 
      lname: 'Hickey', 
      email: 'andrew.hickey@ht2.co.uk',
      image: 'profile.jpg',
      company: 'HT2 ltd',
      about_me: 'I am an ex-dog who decided to become human.',
      areas_of_interest: 'Bones, food, despoiling things.',
      education: 'Trained to sit on command and roll over when given treats',
      strengths_experiences: 'I am extremely strong in the running around department but weak in cognitive areas'
    };  

    factory.getUser = function(value) {
      return value ? {} : user;
    }
    return factory;
  })

  .factory('journalFactory', function() {
    var factory = {};
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
      
    factory.getEntries = function() {
      return entries;
    }

    return factory;
  });



})();