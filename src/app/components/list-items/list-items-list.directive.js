(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbListItemsList', ntbListItems);

  /** @ngInject */
  function ntbListItems() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/list-items/list-items-list.html',
      scope: {
        contents: "=",
        ntb: "="
      }
    };

    return directive;

  }

})();
