(function() {
 

  var questApp = angular
  
  .module('quest',['ui.router', 'profileModule', 'journalModule', 'commentsModule'])

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
      about_me: 'I am dog',
      areas_of_interest: 'Bones, food.',
      education: 'Trained to sit on command and roll over when given treats',
      strengths_experiences: 'I am extremely strong in the running around department but weak in cognitive areas',
      personal_quest: {
        id: 1,
        body: 'I look to find all of the sticks.'
      },
      focus_areas: {
        id: 2,
        body: 'I am really focused on eating.'
      },
    };  

    factory.getUser = function(value) {
      return value ? {} : user;
    }
    return factory;
  })

  .factory('journalFactory', function( $filter ) {
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

    factory.getEntry = function(entry_id) {
      entry_id = parseInt(entry_id);
      var entries = factory.getEntries();
      var found = $filter('filter')(factory.getEntries(), {id: entry_id}, true);
      return found[0];
    }

    return factory;
  })
  
  .factory('notificationsFactory', function( $filter ) {
    var factory = {};
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
      
    factory.getNotifications = function() {
      return notifications;
    }

    factory.getNotification = function(notification_id) {
      notification_id = parseInt(notification_id);
      var found = $filter('filter')(factory.getNotifications(), {id: notification_id}, true);
      return found[0];
    }

    return factory;
  })


  .factory('commentsFactory', function( $filter ) {
    var factory = {};
    var comments = [
      {
        id: 1,
        commentable_id: 1,
        user_id: 1,
        body: 'I think this is a really interesting discussion point.'
      },
      {
        id: 2,
        commentable_id: 1,
        user_id: 1,
        body: 'I think this is another really interesting discussion point.'
      },
      {
        id: 3,
        commentable_id: 2,
        user_id: 1,
        body: 'This is a comment on another discussion point.'
      }
    ];
      
    factory.getComments = function(commentable_id) {
      notification_id = parseInt(commentable_id);
      var found = $filter('filter')(comments, {commentable_id: commentable_id}, true);
      return found;
    }

    return factory;
  });

})();