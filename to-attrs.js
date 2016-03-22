var HTMLToAttrs = require('./lib/to-attrs.js');

module.exports = function (htmlString, options) {
  var htmlAttrs = new HTMLToAttrs(htmlString, options);
  var attrs = htmlAttrs.getAttrs();
  if (attrs.length === 0) {
    attrs = undefined;
  }
  return {
    text: htmlAttrs.getText(),
    attrs: attrs
  };
};
