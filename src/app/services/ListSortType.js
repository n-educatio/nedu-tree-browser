angular.module( 'neduTreeBrowser')
.service('ListSortType', function () {
  return {
    SIMPLE_SORT: 0,
    USER_FRIENDLY_SORT: 1,
    STATUS_SORT: 2,
    TAGS_SORT: 3
  };
});
