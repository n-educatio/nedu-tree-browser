(function() {
  'use strict';

  angular
    .module('neduTreeBrowser')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
