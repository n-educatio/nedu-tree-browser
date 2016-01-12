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
        item: "=ntbListItemList"
      },
      controller: NtbListItemController
    };

    return directive;

    /** @ngInject */
    function NtbListItemController() {
      
    }
  }

})();
