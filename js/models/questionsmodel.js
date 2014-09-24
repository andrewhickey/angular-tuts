(function() {
  var User = angular
  .module('questionsModel',[])
  
  .factory('questionService', function($filter) {
    var service = {};
    var questions = [
      {
        id: 1,
        set_id: 1,
        title: 'Question 1',
        order: 1,
        challenge: 'Now that you\'ve had a feel of the good stuff what are your thoughts?'
      },
      {
        id: 2,
        set_id: 1,
        title: 'Question 2',
        order: 2,
        challenge: 'I really can\'t think of anything relevant.'
      },
      {
        id: 3,
        set_id: 2,
        title: 'Question 3',
        order: 1,
        challenge: 'Now that you\'ve had a feel of the good stuff what are your thoughts?'
      },
      {
        id: 4,
        set_id: 2,
        title: 'Question 4',
        order: 2,
        challenge: 'I really can\'t think of anything relevant.'
      },
    ];
    
    service.getQuestions = function(set_id) {
      set_id = parseInt(set_id);
      console.log(set_id);
      var found = $filter('filter')(questions, {set_id: set_id}, true);
      console.log(found);
      return found;
    }

    service.getQuestion = function(question_id) {
      question_id = parseInt(question_id);
      var found = $filter('filter')(questions, {id: question_id}, true);
      return found[0];

    }

    return service;
  });

})();