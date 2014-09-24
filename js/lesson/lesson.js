(function() {

var lesson = angular
  .module('lessonModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('lesson.view.module', {
        url: "/module/{moduleId}",
        views: {
          'module-view': {
            templateUrl: 'partials/lesson/module.html',
            controller: 'moduleController'
          }
        },
        sticky: true
      })
      .state('lesson.view.module.set', {
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
        },
        sticky: true
      })
      .state('lesson.view.module.set.page', {
        url: "/page/{pageId}",
        views: {
          'page-view': {
            templateUrl: 'partials/lesson/page.html',
            controller: 'PageController'
          }
        },
        sticky: true
      })
      .state('lesson.view.module.set.question', {
        url: "/question/{questionId}",
        views: {
          'question-view': {
            templateUrl: 'partials/lesson/question.html',
            controller: 'QuestionController'
          }
        },
        sticky: true
      });
  })

  .directive('lessonPopout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/lesson/lesson.html',
      controller: 'lessonController'
    };
  })
  .controller('lessonController', function($scope, $stateParams, lessonService) {
    $scope.lesson = {};
    init();
    function init() {
      $scope.lesson = lessonService.getLesson($stateParams.lessonId);
    }
  })
  .controller('moduleController', function($scope, $stateParams, moduleService) {
    $scope.module = {};
    init();
    function init() {
      $scope.module = moduleService.getModule($stateParams.moduleId);
    }
  })

  .controller('SetController', function($scope, $stateParams, setService) {
    $scope.set = {};
    init();
    function init() {
      $scope.set = setService.getSet($stateParams.setId);
    }
  })

  .controller('PageController', function($scope, $stateParams, pageService) {
    $scope.page = {};
    init();
    function init() {
      $scope.page = pageService.getPage($stateParams.pageId);
    }
  })

  .controller('QuestionController', function($scope, $stateParams, questionService) {
    $scope.question = {};
    init();
    function init() {
      $scope.question = questionService.getQuestion($stateParams.questionId);
    }
  });
  


})();

