(function() {
  var User = angular
  .module('moduleModel',[])
  
  .factory('moduleService', function($filter) {
    var service = {};
    var modules = [
      {
        id: 1,
        title: 'Framing',
        lesson_id: 1,
        description: 'The first module in an exciting chain of modules',
        sets: [
          {
            id: 1,
            title: "Assignment",
            pages: [
              {
                id: 1,
                set_id: 1,
                title: 'Page 1',
                template: '<h1>Champion company background</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.</p>'
              },
              {
                id: 2,
                set_id: 1,
                title: 'Page 2',
                template: '<h1>Champion company background</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.</p>'
              },
            ],
            questions: [
              {
                id: 1,
                set_id: 1,
                title: 'Question 1',
                challenge: 'How many legs does a rabbit have?'
              },
              {
                id: 2,
                set_id: 1,
                title: 'Question 2',
                template: 'How many legs does a spider have?'
              },
            ]    
          },
          {
            id: 2,
            title: "Data",           
            pages: [
              {
                id: 3,
                set_id: 2,
                title: 'Page 3',
                template: '<h1>Champion company background</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.</p>'
              },
              {
                id: 4,
                set_id: 2,
                title: 'Page 4',
                template: '<h1>Champion company background</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.</p>'
              },
            ],
            questions: [
              {
                id: 3,
                set_id: 2,
                title: 'Question 3',
                challenge: 'How many legs does a rabbit have?'
              },
              {
                id: 4,
                set_id: 2,
                title: 'Question 4',
                template: 'How many legs does a spider have?'
              },
            ]    
          }

        ]
      },
      {
        id: 2,
        title: 'Engaging',
        lesson_id: 1,
        description: 'Things are starting to get a bit more advanced',
        sets: [
          {
            id: 3,
            title: "Assignment"            
          },
          {
            id: 4,
            title: "Data"            
          }
        ]
      },
      {
        id: 3,
        title: 'Processing',
        lesson_id: 1,
        description: 'Things are starting to get a bit more advanced',
        sets: [
          {
            id: 5,
            title: "Assignment"            
          },
          {
            id: 6,
            title: "Data"            
          }
        ]
      },
      {
        id: 3,
        title: 'Framing',
        lesson_id: 2,
        description: 'The first module in an exciting chain of modules',
        sets: [
          {
            id: 7,
            title: "Assignment 2"            
          },
          {
            id: 8,
            title: "Data 2"            
          }
        ]
      },
      {
        id: 4,
        title: 'Engaging',
        lesson_id: 2,
        description: 'Things are starting to get a bit more advanced',
        sets: [
          {
            id: 9,
            title: "Assignment 3"            
          },
          {
            id: 10,
            title: "Data 3"            
          }
        ]
      },
      {
        id: 5,
        title: 'Processing',
        lesson_id: 2,
        description: 'Things are starting to get a bit more advanced',
        sets: [
          {
            id: 11,
            title: "Assignment"            
          },
          {
            id: 12,
            title: "Data"            
          }
        ]
      },
    ];
    
    service.getModules = function(lesson_id) {
      notification_id = parseInt(lesson_id);
      var found = $filter('filter')(modules, {lesson_id: lesson_id}, true);
      return found;
    }

    service.getModule = function(module_id) {
      module_id = parseInt(module_id);
      var found = $filter('filter')(modules, {id: module_id}, true);
      return found[0];

    }

    return service;
  });

})();