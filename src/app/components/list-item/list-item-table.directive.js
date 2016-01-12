(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbListItemTable', ntbListItem);

  /** @ngInject */
  function ntbListItem() {
    var directive = {
      restrict: 'A',
      templateUrl: 'app/components/list-item/list-item-table.html',
      scope: {
        item: "=ntbListItemTable",
        type: "="
      },
      require: "^ntbBrowser",
      link: function ($scope, element, attrs, browserController) {

        $scope.ntb = browserController.ntb;

        //console.log($scope);

      }
    };

    return directive;

  }

})();
