(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbListItemsTable', ntbListItems);

  /** @ngInject */
  function ntbListItems() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/list-items/list-items-table.html',
      scope: {
        contents: "="
      },
      require: "^ntbBrowser",
      link: function ($scope, element, attrs, browserController) {

        $scope.ntb = browserController.ntb;

      }
    };

    return directive;

  }

})();
