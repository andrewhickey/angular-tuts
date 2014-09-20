(function() {

var journal = angular
  .module('journalModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    //$urlRouterProvider.otherwise("/journal/view");
    //$urlRouterProvider.when('/journal', '/journal/view');
    
    $stateProvider
      .state('journal.view', {
        url: "/view",
        templateUrl: "partials/journal/viewJournalEntryDetails.html",
      })
      .state('journal.view.id', {
        url: "/{entryId}",
        templateUrl: "partials/journal/viewJournalEntryDetails.html",
      })
  })

  .directive('journalPopout', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/journal/journal.html',
      controller: function($scope, journalFactory, $stateParams) {
        console.log($stateParams);
        $scope.journal_entries = [];

        init();
        function init() {
          $scope.journal_entries = journalFactory.getEntries();
          console.log($scope.journal_entries);
        }

      }
    };
  });

})();