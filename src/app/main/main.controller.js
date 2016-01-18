(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    var vm = this;

    vm.changeEndpoints = function () {
      $scope.$broadcast("changeEndpoints", {
        tree: {
          url: "/fixtures/:param/tree.json",
          params: { param: "test" }
        },
        folder: {
          url: "/fixtures/:param/:id.json",
          params: { param: "test" }
        }
      });
    };

    vm.ntbConfig1 = {
      endpoints: {
        tree: {
          url: "/fixtures/tree.json",
          params: {}
        },
        folder: {
          url: "/fixtures/:id.json",
          params: {}
        }
      },
      displayAs: "table",
      columns: [
        { key: "id", i18n: "Id" },
        { key: "name", i18n: "Name", hasIcon: true, hasLink: true }
      ],
      selectionCallback: function (item) {
        console.log(item.id, item.name, "has been selected");
      }
    };

  }
})();
