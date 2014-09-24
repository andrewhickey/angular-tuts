(function() {
  var User = angular
  .module('lessonModel',[])
  
  .factory('lessonService', function($filter, moduleService) {
    var service = {};
    var lessons = [
      {
        id: 1,
        title: 'Lesson 1',
        description: 'The first lesson in an exciting chain of lessons',
        modules: [
          {
            id: 1,
            title: 'Framing',
            lesson_id: 1,
            description: 'The first module in an exciting chain of modules'
          },
          {
            id: 2,
            title: 'Engaging',
            lesson_id: 1,
            description: 'Things are starting to get a bit more advanced'
          },
          {
            id: 3,
            title: 'Processing',
            lesson_id: 1,
            description: 'Things are starting to get a bit more advanced'
          }
        ]        
      },
      {
        id: 2,
        title: 'Lesson 2',
        description: 'Things are starting to get a bit more advanced',
        modules: [
          {
            id: 1,
            title: 'Framing',
            lesson_id: 2,
            description: 'The first module in an exciting chain of modules'
          },
          {
            id: 2,
            title: 'Engaging',
            lesson_id: 2,
            description: 'Things are starting to get a bit more advanced'
          },
          {
            id: 3,
            title: 'Processing',
            lesson_id: 2,
            description: 'Things are starting to get a bit more advanced'
          },
        ]
      },
    ];

    service.getLessons = function() {
      return lessons;
    }

    service.getLesson = function(lesson_id) {
      lesson_id = parseInt(lesson_id);
      var found = $filter('filter')(service.getLessons(), {id: lesson_id}, true);
      return found[0];
    }

    return service;
  });

})();