(function() {
  var User = angular
  .module('pageModel',[])
  
  .factory('pageService', function($filter) {
    var service = {};
    var pages = [
      {
        id: 1,
        set_id: 1,
        title: 'Page 1',
        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.'
      },
      {
        id: 2,
        set_id: 1,
        title: 'Page 2',
        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.'
      },
      {
        id: 3,
        set_id: 2,
        title: 'Page 3',
        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.'
      },
      {
        id: 4,
        set_id: 2,
        title: 'Page 4',
        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quisquam, quaerat veritatis. Nam animi culpa, debitis magni corrupti incidunt rem omnis ex vero ullam, recusandae qui? Minus ratione illo quod.'
      },
    ];
    
    service.getPages = function(set_id) {
      set_id = parseInt(set_id);
      var found = $filter('filter')(pages, {set_id: set_id}, true);
      return found;
    }

    service.getPage = function(page_id) {
      page_id = parseInt(page_id);
      var found = $filter('filter')(pages, {id: page_id}, true);
      return found[0];
    }

    return service;
  });

})();