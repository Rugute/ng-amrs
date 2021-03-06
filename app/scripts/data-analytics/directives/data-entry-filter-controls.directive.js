/* global angular */
/*
jshint -W003, -W026
*/
(function () {
    'use strict';

	angular
		.module('app.dataAnalytics')
		.directive('statsDataEntryFilters', directive);

	function directive() {
		return {
			restrict: "E",
			scope: {
				selectedForms: "=",
				startDate: "=",
				endDate: "=",
				startMonth: "=",
				endMonth: "=",
				selectedProvider: "=",
				selectedCreator: "=",
				selectedEncounterTypes: "=",
				enabledControls: "=",
				selectedLocations: "="
			},
			controller: dataEntryFilterController,
			link: dataEntryFilterLink,
			templateUrl: "views/data-analytics/data-entry-filter-controls.html"
		};
	}

	dataEntryFilterController.$inject = ['$scope', '$rootScope',
	'SearchDataService', 'moment', '$state', '$filter', 'CachedDataService',
	'UserResService','OpenmrsRestService', 'LocationModel'];

    function dataEntryFilterController($scope, $rootScope, SearchDataService,
	moment, $state, $filter, CachedDataService, UserResService,
	OpenmrsRestService, LocationModel) {

    $scope.locationsOptions = {};
    $scope.encounterTypesOptions = {};
    $scope.FormsTypesOptions = {};

		$scope.forms = [];
		$scope.selectedForms = {};
		$scope.selectedForms.selected = [];
		$scope.selectedEncounterTypes = {};
		$scope.selectedEncounterTypes.selected = [];
		$scope.selectAllForms = selectAllForms;
    $scope.selectAllForms.selectedAll = false;
		$scope.selectAllEncounterTypes = selectAllEncounterTypes;
    $scope.selectAllEncounterTypes.selectedAll = false;
		$scope.selectedLocations = {};
		$scope.selectedLocations.selectedAll = false;
		$scope.selectedLocations.locations = [];

		$scope.providers = [];
		$scope.creators = [];
		$scope.selectedProvider = {};
		$scope.selectedCreator = {};
		$scope.selectedProvider.selected = {};
		$scope.selectedCreator.selected = {};
		$scope.findProviders = findProviders;
		$scope.findingProvider = false;
		$scope.findCreators = findCreators;
		$scope.findingCreator = false;
    $scope.isBusy = false;
		$scope.canView = canView;
		var locationService = OpenmrsRestService.getLocationResService();


		loadForms();
		fetchLocations();

		function loadForms() {
			$scope.forms = CachedDataService.getCachedPocForms();
      $scope.encounterTypesOptions = {
        placeholder: 'Select a form or type to search...',
        dataTextField: 'encounterTypeName',
        dataValueField: 'uuid',
        filter: 'contains',
        dataSource:$scope.forms
      };
      $scope.FormsTypesOptions = {
        placeholder: 'Select a form or type to search...',
        dataTextField: 'name',
        dataValueField: 'uuid',
        filter: 'contains',
        dataSource:$scope.forms
      };
		}

		function canView(param){
			return $scope.enabledControls.indexOf(param) > -1;
		}

    function selectAllForms() {
        if ($scope.selectAllForms.selectedAll === false) {
          $scope.selectAllForms.selectedAll = true;
          $scope.selectedForms.selected = $scope.forms;
        }
        else {
          $scope.selectAllForms.selectedAll = false;
          $scope.selectedForms.selected = [];
        }
      }

		function selectAllEncounterTypes() {
      if ($scope.selectAllEncounterTypes.selectedAll === false) {
        $scope.selectAllEncounterTypes.selectedAll = true;
        $scope.selectedEncounterTypes.selected = $scope.forms;
      }
      else {
        $scope.selectAllEncounterTypes.selectedAll = false;
        $scope.selectedEncounterTypes.selected = [];
      }
		}

		function findCreators(searchText) {

			$scope.creators = [];
			if (searchText && searchText !== ' ') {
				$scope.findingCreator = true;
				UserResService.findUser(searchText,
				onCreatorSearchSuccess, onCreatorSearchError);
			}
		}

		function onCreatorSearchSuccess(data) {
			$scope.findingCreator = false;
			$scope.creators = data;
		}

		function onCreatorSearchError(error) {
			$scope.findingCreator = false;
		}

		function findProviders(searchText) {

			$scope.providers = [];
			if (searchText && searchText !== ' ') {
				$scope.findingProvider = true;
				SearchDataService.findProvider(searchText,
				onProviderSearchSuccess, onProviderSearchError);
			}
		}

		function onProviderSearchSuccess(data) {
			$scope.findingProvider = false;
			$scope.providers = data;
		}

		function onProviderSearchError(error) {
			$scope.findingProvider = false;
		}

				function locationSelected() {
			$scope.selectingLocation = false;

			//broadcast here
			$rootScope.$broadcast('dataEntryStatsLocationSelected', true);
		}

		function fetchLocations() {
			$scope.isBusy = true;
			locationService.getLocations(onGetLocationsSuccess,
			onGetLocationsError, false);
		}

		function onGetLocationsSuccess(locations) {
			$scope.locations = wrapLocations(locations);
      $scope.locationsOptions = {
        placeholder: 'Select a location or type to search...',
        dataTextField: 'name()',
        dataValueField: 'uuid',
        filter: 'contains',
        dataSource:wrapLocations(locations)
      };
      $scope.isBusy = false;
			//$scope.selectedLocations.locations = $scope.locations;
		}

		function onGetLocationsError(error) {
			$scope.isBusy = false;
		}

		function wrapLocations(locations) {
			var wrappedLocations = [];
			for (var i = 0; i < locations.length; i++) {
				var wrapped = wrapLocation(locations[i]);
				wrapped.index = i;
				wrappedLocations.push(wrapped);
			}

			return wrappedLocations;
		}

		function wrapLocation(location) {
			var location = LocationModel.toWrapper(location);
      location.uuid = location.uuId();
      return location;
		}
	}

	function dataEntryFilterLink(scope, element, attrs, vm) {

    }
})();
