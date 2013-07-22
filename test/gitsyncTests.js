'use strict';
var sinon = require('sinon'),
    path = require('path'),
    expect = require('expect.js');

var reader = require('../repositoryReader');
var fileName = path.join(__dirname, '../sample_repositories.json');

describe('Git sync tests', function () {
  describe('when file exists and the json is valid', function () {
    it('should return an valid array of repository objects', function (done) {
      reader.readFile(fileName)
            .then(function(repositories) {
              expect(repositories).not.to.be(undefined);
              done();
            })
            .done();
    });
  });

  describe('when file not exists', function () {
    beforeEach(function () {
      //sinon.stub(reader, 'readFile').returns(Q.defer().reject(new Error('file not exist')));
    });

    it('should return an error', function (done) {
      var lastError = null;

      reader.readFile('invalid filename')
            .catch(function (error) {
              lastError = error;
            })
            .done(function () {
              expect(lastError).not.to.be(null);
              done();
            });
    });
  });

  describe('when json is invalid', function () {
    beforeEach(function () {
      sinon.stub(JSON, 'parse').throws('Invalid json');
    });

    it('should return an error', function (done) {
      var lastError = null;
      reader.readFile(fileName)
            .then(function () {
              expect().fail('We had expected an failure');
            })
            .catch(function (error) {
              lastError = error;
            })
            .done(function () {
              expect(lastError).not.to.be(null);
              done();
            });
    });
  });
});
