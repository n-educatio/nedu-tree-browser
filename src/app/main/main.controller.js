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
          url: "/something/:foo",
          params: { foo: "foo123" }
        },
        folder: {
          url: "/something/:foo/:id",
          params: { foo: "foo123" }
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
