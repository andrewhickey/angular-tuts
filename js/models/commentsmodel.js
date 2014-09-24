(function() {
  var User = angular
  .module('commentsModel',[])
  
  .factory('commentsService', function( $filter, $q, $http ) {
    var service = {};
    
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

    service.getComments = function(commentable_id) {
      notification_id = parseInt(commentable_id);
      var found = $filter('filter')(comments, {commentable_id: commentable_id}, true);
      return found;
    }

    service.addComment = function(comment) {
      var deferred = $q.defer();
      comments.push(comment);
      
      $http({
        method: 'JSONP',
        url: 'http://dummydata'
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(data){
        deferred.reject('There was an error');
      });

      return deferred.promise;
    }

    return service;
  });

})();