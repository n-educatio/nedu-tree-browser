!function(){"use strict";angular.module("neduTreeBrowser",["ngResource","ui.bootstrap"])}(),function(){"use strict";function t(t){var e={scope:{folders:"=",ntb:"="},restrict:"E",replace:"true",templateUrl:"app/components/tree/tree.html",require:"^ntbBrowser",compile:function(e){return t.compile(e)}};return e}t.$inject=["ntbRecursionHelper"],angular.module("neduTreeBrowser").directive("ntbTree",t)}(),function(){"use strict";function t(){var t={restrict:"E",templateUrl:"app/components/list-items/list-items-table.html",scope:{contents:"=",ntb:"="}};return t}angular.module("neduTreeBrowser").directive("ntbListItemsTable",t)}(),function(){"use strict";function t(){var t={restrict:"E",templateUrl:"app/components/list-items/list-items-list.html",scope:{contents:"=",ntb:"="}};return t}angular.module("neduTreeBrowser").directive("ntbListItemsList",t)}(),function(){"use strict";function t(){var t={restrict:"A",templateUrl:"app/components/list-item/list-item-table.html",scope:{item:"=ntbListItemTable",type:"=",ntb:"="}};return t}angular.module("neduTreeBrowser").directive("ntbListItemTable",t)}(),function(){"use strict";function t(){var t={restrict:"A",templateUrl:"app/components/list-item/list-item-list.html",scope:{item:"=ntbListItemList",type:"=",ntb:"="}};return t}angular.module("neduTreeBrowser").directive("ntbListItemList",t)}(),function(){"use strict";function t(){function t(){}var e={restrict:"E",templateUrl:"app/components/list/list.html",scope:{contents:"=",displayAs:"=",ntb:"="},controller:t};return e}angular.module("neduTreeBrowser").directive("ntbList",t)}(),function(){"use strict";function t(){function t(){}var e={restrict:"E",templateUrl:"app/components/browser/browser.html",scope:{ntb:"="},controller:t,controllerAs:"vm",bindToController:!0,replace:!0};return e}angular.module("neduTreeBrowser").directive("ntbBrowser",t)}(),function(){"use strict";function t(t){return{compile:function(e,n){angular.isFunction(n)&&(n={post:n});var i,o=e.contents().remove();return{pre:n&&n.pre?n.pre:null,post:function(e,r){i||(i=t(o)),i(e,function(t){r.append(t)}),n&&n.post&&n.post.apply(null,arguments)}}}}}t.$inject=["$compile"],angular.module("neduTreeBrowser").factory("ntbRecursionHelper",t)}(),function(){"use strict";function t(t,e,n){var i=function(i){var o=this;o.config={},angular.extend(o.config,t,i),o.currentFolder={id:null,parent:null,elements:{folders:[],items:[]}},o.browseTo=function(t){o.currentFolder.id=t;var i={};"undefined"!=typeof o.config.endpoints.folder.params&&(i=angular.extend(i,o.config.endpoints.folder.params)),i=angular.extend(i,{id:t}),e(o.config.endpoints.folder.url,i,{query:{isArray:!1}}).query().$promise.then(function(t){o.currentFolder.elements.folders=t.folders,o.currentFolder.elements.items=t.items,o.currentFolder.parent=t.parent_id},function(t){n.debug("Error loading folder",t)})},o.folderTree=[];var r=function(){if("undefined"!=typeof o.config.endpoints.tree){var t={};"undefined"!=typeof o.config.endpoints.tree.params&&(t=angular.extend(t,o.config.endpoints.tree.params)),e(o.config.endpoints.tree.url,t).query().$promise.then(function(t){o.folderTree=t,o.browseTo(t[0].id)},function(t){n.debug("Error loading folder tree",t)})}else o.folderTree=o.config.rawData.tree,o.config.rawData.tree.length&&o.config.rawData.tree[0].id&&o.browseTo(o.config.rawData.tree[0].id)};return r(),o};return i}t.$inject=["ntbConfig","$resource","$log"],angular.module("neduTreeBrowser").factory("neduTreeBrowser",t)}(),function(){"use strict";function t(){}angular.module("neduTreeBrowser").run(t)}(),function(){"use strict";angular.module("neduTreeBrowser").constant("ntbConfig",{endpoints:{tree:{url:null,params:{}},folder:{url:null,params:{}}},treeBrowseMethod:"click",displayAs:"table",columns:[{key:"id",i18n:"Id"},{key:"name",i18n:"Name",hasIcon:!0,hasLink:!0}],selectionCallback:function(){}})}(),function(){"use strict";function t(t){t.debugEnabled(!0)}t.$inject=["$logProvider"],angular.module("neduTreeBrowser").config(t)}(),angular.module("neduTreeBrowser").run(["$templateCache",function(t){t.put("app/components/browser/browser.html",'<div class="ntb-browser"><div class="ntb-folders-wrapper"><ntb-tree folders="vm.ntb.folderTree" ntb="vm.ntb"></ntb-tree></div><div class="ntb-list-wrapper"><ntb-list contents="vm.ntb.currentFolder" display-as="vm.ntb.config.displayAs" ntb="vm.ntb"></ntb-list></div></div>'),t.put("app/components/list/list.html",'<div class="ntb-list"><ntb-list-items-table ng-if="displayAs === \'table\'" contents="contents" ntb="ntb"></ntb-list-items-table><ntb-list-items-list ng-if="displayAs === \'list\'" contents="contents" ntb="ntb"></ntb-list-items-list></div>'),t.put("app/components/list-item/list-item-list.html",'<span ng-repeat="column in ntb.config.columns"><i class="glyphicon glyphicon-folder-close" ng-if="column.hasIcon && type === \'folder\'"></i> <i class="glyphicon glyphicon-file" ng-if="column.hasIcon && type === \'item\'"></i> {{ item[column.key] }}</span> <span ng-if="ntb.config.buttons && ntb.config.buttons.length && type === \'item\'" class="pull-right"><button ng-repeat="button in ntb.config.buttons" class="{{ button.class }}" ng-click="button.action($event, item)"><i ng-if="button.icon" class="{{ button.icon }}"></i> {{ button.text ? button.text : \'\'}}</button></span>'),t.put("app/components/list-item/list-item-table.html",'<td ng-repeat="column in ntb.config.columns"><a ng-if="type === \'folder\' && column.hasLink && ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: item.id})"><i class="glyphicon glyphicon-folder-open" ng-if="column.hasIcon"></i> {{ item[column.key] }}</a> <a ng-if="type === \'folder\' && column.hasLink && ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(item.id)"><i class="glyphicon glyphicon-folder-open" ng-if="column.hasIcon"></i> {{ item[column.key] }}</a> <a ng-if="type === \'item\' && column.hasLink" ng-click="ntb.config.selectionCallback(item)"><i class="glyphicon glyphicon-file" ng-if="column.hasIcon"></i> {{ item[column.key] }}</a> <span ng-if="type === \'folder\' && !column.hasLink"><i class="glyphicon glyphicon-folder-open" ng-if="column.hasIcon"></i> {{ item[column.key] }}</span> <span ng-if="type === \'item\' && !column.hasLink"><i class="glyphicon glyphicon-file" ng-if="column.hasIcon"></i> {{ item[column.key] }}</span></td><td ng-if="ntb.config.buttons && ntb.config.buttons.length"><button ng-if="type === \'item\'" ng-repeat="button in ntb.config.buttons" class="{{ button.class }}" ng-click="button.action($event, item)"><i ng-if="button.icon" class="{{ button.icon }}"></i> {{ button.text ? button.text : \'\' }}</button></td>'),t.put("app/components/list-items/list-items-list.html",'<div class="list-group"><a class="list-group-item" ng-if="contents.parent && ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: contents.parent})">..</a> <a class="list-group-item" ng-if="contents.parent && ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(contents.parent)">..</a> <a ng-repeat="item in contents.elements.folders | orderBy: \'name\'" ntb-list-item-list="item" type="\'folder\'" ntb="ntb" class="list-group-item" ng-if="ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: item.id})"></a> <a ng-repeat="item in contents.elements.folders | orderBy: \'name\'" ntb-list-item-list="item" type="\'folder\'" ntb="ntb" class="list-group-item" ng-if="ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(item.id)"></a> <a ng-repeat="item in contents.elements.items | orderBy: \'name\'" ntb-list-item-list="item" type="\'item\'" ntb="ntb" class="list-group-item" ng-click="ntb.config.selectionCallback(item)"></a></div>'),t.put("app/components/list-items/list-items-table.html",'<table class="table"><thead><tr><th ng-repeat="column in ntb.config.columns">{{ column.i18n }}</th><th ng-if="ntb.config.buttons && ntb.config.buttons.length"></th></tr></thead><tbody><tr ng-if="contents.parent"><td colspan="{{ ntb.config.columns.length }}"><a ng-if="ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: contents.parent})">..</a> <a ng-if="ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(contents.parent)">..</a></td><td ng-if="ntb.config.buttons && ntb.config.buttons.length"></td></tr><tr ng-repeat="item in contents.elements.folders | orderBy: \'name\'" ntb-list-item-table="item" type="\'folder\'" ntb="ntb"></tr><tr ng-repeat="item in contents.elements.items | orderBy: \'name\'" ntb-list-item-table="item" type="\'item\'" ntb="ntb"></tr></tbody></table>'),t.put("app/components/tree/tree.html",'<ul class="ntb-folder-list"><li ng-repeat="folder in folders | orderBy: \'name\'"><a ng-if="ntb.config.treeBrowseMethod === \'ui.router\'" ui-sref=".folder({folder: folder.id})" ui-sref-active="active"><i class="glyphicon glyphicon-folder-open"></i> {{ folder.name }}</a> <a ng-if="ntb.config.treeBrowseMethod === \'click\'" ng-click="ntb.browseTo(folder.id)"><i class="glyphicon glyphicon-folder-open"></i> {{ folder.name }}</a><ntb-tree ng-if="folder.folders.length" folders="folder.folders" ntb="ntb"></ntb-tree></li></ul>')}]);
//# sourceMappingURL=../maps/scripts/app-5ce8902deb.js.map
