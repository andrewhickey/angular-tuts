(function() {

var journal = angular
  .module('journalModule', ['ui.router'])
  .config( function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('journal.view', {
        url: "/view"
      })
      .state('journal.view_id', {
        url: "/view/{entryId}",
        templateUrl: "partials/journal/viewJournalEntryDetails.html",
        controller: 'journalViewEntryController'
      })
      .state('journal.edit_id', {
        url: "/edit/{entryId}",
        templateUrl: "partials/journal/viewJournalEntryDetails.html",
        controller: 'journalViewEntryController'
      })
      .state('journal.compose', {
        url: "/compose",
        templateUrl: "partials/journal/journalEntryForm.html",
        controller: 'journalComposeEntryController'
      })
  })

  .directive('journalPopover', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/journal/journal.html',
      controller: function($scope, journalService, $stateParams, $state) {
        $scope.journal_entries = [];

        init();
        function init() {

          $scope.journal_entries = journalService.getEntries();
          if ($state.current.name === 'journal.view' && $scope.journal_entries.length > 0) $state.go('journal.view_id', {entryId: $scope.journal_entries[0].id} );

        }
      }
    };
  })
  .controller('journalViewEntryController', function($scope, journalService, $stateParams) {
    $scope.journal_entry = {};
    init();
    function init() {
      $scope.journal_entry = journalService.getEntry($stateParams.entryId);
    }
  })
  .controller('journalComposeEntryController', function($scope, journalService, $stateParams, $state) {
    $scope.entry = {};
    $scope.submitEntry = function() {
      $scope.entry = journalService.addEntry({
        user_id: 1,
        title: $scope.entry.title,
        body: $scope.entry.body
      });
      $state.go('journal.view_id',{entryId: $scope.entry.id})
    };
    init();
    function init() {
      if($stateParams.entryId) {
        $scope.journal_entry = journalService.getEntry($stateParams.entryId);
      }
    }
  });

})();