!function(){"use strict";angular.module("neduTreeBrowser",["ngResource","ui.bootstrap"])}(),function(){"use strict";function e(e){var t={scope:{folders:"=",ntb:"="},restrict:"E",replace:"true",templateUrl:"app/components/tree/tree.html",require:"^ntbBrowser",compile:function(t){return e.compile(t)}};return t}e.$inject=["ntbRecursionHelper"],angular.module("neduTreeBrowser").directive("ntbTree",e)}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/components/list-items/list-items-table.html",scope:{contents:"=",ntb:"="}};return e}angular.module("neduTreeBrowser").directive("ntbListItemsTable",e)}(),function(){"use strict";function e(){var e={restrict:"E",templateUrl:"app/components/list-items/list-items-list.html",scope:{contents:"=",ntb:"="}};return e}angular.module("neduTreeBrowser").directive("ntbListItemsList",e)}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/components/list-item/list-item-table.html",scope:{item:"=ntbListItemTable",type:"=",ntb:"="}};return e}angular.module("neduTreeBrowser").directive("ntbListItemTable",e)}(),function(){"use strict";function e(){var e={restrict:"A",templateUrl:"app/components/list-item/list-item-list.html",scope:{item:"=ntbListItemList",type:"=",ntb:"="}};return e}angular.module("neduTreeBrowser").directive("ntbListItemList",e)}(),function(){"use strict";function e(){function e(){}var t={restrict:"E",templateUrl:"app/components/list/list.html",scope:{contents:"=",displayAs:"=",ntb:"="},controller:e};return t}angular.module("neduTreeBrowser").directive("ntbList",e)}(),function(){"use strict";function e(){function e(){}var t={restrict:"E",templateUrl:"app/components/browser/browser.html",scope:{ntb:"="},controller:e,controllerAs:"vm",bindToController:!0,replace:!0};return t}angular.module("neduTreeBrowser").directive("ntbBrowser",e)}(),function(){"use strict";function e(e){return{compile:function(t,n){angular.isFunction(n)&&(n={post:n});var o,i=t.contents().remove();return{pre:n&&n.pre?n.pre:null,post:function(t,s){o||(o=e(i)),o(t,function(e){s.append(e)}),n&&n.post&&n.post.apply(null,arguments)}}}}}e.$inject=["$compile"],angular.module("neduTreeBrowser").factory("ntbRecursionHelper",e)}(),function(){"use strict";function e(e,t,n,o){var i=function(i){var s=this;s.config={},s.selectAll=!1,angular.extend(s.config,e,i),s.currentFolder={id:null,parent:null,elements:{folders:[],items:[]}},s.browseTo=function(e){s.currentFolder.id=e,s.selectAll=!1;var i={};"undefined"!=typeof s.config.endpoints.folder.params&&(i=angular.extend(i,s.config.endpoints.folder.params)),i=angular.extend(i,{id:e}),t(s.config.endpoints.folder.url,i,{query:{isArray:!1}}).query().$promise.then(function(e){s.currentFolder.elements.folders=e.folders.sort(o.sortByKey("name",1)),s.currentFolder.elements.items=e.items.sort(o.sortByKey("name",1)),s.currentFolder.parent=e.parent_id},function(e){n.debug("Error loading folder",e)})},s.isSelectedCheckbox=function(){return s.currentFolder.elements.items.some(function(e){return e.checked})},s.folderTree=[];var r=function(){if("undefined"!=typeof s.config.endpoints.tree){var e={};"undefined"!=typeof s.config.endpoints.tree.params&&(e=angular.extend(e,s.config.endpoints.tree.params)),t(s.config.endpoints.tree.url,e).query().$promise.then(function(e){s.folderTree=e,s.browseTo(e[0].id)},function(e){n.debug("Error loading folder tree",e)})}else s.folderTree=s.config.rawData.tree,s.config.rawData.tree.length&&s.config.rawData.tree[0].id&&s.browseTo(s.config.rawData.tree[0].id)};return r(),s};return i}e.$inject=["ntbConfig","$resource","$log","ListSort"],angular.module("neduTreeBrowser").factory("neduTreeBrowser",e)}(),angular.module("neduTreeBrowser").service("ListSortType",function(){return{SIMPLE_SORT:0,USER_FRIENDLY_SORT:1,STATUS_SORT:2,TAGS_SORT:3}}),angular.module("neduTreeBrowser").controller().service("ListSort",["ListSortType",function(e){return{sortRules:{breadcrumbs:e.USER_FRIENDLY_SORT,username:e.USER_FRIENDLY_SORT,name:e.USER_FRIENDLY_SORT,id:e.USER_FRIENDLY_SORT,created_by:e.USER_FRIENDLY_SORT,modified_by:e.USER_FRIENDLY_SORT,status:e.STATUS_SORT,tags:e.TAGS_SORT},statusesOrder:{},sortByKey:function(t,n){var o=this.sortRules[t]||e.SIMPLE_SORT;return o===e.SIMPLE_SORT?this.simpleSort(t,n):o===e.USER_FRIENDLY_SORT?this.userFriendlySort(t,n):o===e.STATUS_SORT?this.statusSort(t,n):o===e.TAGS_SORT?this.tagsSort(t,n):void 0},simpleSort:function(e,t){return function(n,o){var i=n[e],s=o[e];return i?s?i.localeCompare(s)*t:-t:t}},userFriendlySort:function(e,t){var n=new Intl.Collator(["en","pl"],{numeric:!0}).compare;return function(o,i){return n(o[e],i[e])*t}},statusSort:function(e,t){var n=this;return function(o,i){var s=o[e],r=i[e],l=n.statusesOrder[s]||0,c=n.statusesOrder[r]||0;return(l-c)*t}},tagsSort:function(e,t){return function(n,o){var i=n[e],s=o[e];return i&&i.length?s&&s.length?i.join(" ").localeCompare(s.join(" "))*t:-t:t}}}}]),function(){"use strict";function e(e,t){var n=this;n.endpoints=[{id:1,url1:"/fixtures/tree.json",url2:"/fixtures/:id.json",params:{}},{id:2,url1:"/fixtures/:param/tree.json",url2:"/fixtures/:param/:id.json",params:{param:"test"}}],n.selectedEndpoint=n.endpoints[0],n.changeEndpoints=function(){n.ntbConfig.endpoints={tree:{url:n.selectedEndpoint.url1,params:n.selectedEndpoint.params},folder:{url:n.selectedEndpoint.url2,params:n.selectedEndpoint.params}},n.ntbInstance=new t(n.ntbConfig)},n.displayTypes=[{id:1,name:"list"},{id:2,name:"table"}],n.selectedDisplayType=n.displayTypes[0],n.changeDisplayType=function(){n.ntbConfig.displayAs=n.selectedDisplayType.name,n.ntbInstance=new t(n.ntbConfig)},n.changeCheckbox=function(){n.ntbConfig.isCheckBoxList=n.selectedCheckBoxList,n.ntbInstance=new t(n.ntbConfig)},n.addColumn=function(){n.ntbConfig.columns.push({key:"",i18n:"",hasIcon:!1,hasLink:!1})},n.removeColumn=function(e){n.ntbConfig.columns.splice(e,1)},n.ntbConfig={endpoints:{tree:{url:"/fixtures/tree.json",params:{}},folder:{url:"/fixtures/:id.json",params:{}}},displayAs:"list",isCheckBoxList:!1,columns:[{key:"id",i18n:"Id"},{key:"name",i18n:"Name",hasIcon:!0,hasLink:!0}],selectionAllCallback:function(){console.log("Items have been selected")},selectionCallback:function(e){console.log(e.id,e.name,"has been selected")},changeLoCallback:function(e){console.log(e.id,e.name,"has been changed")},addSelectedCheckbox:function(){console.log("Items have been added")},i18n:{select_all:"Select all",add_los:"Add learning objects"},buttons:[{"class":"btn btn-primary btn-xs",icon:"glyphicon glyphicon-pencil",text:"Edit",action:function(){console.log("Edit clicked!")}},{"class":"btn btn-primary btn-xs",icon:"glyphicon glyphicon-eye-open",text:null,action:function(){console.log("Preview clicked!")}}]},n.ntbInstance=new t(n.ntbConfig)}e.$inject=["$scope","neduTreeBrowser"],angular.module("neduTreeBrowser").controller("MainController",e)}(),function(){"use strict";function e(){}angular.module("neduTreeBrowser").run(e)}(),function(){"use strict";angular.module("neduTreeBrowser").constant("ntbConfig",{endpoints:{tree:{url:null,params:{}},folder:{url:null,params:{}}},treeBrowseMethod:"click",displayAs:"table",sortTreeKey:"name",sortListKey:"name",isCheckBoxList:!1,columns:[{key:"id",i18n:"Id"},{key:"name",i18n:"Name",hasIcon:!0,hasLink:!0}],i18n:{select_all:"",add_los:""},selectionAllCallback:function(){},selectionCallback:function(){},changeLoCallback:function(){},addSelectedCheckbox:function(){}})}(),function(){"use strict";function e(e){e.debugEnabled(!0)}e.$inject=["$logProvider"],angular.module("neduTreeBrowser").config(e)}(),angular.module("neduTreeBrowser").run(["$templateCache",function(e){e.put("app/components/browser/browser.html",'<div class="ntb-browser"><div class="ntb-folders-wrapper"><ntb-tree folders="vm.ntb.folderTree" ntb="vm.ntb"></ntb-tree></div><div class="ntb-list-wrapper"><ntb-list contents="vm.ntb.currentFolder" display-as="vm.ntb.config.displayAs" ntb="vm.ntb"></ntb-list></div></div>'),e.put("app/components/list/list.html",'<div class="ntb-list"><ntb-list-items-table ng-if="displayAs === \'table\'" contents="contents" ntb="ntb"></ntb-list-items-table><ntb-list-items-list ng-if="displayAs === \'list\'" contents="contents" ntb="ntb"></ntb-list-items-list></div>'),e.put("app/components/list-item/list-item-list.html",'<span ng-if="type === \'item\' && ntb.config.isCheckBoxList"><input type="checkbox" ng-change="ntb.config.changeLoCallback(item)" ng-model="item.checked" id="{{ item.id }}" class="list-group-checkbox"></span> <span ng-repeat="column in ntb.config.columns"><i class="glyphicon glyphicon-folder-close" ng-if="column.hasIcon && type === \'folder\'"></i> <i class="glyphicon glyphicon-file" ng-if="column.hasIcon && type === \'item\'"></i> {{ item[column.key] }}</span> <span ng-if="ntb.config.buttons && ntb.config.buttons.length && type === \'item\'" class="pull-right"><button ng-repeat="button in ntb.config.buttons" class="{{ button.class }}" ng-click="button.action($event, item)"><i ng-if="button.icon" class="{{ button.icon }}"></i> {{ button.text ? button.text : \'\'}}</button></span>'),e.put("app/components/list-item/list-item-table.html",'<td ng-repeat="column in ntb.config.columns"><a ng-if="type === \'folder\' && column.hasLink && ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: item.id})"><i class="glyphicon glyphicon-folder-open" ng-if="column.hasIcon"></i> {{ item[column.key] }}</a> <a ng-if="type === \'folder\' && column.hasLink && ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(item.id)"><i class="glyphicon glyphicon-folder-open" ng-if="column.hasIcon"></i> {{ item[column.key] }}</a> <a ng-if="type === \'item\' && column.hasLink" ng-click="ntb.config.selectionCallback(item)"><i class="glyphicon glyphicon-file" ng-if="column.hasIcon"></i> {{ item[column.key] }}</a> <span ng-if="type === \'folder\' && !column.hasLink"><i class="glyphicon glyphicon-folder-open" ng-if="column.hasIcon"></i> {{ item[column.key] }}</span> <span ng-if="type === \'item\' && !column.hasLink"><i class="glyphicon glyphicon-file" ng-if="column.hasIcon"></i> {{ item[column.key] }}</span></td><td ng-if="ntb.config.buttons && ntb.config.buttons.length"><button ng-if="type === \'item\'" ng-repeat="button in ntb.config.buttons" class="{{ button.class }}" ng-click="button.action($event, item)"><i ng-if="button.icon" class="{{ button.icon }}"></i> {{ button.text ? button.text : \'\' }}</button></td>'),e.put("app/components/list-items/list-items-list.html",'<div class="list-group-select-all"><span ng-if="ntb.config.isCheckBoxList && contents.elements.items.length !== 0"><input type="checkbox" ng-model="ntb.selectAll" class="select-all-checkbox" ng-click="ntb.config.selectionAllCallback()"> {{ ntb.config.i18n.select_all }}</span> <button ng-if="ntb.config.isCheckBoxList && contents.elements.items.length !== 0 && ntb.isSelectedCheckbox()" class="add-selected-checkbox btn-primary pull-right" ng-click="ntb.config.addSelectedCheckbox()">{{ ntb.config.i18n.add_los }}</button></div><div class="list-group"><a class="list-group-item" ng-if="contents.parent && ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: contents.parent})">..</a> <a class="list-group-item" ng-if="contents.parent && ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(contents.parent)">..</a> <a ng-repeat="item in contents.elements.folders | orderBy: ntb.config.sortListKey" ntb-list-item-list="item" type="\'folder\'" ntb="ntb" class="list-group-item" ng-if="ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: item.id})"></a> <a ng-repeat="item in contents.elements.folders | orderBy: ntb.config.sortListKey" ntb-list-item-list="item" type="\'folder\'" ntb="ntb" class="list-group-item" ng-if="ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(item.id)"></a> <a ng-repeat="item in contents.elements.items | orderBy: ntb.config.sortListKey" ntb-list-item-list="item" type="\'item\'" ntb="ntb" class="list-group-item" ng-click="ntb.config.selectionCallback(item)"></a></div>'),e.put("app/components/list-items/list-items-table.html",'<table class="table"><thead><tr><th ng-repeat="column in ntb.config.columns">{{ column.i18n }}</th><th ng-if="ntb.config.buttons && ntb.config.buttons.length"></th></tr></thead><tbody><tr ng-if="contents.parent"><td colspan="{{ ntb.config.columns.length }}"><a ng-if="ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: contents.parent})">..</a> <a ng-if="ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(contents.parent)">..</a></td><td ng-if="ntb.config.buttons && ntb.config.buttons.length"></td></tr><tr ng-repeat="item in contents.elements.folders | orderBy: \'name\'" ntb-list-item-table="item" type="\'folder\'" ntb="ntb"></tr><tr ng-repeat="item in contents.elements.items | orderBy: \'name\'" ntb-list-item-table="item" type="\'item\'" ntb="ntb"></tr></tbody></table>'),e.put("app/components/tree/tree.html",'<ul class="ntb-folder-list"><li ng-repeat="folder in folders | orderBy: ntb.config.sortTreeKey"><a ng-if="ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: folder.id})" ui-sref-active="active"><i class="glyphicon glyphicon-folder-open"></i> {{ folder.name }}</a> <a ng-if="ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(folder.id)"><i class="glyphicon glyphicon-folder-open"></i> {{ folder.name }}</a><ntb-tree ng-if="folder.folders.length" folders="folder.folders" ntb="ntb"></ntb-tree></li></ul>')}]);
//# sourceMappingURL=../maps/scripts/app-8b9e8ad74f.js.map
