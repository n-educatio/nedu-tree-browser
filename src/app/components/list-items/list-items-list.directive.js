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
      },
      require: "^ntbBrowser",
      link: function ($scope, element, attrs, browserController) {

        $scope.ntb = browserController.ntb;

      }
    };

    return directive;

  }

})();
