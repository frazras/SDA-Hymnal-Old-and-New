angular.module('ion-index-scroll', [])
    .directive('ionIndexScroll', [
        '$ionicScrollDelegate', '$location', '$q', '$timeout', '$document', '$anchorScroll',
        function ($ionicScrollDelegate, $location, $q, $timeout, $document, $anchorScroll) {
            return {
                require: '?ngModel',
                restrict: 'AE',
                replace: true,
                compile: function (tElement, tAttrs, tTransclude) {
                    var children = tElement.contents();
                    var template = angular.element([
                        '<ion-list class="ion_index_list_outer">',
                        '<ion-scroll delegate-handle="indexScroll" has-bouncing="false">',
                        '<div data-ng-repeat="items in sortedItems" class="ion_index_list">',
                        '<ion-item class="item item-divider" id="index_{{modelName}}_{{items[0].dividerHeader}}">{{items[0].dividerHeader}}</ion-item>',
                        '<ion-item ng-repeat="item in items"></ion-item>',
                        '</div>',
                        '</ion-scroll>',
                        '<ul class="ion_index_sidebar">',
                        '   <li ng-click="indexScrollGoToList(\'index_{{modelName}}_{{scrollIndex}}\')" ng-repeat="scrollIndex in sidebarScrollIndex">{{scrollIndex}}</li>',
                        // Replace above with the following if an alternating bullet is preferred in the scroll index
                        //'   <li ng-click="indexScrollGoToList(\'index_{{scrollIndex}}\')" ng-repeat="scrollIndex in sidebarScrollIndex">{{$index%2 == 0 ? scrollIndex: "&bull;"}}</li>',
                        '</ul>',
                        '</ion-list>'
                    ].join(''));

                    var validMaxCharsInSidebar = [1, 2, 3];
                    var headerHeight = $document[0].body.querySelector('.bar-header').offsetHeight;
                    var subHeaderHeight = tAttrs.subheader === "true" ? 44 : 0;
                    var tabHeight = $document[0].body.querySelector('.tab-nav') ? $document[0].body.querySelector('.tab-nav').offsetHeight : 0;
                    var windowHeight = window.innerHeight;

                    var contentHeight = windowHeight - headerHeight - subHeaderHeight - tabHeight;

                    angular.element(template.find('ion-item')[1]).append(children);
                    tElement.html('');
                    tElement.append(template);

                    tElement.find('ion-scroll').css({"height": contentHeight + 'px'});

                    return function (scope, element, attrs, ngModel) {
debugger;
                        // do nothing if the model is not set
                        if (!ngModel) return;

                        ngModel.$render = function () {
                            scope.items = [];
                            scope.items = ngModel.$viewValue;

                            // If only one of sortKey or displayKey is specified, then populate the value in the other variable with same
                            if (attrs.sortKey && !attrs.displayKey) {
                                attrs.displayKey = attrs.sortKey;
                            }
                            else if (!attrs.sortKey && attrs.displayKey) {
                                attrs.sortKey = attrs.displayKey;
                            }

                            scope.numDisplayChars = (attrs.numDisplayChars
                            && typeof parseInt(attrs.numDisplayChars) === 'number'
                            && validMaxCharsInSidebar.indexOf(parseInt(attrs.numDisplayChars)) >= 0
                            && attrs.useFullAlphabet != 'true')
                                ? attrs.numDisplayChars : 1;

                            var preSortedItems = sortByProperty(scope.items, attrs.sortKey);
                            scope.sortedItems = [];  // Array, rather than object, is needed for numeric sorting of groups, since ng-repeat gives unexpected results otherwise
                            var retainedDividerHeader = '';
                            var mySortKey = '';
                            var groupCount = -1;

                            // Group items that are related by the index to tmpSortedItems
                            for (i = 0; i < preSortedItems.length; i++) {
                                var dividerHeader = preSortedItems[i][attrs.displayKey].toString().substring(0, scope.numDisplayChars).toUpperCase();

                                if (dividerHeader.length > 0) {
                                    preSortedItems[i].dividerHeader = dividerHeader;

                                    if (dividerHeader !== retainedDividerHeader) {
                                        // sortKey is a grouping key, and only changes when the visible header changes
                                        mySortKey = preSortedItems[i][attrs.sortKey];
                                        groupCount++;
                                    }

                                    if (scope.sortedItems[groupCount] == undefined) {
                                        scope.sortedItems[groupCount] = [];
                                    }

                                    scope.sortedItems[groupCount].push(preSortedItems[i]);
                                    retainedDividerHeader = dividerHeader;
                                }
                            }

                            scope.sidebarScrollIndex = attrs.useCompleteAlphabet == 'true' ? createSidebarScrollIndexByAlphabet() : createSidebarScrollIndex(preSortedItems);

                            scope.indexScrollGoToList = function (id) {

                                var deferred = $q.defer();

                                $timeout(function () {
                                    var divTop = document.getElementById(id).offsetTop;
                                    $ionicScrollDelegate.scrollTo(0, divTop, true);
                                }, 300);

                                return deferred.promise;
                            };

                            // Create alphabet object for sidebar
                            function createSidebarScrollIndexByAlphabet() {
                                var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                                var numbers = [];

                                for (var i = 0; i < str.length; i++) {
                                    var nextChar = str.charAt(i);
                                    numbers.push(nextChar);
                                }
                                return numbers;
                            }

                            // Create list of unique index values for display in the sidebar
                            function createSidebarScrollIndex(indexArray) {
                                var elements = [];

                                for (var i = 0; i < indexArray.length; i++) {
                                    var nextElement = indexArray[i][attrs.displayKey].toString().substring(0, scope.numDisplayChars).toUpperCase();

                                    if (elements.indexOf(nextElement) < 0) {
                                        elements.push(nextElement);
                                    }
                                }
                                return elements;
                            }

                            // Sort by an array element
                            function sortByProperty(array, propertyName) {
                                if (typeof array[0][propertyName] === 'number') {
                                    return array.slice().sort(function (a, b) {
                                        return a[propertyName] - b[propertyName];
                                    })
                                }
                                else { // string
                                    return array.slice().sort(function (a, b) {
                                        return a[propertyName].toLowerCase() < b[propertyName].toLowerCase() ? -1 : a[propertyName].toLowerCase() > b[propertyName].toLowerCase() ? 1 : 0;
                                    });
                                }
                            }

                            scope.groups = [];

                            for (var i = 0; i < 10; i++) {
                                scope.groups[i] = {
                                    name: i,
                                    items: []
                                };

                                for (var j = 0; j < 3; j++) {
                                    scope.groups[i].items.push(i + '-' + j);
                                }
                            }

                        };

                    }
                }
            };
        }]);