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
      columns: [
        { key: "id", i18n: "Id" },
        { key: "name", i18n: "Name", hasIcon: true, hasLink: true }
      ],
      selectionCallback: function () {}
    });

})();
