(function() {
  angular.module('questionProvider',[])
  
  .factory('questionService', ['breeze' , 'breezeService', function (breeze, breezeService) {
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      getQuestion: getQuestion,
      getQuestions: getQuestions
    };
    
    function getQuestion(questionId){
      questionId = questionId ? questionId : 1;
      return breezeService.manager.fetchEntityByKey ('EQuestion', questionId, true);
    }

    function getQuestions(){
      var query = new breeze.EntityQuery()
                            .from('EQuestion');
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