/*jshint -W003, -W117, -W098, -W026 */
(function(){
    'use strict';

    angular
            .module('app.admin')
            .factory('HivSummaryIndicatorService',HivSummaryIndicatorService);
    HivSummaryIndicatorService.$inject=[];
    function HivSummaryIndicatorService(){
        var selectedLocation={selected:undefined};
        var indicatorDetails;
        var serviceDefinition;
        var selectedIndicatorTags={};
        var locationSelectionEnabled=true;
        var startDate=new Date();
        var endDate=new Date();
        var indicatorTags;
        var indicators={};
        var defaultIndicators;
        var selectedPosition;
        var reportFilters={
          startAge:0,
          endAge:120,
          gender:['M','F']
        };
        serviceDefinition={
            getSelectedLocation:getSelectedLocation,
            setSelectedLocation:setSelectedLocation,
            resetSelectedLocation:resetSelectedLocation,
            setLocationSelectionEnabled:setLocationSelectionEnabled,
            getLocationSelectionEnabled:getLocationSelectionEnabled,
            getStartDate:getStartDate,
            setStartDate:setStartDate,
            getEndDate:getEndDate,
            setEndDate:setEndDate,
            getIndicatorDetails:getIndicatorDetails,
            setIndicatorDetails:setIndicatorDetails,
            getSelectedIndicatorTags:getSelectedIndicatorTags,
            setSelectedIndicatorTags:setSelectedIndicatorTags,
            getIndicatorTags:getIndicatorTags,
            setIndicatorTags:setIndicatorTags,
            getIndicators:getIndicators,
            setIndicators:setIndicators,
            getDefaultIndicators:getDefaultIndicators,
            setDefaultIndicators:setDefaultIndicators,
            getSelectedPosition:getSelectedPosition,
            setSelectedPosition:setSelectedPosition,
            getReportFilters:getReportFilters,
            setReportFilters:setReportFilters
        };
        return serviceDefinition;
        function getSelectedLocation(){
            return selectedLocation;
        }


        function setSelectedLocation(location){
            selectedLocation=location;
        }

        function setSelectedPosition(value){
            selectedPosition=value;
        }
        function getSelectedPosition(){
            return selectedPosition;
        }

        function getSelectedIndicatorTags(state) {
           return selectedIndicatorTags[state]||[];
        }

        function setSelectedIndicatorTags(value,state) {

            selectedIndicatorTags[state]=value;
        }

        function getIndicators(state) {
           return indicators[state]||[];
        }

        function setIndicators(value,state) {
            indicators[state]=value;
        }

        function getReportFilters(){
          return reportFilters;
        }

        function setReportFilters(value){
          reportFilters=value;
        }

        function getDefaultIndicators(){
            return defaultIndicators;
        }

        function setDefaultIndicators(value){
            defaultIndicators=value;
        }

        function getIndicatorTags(){
            return indicatorTags;
        }

        function setIndicatorTags(tags){
            indicatorTags=tags;
        }

        function getIndicatorDetails(){
            return indicatorDetails;
        }

        function setIndicatorDetails(value){
            indicatorDetails=value;
        }

        function resetSelectedLocation(){
            selectedLocation={selected:undefined};
        }

        function setLocationSelectionEnabled(enabled){
            locationSelectionEnabled=enabled;
        }

        function getLocationSelectionEnabled(){
            return locationSelectionEnabled;
        }

        function getStartDate(){
            return startDate;
        }

        function setStartDate(date){
            startDate=date;
        }

        function getEndDate(){
            return endDate;
        }

        function setEndDate(date){
            endDate=date;
        }

    }

})();
