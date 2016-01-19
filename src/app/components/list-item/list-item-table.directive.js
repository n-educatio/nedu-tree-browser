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
        type: "=",
        ntb: "="
      }
    };

    return directive;

  }

})();
