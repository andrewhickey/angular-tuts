(function() {
  angular.module('moduleProvider',[])
  
  .factory('moduleService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getModule: getModule,
      getModules: getModules
    };

    
    function getModule(moduleId){
      moduleId = moduleId ? moduleId : 1;
      return breezeService.manager.fetchEntityByKey ('EModule', moduleId, true);
    }

    function getModules(){
      var query = new breeze.EntityQuery()
                            .from('EModule');
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