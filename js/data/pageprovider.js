(function() {
  angular.module('pageProvider',[])
  
  .factory('pageService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getPage: getPage,
      getPages: getPages
    };
    
    function getPage(pageId){
      pageId = pageId ? pageId : 1;
      return breezeService.manager.fetchEntityByKey ('EPage', pageId, true);
    }

    function getPages(){
      var query = new breeze.EntityQuery()
                            .from('EPage');
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