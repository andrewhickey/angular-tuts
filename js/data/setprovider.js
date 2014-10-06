(function() {
  angular.module('setProvider',[])
  
  .factory('setService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getSet: getSet,
      getSets: getSets
    };
    
    function getSet(setId){
      setId = setId ? setId : 1;
      return breezeService.manager.fetchEntityByKey ('ESet', setId, true);
    }

    function getSets(){
      var query = new breeze.EntityQuery()
                            .from('ESet');
                            //.where('name', '==', 'Workouts');
                            
      return breezeService.manager.executeQuery(query) // returns a promise
             .then(success, failed);
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