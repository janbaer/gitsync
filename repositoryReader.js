'use strict';

var Q = require('q'),
    fs = require('fs');

exports.readFile = function(fileName) {
  var deferred = Q.defer();

  fs.readFile(fileName, 'UTF8', function (error, json) {
    if (error) {
      deferred.reject(error);
    } else {
      try {
        var repositories = JSON.parse(json);
        deferred.resolve(repositories);

      } catch(e) {
        deferred.reject(e);
      }
    }
  });

  return deferred.promise;
}