module.exports = function(htmlString, options) {
  var doc = options.proxyDocument || document;
  var div = doc.createElement('div');
  div.innerHTML = '<div>f a&nbsp;<em><span>wefawf</span></em>&nbsp;<strong>wefawf</strong>&nbsp;<br>fa<span>wfe a</span>wff awe<em>f awf</em><br><br>aweffa&nbsp;<em>wefafe</em>&nbsp;afka&nbsp;<strong>fsfafe</strong>&nbsp;awƒ @afowf<br>fa fafawefae&nbsp;<strong>wfeawf fawf</strong>&nbsp;a eawf awfe affeaf&nbsp;<strong>efa</strong><br><strong>a</strong><br><strong>wefawf</strong><br><strong>cv</strong><br><br>af aw<br><br></div>';
  return div.childNodes[0].childNodes;
};
