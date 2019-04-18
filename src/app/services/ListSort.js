angular.module( 'neduTreeBrowser')
.controller()
.service( 'ListSort', ["ListSortType", function (ListSortType) {
  return {
    sortRules: {
      breadcrumbs: ListSortType.USER_FRIENDLY_SORT,
      username: ListSortType.USER_FRIENDLY_SORT,
      name: ListSortType.USER_FRIENDLY_SORT,
      id: ListSortType.USER_FRIENDLY_SORT,
      created_by: ListSortType.USER_FRIENDLY_SORT,
      modified_by: ListSortType.USER_FRIENDLY_SORT,
      status: ListSortType.STATUS_SORT,
      tags: ListSortType.TAGS_SORT
    },

    statusesOrder: {},

    sortByKey: function(key, order) {
      var sortType = this.sortRules[key] || ListSortType.SIMPLE_SORT;

      if(sortType === ListSortType.SIMPLE_SORT) {
        return this.simpleSort(key, order);
      }
      if(sortType === ListSortType.USER_FRIENDLY_SORT) {
        return this.userFriendlySort(key, order);
      }
      if(sortType === ListSortType.STATUS_SORT) {
        return this.statusSort(key, order);
      }
      if(sortType === ListSortType.TAGS_SORT) {
        return this.tagsSort(key, order);
      }
    },

    simpleSort: function(key, order) {
      return function(elementA, elementB) {
        var a = elementA[key];
        var b = elementB[key];
        if(!a) {
          return order;
        }
        if(!b) {
          return -order;
        }
        return a.localeCompare(b) * order;
      };
    },

    userFriendlySort: function(key, order) {
      var compare = new Intl.Collator(['en', 'pl'], {
        numeric: true
      }).compare;

      return function(elementA, elementB) {
        return compare(elementA[key], elementB[key]) * order;
      };
    },

    statusSort: function(key, order) {
      var t = this;
      return function(elementA, elementB) {
        var a = elementA[key];
        var b = elementB[key];
        var orderA = t.statusesOrder[a] || 0;
        var orderB = t.statusesOrder[b] || 0;

        return (orderA - orderB) * order;
      };
    },

    tagsSort: function(key, order) {
      return function(elementA, elementB) {
        var a = elementA[key];
        var b = elementB[key];
        if(!a || !a.length) {
          return order;
        }
        if(!b || !b.length) {
          return -order;
        }

        return a.join(' ').localeCompare(b.join(' ')) * order;
      };
    }
  };
}]);
