(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .constant('ntbConfig', {
      endpoints: {
        tree: {
          url: null,
          params: {}
        },
        folder: {
          url: null,
          params: {}
        }
      },
      treeBrowseMethod: "click",  //["click", "ui.router"],
      displayAs: "table",         //["table", "list"]
      selectionCallback: function () {}
    });

})();
