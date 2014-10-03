(function() {
  var User = angular
  .module('talkingPointProvider',[])
  
  .factory('talkingPointService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getComments: getComments,
      addComment: addComment
    };

    
    function getUser(userId){
      userId = userId ? userId : 1;
      return breezeService.manager.fetchEntityByKey('ETalkingPoint', userId);
    }

    function success(data) {
      return data.results;
    }

    function failed(error) {
      console.log("Query failed: " + error.message);
      return $q.reject(error.message);
    }   
    
    return service;
  }]);

})();