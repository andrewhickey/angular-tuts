(function() {
  var breezeDataModule = angular
  .module('breezeDataModule',
    [
    'breeze.angular',
    'notificationsContextModule',
    'entriesContextModule',
    'profileModule',
    'journalModule',
    'commentsModule',
    'lessonModel',
    'lessonModule',
    'lessonSummaryModule',
    'lessonMapModule',
    'commentsModel',
    'moduleModel',
    'setModel',
    'pageModel',
    'questionsModel',
    'userProvider'
  ])
  .config(['breezeProvider', function(breezeProvider) {
    // Convert server-side PascalCase to client-side camelCase property names - note, this doesn't work in my use case
    //breezeProvider.NamingConvention.camelCase.setAsDefault();
    //// configure to use the model library for Angular
    //breezeProvider.initializeAdapterInstance("modelLibrary", "backingStore", true);
  }])
  .factory('breezeService', ['breeze', function (breeze, $q) {
    var keyGen = breeze.AutoGeneratedKeyType.Identity;
    var namespace = '';
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
      
    var service = {
      manager: createManager()
    };

    //////////////////////////////////

    function createManager(){
      
      // create a new manager talking to our api 
      var ds = new breeze.DataService({
          serviceName: "http://localhost/duke-quest/public/breeze/api"
      });
      var manager = new breeze.EntityManager({dataService: ds});

      return manager;
    }
     

    function getLessons(){
      //manager.fetchEntityByKey("ELesson", 1);

      var query = new breeze.EntityQuery()
                            .from('ELesson')
                            .where('name', '==', 'Workouts');
                            
      manager.executeQuery(query) // returns a promise
             .then(success, failed);       
    }

    function success(data) {
      
        var thisIsaDemo = true;
        
        if (thisIsaDemo){
          console.log("Retrieved " + data.results.length + " pages.");
          
          // demonstrate that these query results are also entities in cache
          var cachedMembers = manager.getEntities('ELesson');

          console.log("There are " + cachedMembers.length + " pages in cache"); 
          return cachedMembers; // return the cached entities

        } else {
          // return the query results directly
          return data.results;
        }
    }

    function failed(error) {
      console.log("Query failed: " + error.message);
      return $q.reject(error.message);
    }   

    
    return service;
  }]);

})();