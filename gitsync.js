'use strict';

var fs = require('fs'),
  path = require('path'),
  exec = require('child_process').exec,
  util = require('util'),
  os = require('os'),
  colors = require('colors'),
  _ = require('underscore');

var reader = require('./repositoryReader');

var gitcommand = '/usr/local/git/bin/git';

if (os.platform() !== 'darwin') {
  gitcommand = process.env.GIT_BIN; // Read the location of Git from the environment variable
}

var fileName = path.join(__dirname, '/repositories.json');

reader.readFile(fileName)
      .then(function (repositories) {
        console.log('Updating all defined repositories...'.green);
        console.log('------------------------------------'.yellow);

        _.each(repositories, function(repository) {
          if (!fs.existsSync(repository.path)) {
            console.log(util.format('The directory for the repository "%s" not exists: %s', repository.name, repository.path).red);
            return;
          }

          var options = {
            cwd: repository.path,
            env: null
          }

          exec(gitcommand + ' pull', options, function(error, stdout) {
            var message;

            if (error !== null) {
              message = util.format('Error on updating repository %s - %s', repository.name, error).red;
            } else {
              message = util.format('Updating repository "%s" - %s', repository.name, stdout).green;
            }
            console.log(message);
          });
        });
      })
      .catch(function (error) {
        console.error(util.format('error while reading repositories definition: $s', error));
      })


