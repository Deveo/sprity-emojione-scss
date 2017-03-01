'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');

var getTemplate = function (opt) {
  return fs.readFileAsync(path.join(__dirname, 'template', 'scss.hbs'), 'utf8');
};

var transform = Promise.method(function (layouts, source, opt, Handlebars) {
  var template = Handlebars.compile(source);
  var classIndicator = '.'; // opt['style-indicator'] ? opt['style-indicator'] : '.';
  return template({
    layouts: layouts,
    opt: opt,
    indicator: classIndicator
  });
});

module.exports = {
  process: function (layouts, opt, Handlebars) {
    return getTemplate(opt)
      .then(function (source) {
        return transform(layouts, source, opt, Handlebars);
      });
  },
  isBeautifyable: function (opt) {
    return false;
  },
  extension: function (opt) {
    return 'scss';
  }
};
