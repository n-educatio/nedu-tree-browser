(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .directive('ntbTree', ntbTree);

  /** @ngInject */
  function ntbTree(ntbRecursionHelper) {
    var directive = {
      scope: { folders: "=", ntb: "=" },
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/tree/tree.html',
      require: "^ntbBrowser",
      compile: function(element) {
        return ntbRecursionHelper.compile(element, function ($scope, element, attrs, browserController) {

          //$scope.ntb = browserController.ntb;

        });
      }
    };

    return directive;

  }

})();
