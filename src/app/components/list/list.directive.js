(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbList', ntbList);

  /** @ngInject */
  function ntbList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/list/list.html',
      scope: {
        contents: "=",
        displayAs: "=",
        ntb: "="
      },
      controller: NtbListController
    };

    return directive;

    /** @ngInject */
    function NtbListController() {

    }
  }

})();
