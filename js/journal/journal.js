(function() {

var journal = angular
  .module('journalModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/journal/view");
    
    $stateProvider
      .state('journal.view', {
        url: "/view"
      })
      .state('journal.view_id', {
        url: "/view/{entryId}",
        templateUrl: "partials/journal/viewJournalEntryDetails.html",
        controller: function($scope, journalFactory, $stateParams) {
          $scope.journal_entry = {};

          init();
          function init() {
            $scope.journal_entry = journalFactory.getEntry($stateParams.entryId);
          }
        }
      })
  })

  .directive('journalPopout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/journal/journal.html',
      controller: function($scope, journalFactory, $stateParams) {
        $scope.journal_entries = [];

        init();
        function init() {
          $scope.journal_entries = journalFactory.getEntries();
        }

      }
    };

  });

})();