(function() {
  angular.module('lessonProvider',[])
  


/*.factory('ExtendedService', function($http, BasicService){

    var extended = angular.extend(BasicService, {})
    extended.method = function() {
        // ...
    }
    return extended;
}*/

  .factory('lessonService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;

    var service = {
    };
    

    function getLessons(){
      var query = new breeze.EntityQuery()
                            .from('ELesson');
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