(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController() {
    var vm = this;

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
      displayAs: "list",
      selectionCallback: function (item) {
        console.log(item.id, item.name, "has been selected");
      }
    };

  }
})();
