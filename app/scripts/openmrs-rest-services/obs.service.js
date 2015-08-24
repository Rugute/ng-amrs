/*
jshint -W026, -W116, -W098, -W003, -W068, -W069, -W004, -W033, -W030, -W117
*/
(function() {
  'use strict';

  angular
    .module('app.openmrsRestServices')
          .factory('ObsResService', ObsResService);

  ObsResService.$inject = ['OpenmrsSettings', '$resource'];

  function ObsResService(OpenmrsSettings, $resource) {
    var service = {
      getObsByUuid: getObsByUuid,
      saveUpdateObs:saveUpdateObs,
      voidObs: voidObs
    }

    return service;

    function getResource() {
      var v = 'custom:(uuid,concept:(uuid,uuid),groupMembers,value:ref)';
      return $resource(OpenmrsSettings.getCurrentRestUrlBase() + 'obs/:uuid',
        { uuid: '@uuid', v:v},
        { query: { method: 'GET', isArray: false } });
    }

    function saveUpdateObs(obs, successCallback, errorCallback)
    {
      var obsResource = getResource()
      var _obs =JSON.parse(obs);
      if (obs.uuid !== undefined)
      {
        //update obs
        var uuid = _obs.uuid
        delete _obs['uuid'];
        obsResource.save(JSON.stringify(_obs), {uuid: uuid }).$promise
          .then(function (data) {
          successCallback(data);
        })
          .catch(function (error) {
          errorCallback('Error processing request', error);
          console.error(error);
        });
        /*
        Plan B
        var _obs =JSON.parse(obs);
        var uuid = _obs.uuid
        delete _obs['uuid'];
        obsResource.save({uuid: uuid, value:JSON.stringify(_obs)}).$promise
          .then(function (data) {
          successCallback(data);
        })
          .catch(function (error) {
          errorCallback('Error processing request', error);
          console.error(error);
        });

        */
      }
      else {
        obsResource.save(obs).$promise
        .then(function (data) {
        successCallback(data);
      })
        .catch(function (error) {
        errorCallback('Error processing request', error);
        console.error(error);
      });
      }
    }

    function getObsByUuid(obs, successCallback, errorCallback) {
      var obsResource = getResource()

      return obsResource.get({ uuid: obs.uuid }).$promise
        .then(function (data) {
        successCallback(data);
      })
        .catch(function (error) {
        errorCallback('Error processing request', error);
        console.error(error);
      });
    }

    function voidObs(obs, successCallback, errorCallback) {
      var obsResource = getResource();
      obsResource.delete({uuid:obs.uuid},
        function (data) {
          if (successCallback) { successCallback(data); }
          else return data;
        });
    }


  }
})();
