(function() {

var lesson = angular
  .module('lessonModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lesson', {
        url: "lesson/{lessonId}",
        parent: 'root',
        views: {
          'lesson-modal-view': { 
            templateUrl: "partials/lesson/lesson.html",
            controller: 'lessonSummaryController'
          }
        },
        deepStateRedirect: true
      })
      .state('lesson.module', {
        url: "/module/{moduleId}",
        views: {
          'module-view': {
            templateUrl: 'partials/lesson/module.html',
            controller: 'ModuleController'
          }
        }
      })
      .state('lesson.module.set', {
        url: "/set/{setId}",
        views: {
          'set-pages-view': {
            templateUrl: 'partials/lesson/setPages.html',
            controller: 'SetController'
          },
          'set-questions-view': {
            templateUrl: 'partials/lesson/setQuestions.html',
            controller: 'SetController'
          }
        }
      })
      .state('lesson.module.set.page', {
        url: "/page/{pageId}",
        views: {
          'page-view': {
            templateUrl: 'partials/lesson/page.html',
            controller: 'PageController'
          }
        }
      })
      .state('lesson.module.set.question', {
        url: "/question/{questionId}",
        views: {
          'question-view': {
            templateUrl: 'partials/lesson/question.html',
            controller: 'QuestionController'
          }
        }
      });
  })

  .controller('LessonController', function($scope, $stateParams, breezeService) {
    $scope.lesson = {};
    init();
    function init() {
      breezeService.getEntityByID('ELesson', $stateParams.lessonId, ['modules']).then(function(data){
        $scope.lesson = data[0];
      });
    }
  })
  .controller('ModuleController', function($scope, $stateParams, breezeService) {
    $scope.module = {};
    init();
    function init() {
      breezeService.getEntityByID('EModule', $stateParams.moduleId, ['sets','lesson']).then(function(data){
        $scope.module = data[0];
      });
    }
  })

  .controller('SetController', function($scope, $stateParams, breezeService) {
    $scope.set = {};
    init();
    function init() {
      breezeService.getEntityByID('ESet', $stateParams.setId, ['pages','questions']).then(function(data){
        $scope.set = data[0];
      });
    }
  })

  .controller('PageController', function($scope, $stateParams, breezeService) {
    $scope.page = {};
    init();
    function init() {
      breezeService.getEntityByID('EPage', $stateParams.pageId).then(function(data){
        $scope.page = data[0];
      });
    }
  })

  .controller('QuestionController', function($scope, $stateParams, breezeService) {
    $scope.question = {};
    init();
    function init() {
      breezeService.getEntityByID('EQuestion', $stateParams.questionId).then(function(data){
        $scope.question = data[0];
      });
    }
  });
  


})();

