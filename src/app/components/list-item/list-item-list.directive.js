(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbListItemList', ntbListItem);

  /** @ngInject */
  function ntbListItem() {
    var directive = {
      restrict: 'A',
      templateUrl: 'app/components/list-item/list-item-list.html',
      scope: {
        item: "=ntbListItemList",
        type: "=",
        ntb: "="
      }
    };

    return directive;

  }

})();
