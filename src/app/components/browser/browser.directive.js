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
        config: "="
      },
      controller: NtbBrowserController,
      controllerAs: 'vm',
      bindToController: true,
      replace: true
    };

    return directive;

    /** @ngInject */
    function NtbBrowserController(neduTreeBrowser) {
      var vm = this;

      vm.ntb = new neduTreeBrowser(vm.config);

    }
  }

})();
