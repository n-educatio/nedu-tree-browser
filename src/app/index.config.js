(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
