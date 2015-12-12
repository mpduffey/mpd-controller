angular.module('mpd.controller', ['mpd.objectBlock',
																	'mpd.data',
																	'mpd.autocomplete',
																	'ngMaterial'
																 ])
.directive('mpdController', function(){
	var mpdController = '<div class="controller-frame top-corner-radius-5 flex-container-column flex-item">\
												<div class="controller-header top-corner-radius-4">\
													<div class="btn-group">\
														<button class="btn btn-xs black-text">Controller Source</button>\
														<button class="btn btn-xs dropdown-toggle" data-toggle="dropdown">\
															<span class="caret black-text"></span>\
														</button>\
														<ul class="dropdown-menu">\
															<li><a>Insert Menu Options</a></li>\
														</ul>\
													</div>\
													<i ng-click="removeController($index)" class="fa fa-remove fa-lg pull-right white-text remove-controller"></i>\
												</div>\
												<div class="controller controller-body flex-container-column flex-item">\
													<div class="controller-controls max-width fixed-item">\
														<div class="filter-controls max-width">\
															<md-chips ng-model="filterTags" md-autocomplete-snap md-on-add="createChip($chip)">\
																<md-chip-template>{{$chip.ObjectName}}</md-chip-template>\
																<md-autocomplete md-selected-item="selectedItem" md-search-text="searchText" md-items="item in querySearch(searchText)" md-item-text="item.ObjectName" placeholder="Add Filter Tags">\
																	<span md-highlight-text="searchText">{{item.ObjectName}}</span>\
																</md-autocomplete>\
															</md-chips>\
														</div>\
														<div class="flex-container-row">\
															<input type="checkbox" class="select-all" style="width: 15px; box-shadow: none; margin: 5px 5px 2px 18px;">\
															<input type="text" class="flex-item form-control" placeholder="Link Selected Objects">\
														</div>\
														<input type="text" class="flex-item form-control" placeholder="Add New Object and Link">\
													</div>\
													<div class="flex-item flex-container-column">\
														<mpd-object-block list="objects"></mpd-object-block>\
													</div>\
												</div>\
											</div>';
	return {
		restrict:		'E',
		replace:		true,
		template:		mpdController,
		controller:		function($scope, mpdData) {
			$scope.objects = mpdData.dataStore.objects;
			$scope.filterTags = [];
			$scope.querySearch = function(query) {
				var results = query ? $scope.objects.data.filter($scope.createFilterFor(query)) : $scope.objects.data;
					return results;
			}
			$scope.createFilterFor = function(query) {
				var lowercaseQuery = angular.lowercase(query);
				console.log("query: " + query);

				return function filterFn(object) {
					return (angular.lowercase(object.ObjectName).indexOf(lowercaseQuery) > -1);
				};
			}
		}
	};
});