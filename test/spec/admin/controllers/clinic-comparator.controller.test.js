/* global chai */
/* global expect */
/* global it */
/* global angular */
/* global inject */
/* global beforeEach */
/* global describe */
(function() {
  'use strict';
  describe('Controller: ClinicalComparatorCtrl ', function(){
    var controller;
    var scope;
    var filterFilter;
    var state;
    var openmrsRestService;
    var log;
    var EtlRestServices;
    var moments;

    beforeEach(function(){
      module('ngAmrsApp');
      module('app.openmrsRestServices');
      module('app.admin');
      //module('mock.etlRestServices');
      module('mock.data');
    });

    beforeEach(inject(function($controller, $injector, $rootScope, OpenmrsRestService,EtlRestService,moment){
      //Injecting required dependencies
      scope =   $rootScope.$new();
      state = $injector.get('$state');
      EtlRestServices = $injector.get('EtlRestService');
      openmrsRestService = $injector.get('OpenmrsRestService');
      moments=$injector.get('moment');
      log=$injector.get('$log');
      filterFilter=$injector.get('filterFilter');
      controller =$controller('ClinicalComparatorCtrl', {
        $rootScope:scope,
        EtlRestService:EtlRestServices,
        OpenmrsRestService:openmrsRestService,
        moment:moments,
        $scope:scope,
        $log:log,
        filterFilter:filterFilter,
        $state:state
      });
    }));

    afterEach(function() {
      EtlRestServices.returnErrorOnNextCall = false;
    });


    it('ClinicalComparatorCtrl controller should be created successfully', function() {
      expect(controller).to.exist;
    });

    it('should ensure main variables needed for the controller exists', function(){
      expect(scope.reportName).to.exist;
      expect(scope.isBusy).to.exist;
      expect(scope.currentPage).to.exist;
      expect(scope.countBy).to.exist;
      expect(scope.groupBy).to.exist;
    });

    it('should ensure loadHivSummaryIndicators method is defined', function(){
      expect(scope.loadHivSummaryIndicators).to.exist;
    });

    it('should ensure getIndicatorLabelByName method is defined', function(){
      expect(scope.getIndicatorLabelByName).to.exist;
    });

    it('should ensure main variables needed for the controller are initialised', function(){
      expect(scope.isBusy).to.be.equal(false);
      expect(scope.currentPage).to.be.equal(1);
      expect(scope.groupBy).to.be.equal('groupByYear,groupByMonth,groupByLocation');
      expect(scope.reportName).to.be.equal('clinic-comparator-report');
      expect(scope.countBy).to.be.equal('num_persons');
    });



  });
})();
