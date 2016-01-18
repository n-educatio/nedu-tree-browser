(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbBrowser', ntbBrowser);

  /** @ngInject */
  function ntbBrowser() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/browser/browser.html',
      scope: {
        ntb: "="
      },
      controller: NtbBrowserController,
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function NtbBrowserController() {

      //var vm = this;

    }
  }

})();
