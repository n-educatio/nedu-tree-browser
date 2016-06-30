(function() {
  'use strict';

  angular
      .module('neduTreeBrowser')
      .factory('neduTreeBrowser', neduTreeBrowser);

  /** @ngInject */
  function neduTreeBrowser(ntbConfig, $resource, $log) {

    var ntbFactory = function (config) {

      var ntb = this;

      ntb.config = {};
      angular.extend(ntb.config, ntbConfig, config);



      /**
       * folders tree
       */

      ntb.folderTree = [];

      var getFoldersTree = function () {

        if (typeof ntb.config.endpoints.tree !== "undefined") {

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
                ntb.browseTo(resp[0].id);
              },
              function (resp) {
                $log.debug("Error loading folder tree", resp);
              }
            );

        } else {

          ntb.folderTree = ntb.config.rawData.tree;

        }
      };

      getFoldersTree();



      /**
       * folder contents
       */

      ntb.currentFolder = {
        id: null,
        parent: null,
        elements: {
          folders: [],
          items: []
        }
      };

      ntb.browseTo = function (id) {

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
              ntb.currentFolder.parent = resp.parent_id;
            },
            function (resp) {
              $log.debug("Error loading folder", resp);
            }
          );

      };

      return ntb;

    };

    return ntbFactory;

  }

})();
