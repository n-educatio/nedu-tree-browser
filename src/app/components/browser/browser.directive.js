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
      replace: true,

      link: function ($scope, element, attr) {
        $scope.$on("changeEndpoints", function (event, endpoints) {

          var newConfig = angular.extend({}, $scope.vm.config);
          newConfig.endpoints = endpoints;

          $scope.vm.ntb = new $scope.vm.neduTreeBrowser(newConfig);
        });
      }
    };

    return directive;

    /** @ngInject */
    function NtbBrowserController(neduTreeBrowser) {
      var vm = this;

      vm.neduTreeBrowser = neduTreeBrowser;

      vm.ntb = new neduTreeBrowser(vm.config);

    }
  }

})();
