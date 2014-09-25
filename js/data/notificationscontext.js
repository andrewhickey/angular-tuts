(function() {
  var notifcations = angular
  .module('notificationsContextModule',[])
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
    };

    service.getNotification = function(notification_id) {
      notification_id = parseInt(notification_id);
      var found = $filter('filter')(service.getNotifications(), {id: notification_id}, true);
      return found[0];
    };

    return service;
  });

})();