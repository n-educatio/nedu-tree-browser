(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, neduTreeBrowser) {
    var vm = this;


    vm.endpoints = [
      { id: 1,
        url1: "/fixtures/tree.json",
        url2: "/fixtures/:id.json",
        params: {}
      },
      { id: 2,
        url1: "/fixtures/:param/tree.json",
        url2: "/fixtures/:param/:id.json",
        params: { param: "test" }
      }
    ];

    vm.selectedEndpoint = vm.endpoints[0];

    vm.changeEndpoints = function () {

      vm.ntbConfig.endpoints = {
        tree: {
          url: vm.selectedEndpoint.url1,
          params: vm.selectedEndpoint.params
        },
        folder: {
          url: vm.selectedEndpoint.url2,
          params: vm.selectedEndpoint.params
        }
      };

      vm.ntbInstance = new neduTreeBrowser(vm.ntbConfig);
    };

    vm.displayTypes = [
      { id: 1,
        name: "list"
      },
      { id: 2,
        name: "table"
      }
    ];

    vm.selectedDisplayType = vm.displayTypes[0];

    vm.changeDisplayType = function () {
      vm.ntbConfig.displayAs = vm.selectedDisplayType.name;

      vm.ntbInstance = new neduTreeBrowser(vm.ntbConfig);
    };

    vm.changeCheckbox = function () {
      vm.ntbConfig.isCheckBoxList = vm.selectedCheckBoxList;

      vm.ntbInstance = new neduTreeBrowser(vm.ntbConfig);
    };

    vm.addColumn = function () {
      vm.ntbConfig.columns.push({ key: "", i18n: "", hasIcon: false, hasLink: false});
    };

    vm.removeColumn = function (index) {
      vm.ntbConfig.columns.splice(index, 1);
    };

    vm.ntbConfig = {
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
      isCheckBoxList: false,
      columns: [
        { key: "id", i18n: "Id" },
        { key: "name", i18n: "Name", hasIcon: true, hasLink: true }
      ],
      selectionAllCallback: function () {
        console.log("Items have been selected");
      },
      selectionCallback: function (item) {
        console.log(item.id, item.name, "has been selected");
      },
      addSelectedCheckbox: function () {
        console.log("Items have been added");
      },
      i18n: {
        "select_all": "Select all",
        "add_los": "Add learning objects"
      },
      buttons: [
        {
          class: "btn btn-primary btn-xs",
          icon: "glyphicon glyphicon-pencil",
          text: "Edit",
          action: function () { console.log("Edit clicked!"); }
        },
        {
          class: "btn btn-primary btn-xs",
          icon: "glyphicon glyphicon-eye-open",
          text: null,
          action: function () { console.log("Preview clicked!"); }
        }
      ]
    };


    vm.ntbInstance = new neduTreeBrowser(vm.ntbConfig);


  }
})();
