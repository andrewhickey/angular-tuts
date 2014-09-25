(function(){
  
  var entries = angular
  .module('entriesContextModule',[])
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
    };

    service.getEntry = function(entry_id) {
      entry_id = parseInt(entry_id);
      var entries = service.getEntries();
      var found = $filter('filter')(service.getEntries(), {id: entry_id}, true);
      return found[0];
    };

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
      //return deferred.promise;
    };

    return service;

  });
  
})();