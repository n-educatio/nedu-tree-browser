(function() {
  'use strict';

  angular
      .module('neduTreeBrowser')
      .factory('neduTreeBrowser', neduTreeBrowser);

  /** @ngInject */
  function neduTreeBrowser(ntbConfig, $resource, $log, ListSort) {

    var ntbFactory = function (config) {

      var ntb = this;

      ntb.config = {};
      ntb.selectAll = false;
      angular.extend(ntb.config, ntbConfig, config);


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
        ntb.selectAll = false;
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
            ntb.currentFolder.elements.folders = resp.folders.sort(ListSort.sortByKey('name', 1));
            ntb.currentFolder.elements.items = resp.items.sort(ListSort.sortByKey('name', 1));
            ntb.currentFolder.parent = resp.parent_id;
          },
          function (resp) {
            $log.debug("Error loading folder", resp);
          }
        );

      };

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
          if (ntb.config.rawData.tree.length && ntb.config.rawData.tree[0].id) {
            ntb.browseTo(ntb.config.rawData.tree[0].id);
          }

        }
      };

      getFoldersTree();

      return ntb;

    };

    return ntbFactory;

  }

})();
