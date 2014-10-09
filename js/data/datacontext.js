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
    'lessonModule',
    'lessonSummaryModule',
    'lessonMapModule',
    'commentsModel',
    'lessonProvider',
    'moduleProvider',
    'setProvider',
    'pageProvider',
    'questionProvider',
    'userProvider'
  ])
  .config(['breezeProvider', function(breezeProvider) {
    // Convert server-side PascalCase to client-side camelCase property names - note, this doesn't work in my use case
    //breezeProvider.NamingConvention.camelCase.setAsDefault();
    //// configure to use the model library for Angular
    //breezeProvider.initializeAdapterInstance("modelLibrary", "backingStore", true);
  }])
  .factory('breezeService', ['breeze','$q', function (breeze, $q) {
    console.log('STARTING DATA SERVICE');

    var keyGen = breeze.AutoGeneratedKeyType.Identity;
    var namespace = '';
    
    var readyDeferred = $q.defer(), 
        whenReady = readyDeferred.promise;
    
    var DT = breeze.DataType;
    var BOOL = DT.Boolean;
    var DATE = DT.DateTime;
    var ID = DT.Int32;
    var manager = createManager();
    
    var service = {
      manager: manager,
      whenReady: whenReady, // promise that resolves when the breeze service is ready to return entities
      getEntities: getEntities,
      getEntityByID: getEntityByID
    };

    initializeDatacontext();

    return service;

    //////////////////////////////////

    function createManager(){
      try {
        var qo = new breeze.QueryOptions({
          mergeStrategy: breeze.MergeStrategy.PreserveChanges 
        });
        // create a new manager talking to our api 
        var ds = new breeze.DataService({
          serviceName: "http://localhost/duke-quest/public/breeze/api"
        });

        var manager = new breeze.EntityManager({
          dataService: ds,
          queryOptions: qo,
        });

        return manager;
      }
      catch(err) {
          console.log(err);
      }   
      
    }

    /**
     * Sets up the breeze service fetching any data that is needed for the application to start
     */
    function initializeDatacontext() {
        manager.fetchMetadata()
               .then(
                function () {
                  readyDeferred.resolve();
                  // do success stuff;
                }
                ,function (error) {
                  readyDeferred.reject(error);
                  // do error stuff;
               });
    }
     

    /**
     * Retrieves a single entity by ID
     * Setting forceRemote will always query server
     * @param  {string} entity          serverside entity class e.g. 'EUser'
     * @param  {integer} entityId       unique id for this entity
     * @param  {array} eagerAttributes  related models to load
     * @param  {boolean} forceRemote    ignore caching
     * @return {object}                 Entity
     */
    var entityQueryCache = {};
    function getEntityByID(entity, entityId, eagerAttributes, forceRemote){
      entityId = entityId ? entityId : 1;

      var query = breeze.EntityQuery.from(entity)
                                    .where('id', 'eq', entityId)
                                    .expand(eagerAttributes);

/*      var isInCache = entityQueryCache[entity+entityId];
      if (isInCache && !forceRemote) {
        query = query.using(breeze.FetchStrategy.FromLocalCache);
      } else {
        entityQueryCache[entity+entityId] = true;
        query = query.using(breeze.FetchStrategy.FromServer);
      }                         */
      
      return manager.executeQuery(query) 
                                  .then(success, failed);
    }


    /**
     * Fetches all entities of a given type from the server
     * @param  {[type]} entity          [description]
     * @param  {[type]} where           [description]
     * @param  {[type]} eagerAttributes [description]
     * @return {[type]}                 [description]
     */
    function getEntities(entity, where, eagerAttributes){

      var query = breeze.EntityQuery.from(entity)
                                    .expand(eagerAttributes);
      for (var i = 0; i < where.length; i++) {
        query = query.where(where[i][0], where[i][1], where[i][2]);
      }
      
      return manager.executeQuery(query) 
                    .then(success, failed);
    }

    function success(data) {
      // return the query results directly
      return data.results;
    }

    function failed(error) {
      console.log("Query failed: " + error.message);
      return $q.reject(error.message);
    }   

  }]);

})();