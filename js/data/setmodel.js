(function() {
  var User = angular
  .module('setModel',[])
  
  .factory('setService', function($filter) {
    var service = {};
    var sets = [
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
      },
      {
        id: 3,
        title: "Assignment",
        module_id: 1
      },
      {
        id: 4,
        title: "Data",
        module_id: 1
      },
      {
        id: 5,
        title: "Assignment",
        module_id: 1
      },
      {
        id: 6,
        title: "Data",
        module_id: 1
      },
      {
        id: 7,
        title: "Assignment 2",
        module_id: 1
      },
      {
        id: 8,
        title: "Data 2",
        module_id: 1
      },
      {
        id: 9,
        title: "Assignment 3",
        module_id: 1
      },
      {
        id: 10,
        title: "Data 3",
        module_id: 1
      },
      {
        id: 11,
        title: "Assignment",
        module_id: 1
      },
      {
        id: 12,
        title: "Data",
        module_id: 1
      }
    ];
    
    service.getSets = function(module_id) {
      module_id = parseInt(module_id);
      var found = $filter('filter')(sets, {lesson_id: module_id}, true);
      return found;
    }

    service.getSet = function(set_id) {
      set_id = parseInt(set_id);
      var found = $filter('filter')(sets, {id: set_id}, true);
      return found[0];
    }

    return service;
  });

})();