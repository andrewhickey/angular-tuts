(function() {
  var Lesson = angular
  .module('lessonProvider',[])
  
  .factory('lessonService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getLesson: getLesson,
      getLessons: getLessons
    };

    
    function getLesson(lessonId){
      lessonId = lessonId ? lessonId : 1;
      return breezeService.manager.fetchEntityByKey ('ELesson', lessonId, true);
    }

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