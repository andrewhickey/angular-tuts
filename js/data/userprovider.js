(function() {
  var User = angular
  .module('userProvider',[])
  
  .factory('userService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getUser: getUser
    };

    
    function getUser(userId){
      userId = userId ? userId : 1;
      return breezeService.manager.fetchEntityByKey ('EUser', userId, true);
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