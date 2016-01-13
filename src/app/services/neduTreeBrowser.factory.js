(function() {
  'use strict';

  angular
      .module('neduTreeBrowser')
      .factory('neduTreeBrowser', neduTreeBrowser);

  /** @ngInject */
  function neduTreeBrowser(ntbConfig, $resource) {

    var ntbFactory = function (config) {

      var ntb = this;

      ntb.config = {};
      angular.extend(ntb.config, ntbConfig, config);



      /**
       * folders tree
       */

      ntb.folderTree = [];

      var getFoldersTree = function () {

        var params = {};
        if (typeof ntb.config.endpoints.tree.params !== "undefined") {
          params = angular.extend(params, ntb.config.endpoints.tree.params);
        }

        $resource(ntb.config.endpoints.tree.url, params)
          .query()
          .$promise
          .then(
            function (resp) {
              ntb.folderTree = resp;
              getElements(resp[0].id);
            },
            function (resp) {
              console.log("Error loading folder tree", resp);
            }
          );
      };

      getFoldersTree();



      /**
       * folder contents
       */

      ntb.currentFolder = {
        id: null,
        elements: {
          folders: [],
          items: []
        }
      };

      var getElements = function (id) {

        ntb.currentFolder.id = id;

        var params = {};
        if (typeof ntb.config.endpoints.folder.params !== "undefined") {
          params = angular.extend(params, ntb.config.endpoints.folder.params);
        }
        params = angular.extend(params, {id: id});

        $resource(ntb.config.endpoints.folder.url, params, { query: { isArray: false }})
          .query()
          .$promise
          .then(
            function (resp) {
              ntb.currentFolder.elements.folders = resp.folders;
              ntb.currentFolder.elements.items = resp.items;
            },
            function (resp) {
              console.log("Error loading folder", resp);
            }
          );

      };

      ntb.browseTo = function (folderId) {
        getElements(folderId);
      };

      return ntb;

    };

    return ntbFactory;

  }

})();