(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = {
  init: function init() {
    return {
      'Wine Name': true,
      'Vintage': true,
      'Color': false,
      'Price': false,
      'Country': false
    };
  },
  disable: function disable(options, optionToDisable) {
    return Object.assign({}, options, _defineProperty({}, optionToDisable, false));
  },
  enable: function enable(options, optionToEnable) {
    return Object.assign({}, options, _defineProperty({}, optionToEnable, true));
  },
  setSearchParam: function setSearchParam(options, newSearchObject) {
    return Object.assign({}, options, newSearchObject);
  }
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
  init: function init() {
    return { wineResults: null, status: 'NOT_LOADED' };
  },
  fetchWineResults: function fetchWineResults(state, searchParameters, actions) {
    var wineParams = Object.keys(searchParameters).reduce(function (stringParam, key) {
      switch (key) {
        case 'Wine Name':
          return stringParam + '&q=' + searchParameters[key];
        case 'Color':
          return stringParam + '&color=' + searchParameters[key];
        case 'Price':
          return stringParam + '&mp=' + searchParameters[key].min + '&xp=' + searchParameters[key].max;
        case 'Country':
          return stringParam + '&c=' + searchParameters[key];
        default:
          return stringParam;
      }
    }, '');
    fetch('https://us-central1-winesearch-140f6.cloudfunctions.net/wineSearch?' + wineParams.slice(1)).then(function (data) {
      return data.json();
    }).then(function (data) {
      var results = data.wines;
      if (searchParameters['Vintage']) {
        results = data.wines.filter(function (wineResults) {
          return searchParameters['Vintage'].min <= wineResults.vintage && searchParameters['Vintage'].max >= wineResults.vintage;
        });
      }
      actions.setWineResults(results);
    });
    return Object.assign({}, state, { status: 'LOADING' });
  },
  setWineResults: function setWineResults(state, data) {
    return Object.assign({}, state, { wineResults: data, status: 'LOADED' });
  }
};

},{}],3:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <div style=\'', ' ', '\' onclick=', '>\n      <h2 style=', '>', ' </h2>\n      <div style=', '>\n        <img src=', ' />\n      </div>\n      <div style=', '>\n        ', '\n        ', '\n      </div>\n    </div>\n  '], ['\n    <div style=\'', ' ', '\' onclick=', '>\n      <h2 style=', '>', ' </h2>\n      <div style=', '>\n        <img src=', ' />\n      </div>\n      <div style=', '>\n        ', '\n        ', '\n      </div>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html();

var box = '\n  box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);\n  min-height: 100px;\n  margin-bottom: 1em;\n  padding: 1em;\n  cursor: pointer;\n  max-width: 600px;\n  margin: auto;\n';

var cardTitleStyle = '\n  grid-area: title;\n  font-size: 1.2em;\n  text-align: center;\n';
var contentStyle = '\n  grid-area: content;\n  text-align: center;\n';

var infoStyle = '\n  grid-area: info;\n  text-align: center;\n';

var disabledStyle = '\n  opacity: 0.4;\n';

var gridDisplay = '\n  display: grid;\n  grid-template-areas:\n    "title"\n    "content"\n    "info"\n  ;\n';

module.exports = function (attrs) {
  var nav = function nav() {
    window.location.href = attrs.href;
  };
  var price = attrs.price > 0 ? 'Price: $' + attrs.price : '';
  var vintage = attrs.vintage ? 'Vintage: ' + attrs.vintage : '';
  return html(_templateObject, box, gridDisplay, nav, cardTitleStyle, attrs.name, contentStyle, attrs.image, infoStyle, price, vintage);
};

},{"tram-one":5}],4:[function(require,module,exports){
'use strict';

var Tram = require('tram-one');

var app = new Tram();
app.addRoute('/wineSearch', require('./pages/home'));
app.addRoute('/wineSearch/#wineResults', require('./pages/results'));
app.addActions({
  enabled: require('./actions/enable-actions'),
  results: require('./actions/wine-actions')
});
var debug = function debug(store, actions, actionName) {
  console.log(actionName, 'was triggered!');
  console.log('NEW STATE:', store);
};

app.addListener(debug);
app.start('.main');

},{"./actions/enable-actions":1,"./actions/wine-actions":2,"./pages/home":6,"./pages/results":7,"tram-one":5}],5:[function(require,module,exports){
(function (global){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e["tram-one"]=t()}(this,function(){"use strict";function e(t,n){if(!(this instanceof e))return new e(t,n);this.data=t,this.nodeValue=t,this.length=t.length,this.ownerDocument=n||null}function t(e,n){if(!(this instanceof t))return new t(e);this.data=e||"",this.length=this.data.length,this.ownerDocument=n||null}function n(e){switch(e.nodeType){case 3:return l(e.data);case 8:return"\x3c!--"+e.data+"--\x3e";default:return r(e)}}function r(e){var t=[],r=e.tagName;return"http://www.w3.org/1999/xhtml"===e.namespaceURI&&(r=r.toLowerCase()),t.push("<"+r+s(e)+a(e)),F.indexOf(r)>-1?t.push(" />"):(t.push(">"),e.childNodes.length?t.push.apply(t,e.childNodes.map(n)):e.textContent||e.innerText?t.push(l(e.textContent||e.innerText)):e.innerHTML&&t.push(e.innerHTML),t.push("</"+r+">")),t.join("")}function o(e,t){var n=D(e[t]);return"style"===t&&Object.keys(e.style).length>0||e.hasOwnProperty(t)&&("string"===n||"boolean"===n||"number"===n)&&"nodeName"!==t&&"className"!==t&&"tagName"!==t&&"textContent"!==t&&"innerText"!==t&&"namespaceURI"!==t&&"innerHTML"!==t}function i(e){if("string"==typeof e)return e;var t="";return Object.keys(e).forEach(function(n){var r=e[n];n=n.replace(/[A-Z]/g,function(e){return"-"+e.toLowerCase()}),t+=n+":"+r+";"}),t}function a(e){var t=e.dataset,n=[];for(var r in t)n.push({name:"data-"+r,value:t[r]});return n.length?u(n):""}function u(e){var t=[];return e.forEach(function(e){var n=e.name,r=e.value;"style"===n&&(r=i(r)),t.push(n+'="'+c(r)+'"')}),t.length?" "+t.join(" "):""}function s(e){var t=[];for(var n in e)o(e,n)&&t.push({name:n,value:e[n]});for(var r in e._attributes)for(var i in e._attributes[r]){var a=e._attributes[r][i],s=(a.prefix?a.prefix+":":"")+i;t.push({name:s,value:a.value})}return e.className&&t.push({name:"class",value:e.className}),t.length?u(t):""}function l(e){var t="";return"string"==typeof e?t=e:e&&(t=e.toString()),t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function c(e){return l(e).replace(/"/g,"&quot;")}function f(e,t,n){if(!(this instanceof f))return new f(e);var r=void 0===n?G:n||null;this.tagName=r===G?String(e).toUpperCase():e,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=t||null,this.namespaceURI=r,this._attributes={},"INPUT"===this.tagName&&(this.type="text")}function p(e){if(!(this instanceof p))return new p;this.childNodes=[],this.parentNode=null,this.ownerDocument=e||null}function h(e){}function d(){if(!(this instanceof d))return new d;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}function m(e,t,n){var r;-1!==le.indexOf(e)&&(t.namespace=ie);var o=!1;if(t.namespace&&(o=t.namespace,delete t.namespace),o)r=oe.createElementNS(o,e);else{if(e===se)return oe.createComment(t.comment);r=oe.createElement(e)}for(var i in t)if(t.hasOwnProperty(i)){var a=i.toLowerCase(),u=t[i];if("classname"===a&&(a="class",i="class"),"htmlFor"===i&&(i="for"),-1!==ue.indexOf(a))if("true"===u)u=a;else if("false"===u)continue;"on"===a.slice(0,2)?r[i]=u:o?"xlink:href"===i?r.setAttributeNS(ae,i,u):/^xmlns($|:)/i.test(i)||r.setAttributeNS(null,i,u):r.setAttribute(i,u)}return re(r,n),r}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){for(var n=t.attributes,r=e.attributes,o=null,i=null,a=null,u=null,s=r.length-1;s>=0;--s)a=(u=r[s]).name,o=u.namespaceURI,i=u.value,o?(a=u.localName||a,t.getAttributeNS(o,a)!==i&&t.setAttributeNS(o,a,i)):t.hasAttribute(a)?t.getAttribute(a)!==i&&("null"===i||"undefined"===i?t.removeAttribute(a):t.setAttribute(a,i)):t.setAttribute(a,i);for(var l=n.length-1;l>=0;--l)!1!==(u=n[l]).specified&&(a=u.name,(o=u.namespaceURI)?(a=u.localName||a,e.hasAttributeNS(o,a)||t.removeAttributeNS(o,a)):e.hasAttributeNS(null,a)||t.removeAttribute(a))}function b(e,t){for(var n=0;n<ye;n++){var r=ve[n];e[r]?t[r]=e[r]:t[r]&&(t[r]=void 0)}}function N(e,t){C(e,t,"selected")}function w(e,t){var n=e.value,r=t.value;C(e,t,"checked"),C(e,t,"disabled"),n!==r&&(t.setAttribute("value",n),t.value=n),"null"===n&&(t.value="",t.removeAttribute("value")),e.hasAttributeNS(null,"value")?"range"===t.type&&(t.value=n):t.removeAttribute("value")}function x(e,t){var n=e.value;if(n!==t.value&&(t.value=n),t.firstChild&&t.firstChild.nodeValue!==n){if(""===n&&t.firstChild.nodeValue===t.placeholder)return;t.firstChild.nodeValue=n}}function C(e,t,n){e[n]!==t[n]&&(t[n]=e[n],e[n]?t.setAttribute(n,""):t.removeAttribute(n))}function A(e,t){return t?e?e.isSameNode&&e.isSameNode(t)?t:e.tagName!==t.tagName?e:(we(e,t),k(e,t),t):null:e}function k(e,t){for(var n,r,o,i,a=0,u=0;n=t.childNodes[u],r=e.childNodes[u-a],n||r;u++)if(r)if(n)if(S(r,n))(o=A(r,n))!==n&&(t.replaceChild(o,n),a++);else{i=null;for(var s=u;s<t.childNodes.length;s++)if(S(t.childNodes[s],r)){i=t.childNodes[s];break}i?((o=A(r,i))!==i&&a++,t.insertBefore(o,n)):r.id||n.id?(t.insertBefore(r,n),a++):(o=A(r,n))!==n&&(t.replaceChild(o,n),a++)}else t.appendChild(r),a++;else t.removeChild(n),u--}function S(e,t){return e.id?e.id===t.id:e.isSameNode?e.isSameNode(t):e.tagName===t.tagName&&(e.type===xe&&e.nodeValue===t.nodeValue)}function E(e,t){return t={exports:{}},e(t,t.exports),t.exports}function O(e){return e===De||e===Me}var T=Array.prototype.slice,L=function(e,t){"length"in e||(e=[e]),e=T.call(e);for(;e.length;){var n=e.shift(),r=t(n);if(r)return r;n.childNodes&&n.childNodes.length&&(e=T.call(n.childNodes).concat(e))}},j=e;e.prototype.nodeType=8,e.prototype.nodeName="#comment",e.prototype.toString=function(){return"[object Comment]"};var P=t;t.prototype.type="DOMTextNode",t.prototype.nodeType=3,t.prototype.nodeName="#text",t.prototype.toString=function(){return this.data},t.prototype.replaceData=function(e,t,n){var r=this.data,o=r.substring(0,e),i=r.substring(e+t,r.length);this.data=o+n+i,this.length=this.data.length};var R=function(e){var t=this,n=e.type;e.target||(e.target=t),t.listeners||(t.listeners={});var r=t.listeners[n];if(r)return r.forEach(function(n){e.currentTarget=t,"function"==typeof n?n(e):n.handleEvent(e)});t.parentNode&&t.parentNode.dispatchEvent(e)},_=function(e,t){var n=this;n.listeners||(n.listeners={}),n.listeners[e]||(n.listeners[e]=[]),-1===n.listeners[e].indexOf(t)&&n.listeners[e].push(t)},I=function(e,t){var n=this;if(n.listeners&&n.listeners[e]){var r=n.listeners[e],o=r.indexOf(t);-1!==o&&r.splice(o,1)}},D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},M=(function(){function e(e){this.value=e}function t(t){function n(o,i){try{var a=t[o](i),u=a.value;u instanceof e?Promise.resolve(u.value).then(function(e){n("next",e)},function(e){n("throw",e)}):r(a.done?"return":"normal",a.value)}catch(e){r("throw",e)}}function r(e,t){switch(e){case"return":o.resolve({value:t,done:!0});break;case"throw":o.reject(t);break;default:o.resolve({value:t,done:!1})}(o=o.next)?n(o.key,o.arg):i=null}var o,i;this._invoke=function(e,t){return new Promise(function(r,a){var u={key:e,arg:t,resolve:r,reject:a,next:null};i?i=i.next=u:(o=i=u,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}(),function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}),B=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},V=n,F=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],G="http://www.w3.org/1999/xhtml",q=f;f.prototype.type="DOMElement",f.prototype.nodeType=1,f.prototype.appendChild=function(e){return e.parentNode&&e.parentNode.removeChild(e),this.childNodes.push(e),e.parentNode=this,e},f.prototype.replaceChild=function(e,t){e.parentNode&&e.parentNode.removeChild(e);var n=this.childNodes.indexOf(t);return t.parentNode=null,this.childNodes[n]=e,e.parentNode=this,t},f.prototype.removeChild=function(e){var t=this.childNodes.indexOf(e);return this.childNodes.splice(t,1),e.parentNode=null,e},f.prototype.insertBefore=function(e,t){e.parentNode&&e.parentNode.removeChild(e);var n=null===t||void 0===t?-1:this.childNodes.indexOf(t);return n>-1?this.childNodes.splice(n,0,e):this.childNodes.push(e),e.parentNode=this,e},f.prototype.setAttributeNS=function(e,t,n){var r=null,o=t,i=t.indexOf(":");i>-1&&(r=t.substr(0,i),o=t.substr(i+1)),"INPUT"===this.tagName&&"type"===t?this.type=n:(this._attributes[e]||(this._attributes[e]={}))[o]={value:n,prefix:r}},f.prototype.getAttributeNS=function(e,t){var n=this._attributes[e],r=n&&n[t]&&n[t].value;return"INPUT"===this.tagName&&"type"===t?this.type:"string"!=typeof r?null:r},f.prototype.removeAttributeNS=function(e,t){var n=this._attributes[e];n&&delete n[t]},f.prototype.hasAttributeNS=function(e,t){var n=this._attributes[e];return!!n&&t in n},f.prototype.setAttribute=function(e,t){return this.setAttributeNS(null,e,t)},f.prototype.getAttribute=function(e){return this.getAttributeNS(null,e)},f.prototype.removeAttribute=function(e){return this.removeAttributeNS(null,e)},f.prototype.hasAttribute=function(e){return this.hasAttributeNS(null,e)},f.prototype.removeEventListener=I,f.prototype.addEventListener=_,f.prototype.dispatchEvent=R,f.prototype.focus=function(){},f.prototype.toString=function(){return V(this)},f.prototype.getElementsByClassName=function(e){var t=e.split(" "),n=[];return L(this,function(e){if(1===e.nodeType){var r=(e.className||"").split(" ");t.every(function(e){return-1!==r.indexOf(e)})&&n.push(e)}}),n},f.prototype.getElementsByTagName=function(e){e=e.toLowerCase();var t=[];return L(this.childNodes,function(n){1!==n.nodeType||"*"!==e&&n.tagName.toLowerCase()!==e||t.push(n)}),t},f.prototype.contains=function(e){return L(this,function(t){return e===t})||!1};var Q=p;p.prototype.type="DocumentFragment",p.prototype.nodeType=11,p.prototype.nodeName="#document-fragment",p.prototype.appendChild=q.prototype.appendChild,p.prototype.replaceChild=q.prototype.replaceChild,p.prototype.removeChild=q.prototype.removeChild,p.prototype.toString=function(){return this.childNodes.map(function(e){return String(e)}).join("")};var $=h;h.prototype.initEvent=function(e,t,n){this.type=e,this.bubbles=t,this.cancelable=n},h.prototype.preventDefault=function(){};var H=d,K=d.prototype;K.createTextNode=function(e){return new P(e,this)},K.createElementNS=function(e,t){var n=null===e?null:String(e);return new q(t,this,n)},K.createElement=function(e){return new q(e,this)},K.createDocumentFragment=function(){return new Q(this)},K.createEvent=function(e){return new $(e)},K.createComment=function(e){return new j(e,this)},K.getElementById=function(e){return e=String(e),L(this.childNodes,function(t){if(String(t.id)===e)return t})||null},K.getElementsByClassName=q.prototype.getElementsByClassName,K.getElementsByTagName=q.prototype.getElementsByTagName,K.contains=q.prototype.contains,K.removeEventListener=I,K.addEventListener=_,K.dispatchEvent=R;var z=new H,X="undefined"!=typeof window?window.document:z,Z=/\n[\s]+$/,J=/^\n[\s]+/,W=/[\s]+$/,Y=/^[\s]+/,ee=/[\n\s]+/g,te=["a","abbr","b","bdi","bdo","br","cite","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","amp","small","span","strong","sub","sup","time","u","var","wbr"],ne=["code","pre","textarea"],re=function e(t,n){if(Array.isArray(n))for(var r,o,i=t.nodeName.toLowerCase(),a=!1,u=0,s=n.length;u<s;u++){var l=n[u];if(Array.isArray(l))e(t,l);else{("number"==typeof l||"boolean"==typeof l||"function"==typeof l||l instanceof Date||l instanceof RegExp)&&(l=l.toString());var c=t.childNodes[t.childNodes.length-1];if("string"==typeof l)a=!0,c&&"#text"===c.nodeName?c.data+=l:(l=X.createTextNode(l),t.appendChild(l),c=l),u===s-1&&(a=!1,-1===te.indexOf(i)&&-1===ne.indexOf(i)?""===(r=(c.data||c.data).replace(J,"").replace(W,"").replace(Z,"").replace(ee," "))?t.removeChild(c):c.data=r:-1===ne.indexOf(i)&&(o=0===u?"":" ",r=(c.data||c.data).replace(J,o).replace(Y," ").replace(W,"").replace(Z,"").replace(ee," "),c.data=r));else if(l&&l.nodeType){a&&(a=!1,-1===te.indexOf(i)&&-1===ne.indexOf(i)?""===(r=c.data.replace(J,"").replace(Z,"").replace(ee," "))?t.removeChild(c):c.data=r:-1===ne.indexOf(i)&&(r=c.data.replace(Y," ").replace(J,"").replace(Z,"").replace(ee," "),c.data=r));var f=l.nodeName;f&&(i=f.toLowerCase()),t.appendChild(l)}}}},oe="undefined"!=typeof window?window.document:z,ie="http://www.w3.org/2000/svg",ae="http://www.w3.org/1999/xlink",ue=["autofocus","checked","defaultchecked","disabled","formnovalidate","indeterminate","readonly","required","selected","willvalidate"],se="!--",le=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"],ce=m,fe=m;ce.createElement=fe;var pe=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),he=function(e){return Object.keys(e).map(function(t){return e[t]})},de=function(e,t){return e.concat(t)},me=function(){function e(){y(this,e),this.engine={},this.store={},this.actionQueue=[],this.listeners=[],this.actions={}}return pe(e,[{key:"addActions",value:function(e){var t=this,n=function(e,t){var n=t.name in e?e[t.name].concat(t):[t];return U({},e,v({},t.name,n))};this.engine=Object.keys(e).map(function(e){return function(t){return he(e[t]).map(function(e){return e._storeKey=t,e})}}(e)).reduce(function(e,t){return he(t).reduce(n,e)},this.engine),this.store=Object.keys(e).map(function(t){return Object({key:t,init:e[t].init})}).reduce(function(e,t){return U({},e,v({},t.key,t.init()))},this.store);var r=function(e,n){var r=0===t.actionQueue.length;for(t.actionQueue.push({actions:t.engine[e],args:n});r&&t.actionQueue.length>0;){var o=t.actionQueue[0],i=function(e){return function(n,r){return U({},n,v({},r._storeKey,r(n[r._storeKey],e.args,t.actions)))}}(o);t.store=o.actions.reduce(i,t.store),t.actionQueue.shift(),t.notifyListeners(e,n)}};return this.actions=he(e).map(function(e){return Object.keys(e)}).reduce(de,[]).reduce(function(e,t){return U({},e,v({},t,function(e){return r(t,e)}))},this.actions),this}},{key:"addListener",value:function(e){return this.listeners.push(e),this}},{key:"notifyListeners",value:function(e,t){var n=this;return this.listeners.forEach(function(r){return r(n.store,n.actions,e,t)}),this}}]),e}(),ve=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","onmouseenter","onmouseleave","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"],ye=ve.length,ge=1,be=3,Ne=8,we=function(e,t){var n=e.nodeType,r=e.nodeName;n===ge&&g(e,t),n!==be&&n!==Ne||t.nodeValue!==e.nodeValue&&(t.nodeValue=e.nodeValue),"INPUT"===r?w(e,t):"OPTION"===r?N(e,t):"TEXTAREA"===r&&x(e,t),b(e,t)},xe=3,Ce=function(e,t){return A(t,e)},Ae="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},ke=E(function(e){!function(t,n){var r=t&&t.define;r&&r.amd?r("rlite",[],n):e.exports?e.exports=n():t.Rlite=n()}(Ae,function(){return function(e,t){function n(e){return e}function r(e){return~e.indexOf("/?")&&(e=e.replace("/?","?")),"/"==e[0]&&(e=e.slice(1)),"/"==e[e.length-1]&&(e=e.slice(0,-1)),e}function o(e,t,n,r,a){if(r){if(n>=e.length){var u=r["@"];return u&&{cb:u,params:a.reduce(function(e,t){return e[t[0]]=t[1],e},{})}}var s=t(e[n]),l=a.length;return o(e,t,n+1,r[s.toLowerCase()],a)||i(e,t,n+1,r,":",s,a,l)||i(e,t,e.length,r,"*",e.slice(n).join("/"),a,l)}}function i(e,t,n,r,i,a,u,s){u.length=s;var l=r[i];return l&&u.push([l["~"],a]),o(e,t,n,l,u)}function a(e,t,n){if(e&&t.cb)for(var r=e.indexOf("#"),o=(r<0?e:e.slice(0,r)).split("&"),i=0;i<o.length;++i){var a=o[i].split("=");t.params[a[0]]=n(a[1])}return t}function u(e){var t=r(e).split("?"),i=~e.indexOf("%")?c:n;return a(t[1],o(t[0].split("/"),i,0,l,[])||{},i)}function s(e,t){for(var n=e.split("/"),r=l,o=+("/"===e[0]);o<n.length;++o){var i=n[o],a=":"==i[0]?":":"*"==i[0]?"*":i.toLowerCase();r=r[a]||(r[a]={}),(":"==a||"*"==a)&&(r["~"]=i.slice(1))}r["@"]=t}var l={},c=decodeURIComponent;return function(){for(var e in t)s(e,t[e])}(),function(t,n){var r=u(t);return(r.cb||e)(r.params,n,t)}}})}),Se=function(e){return function(t,n,r){for(var o in n)o in Ee&&(n[Ee[o]]=n[o],delete n[o]);return e(t,n,r)}},Ee={class:"className",for:"htmlFor","http-equiv":"httpEquiv"},Oe=1,Te=2,Le=3,je=4,Pe=5,Re=6,_e=7,Ie=8,De=9,Me=10,Be=11,Ue=12,Ve=13,Fe=14,Ge=function(e,t){function n(e){return"function"==typeof e?e:"string"==typeof e?e:e&&"object"===(void 0===e?"undefined":D(e))?e:r("",e)}t||(t={});var r=t.concat||function(e,t){return String(e)+String(t)};return!1!==t.attrToProp&&(e=Se(e)),function(o){function i(e){var n=[];a===_e&&(a=je);for(var r=0;r<e.length;r++){var o=e.charAt(r);a===Oe&&"<"===o?(u.length&&n.push([Oe,u]),u="",a=Te):">"===o&&"/"===e.charAt(r-1)?(n.push([Fe]),u="",a=Oe):">"===o&&"-"===e.charAt(r-1)&&"-"===e.charAt(r-2)?(n.push([Fe]),u="",a=Oe):">"!==o||O(a)||a===Ve?a===Ve&&/-$/.test(u)&&"-"===o?(t.comments&&n.push([Ie,u.substr(0,u.length-1)],[Le]),u="",a=Oe):a===Te&&/^!--$/.test(u)?(t.comments&&n.push([Te,u],[Pe,"comment"],[Be]),u=o,a=Ve):a===Oe||a===Ve?u+=o:a===Te&&/\s/.test(o)?(n.push([Te,u]),u="",a=je):a===Te?u+=o:a===je&&/[^\s"'=/]/.test(o)?(a=Pe,u=o):a===je&&/\s/.test(o)?(u.length&&n.push([Pe,u]),n.push([Ue])):a===Pe&&/\s/.test(o)?(n.push([Pe,u]),u="",a=Re):a===Pe&&"="===o?(n.push([Pe,u],[Be]),u="",a=_e):a===Pe?u+=o:a!==Re&&a!==je||"="!==o?a!==Re&&a!==je||/\s/.test(o)?a===_e&&'"'===o?a=Me:a===_e&&"'"===o?a=De:a===Me&&'"'===o?(n.push([Ie,u],[Ue]),u="",a=je):a===De&&"'"===o?(n.push([Ie,u],[Ue]),u="",a=je):a!==_e||/\s/.test(o)?a===Ie&&/\s/.test(o)?(n.push([Ie,u],[Ue]),u="",a=je):a!==Ie&&a!==De&&a!==Me||(u+=o):(a=Ie,r--):(n.push([Ue]),/[\w-]/.test(o)?(u+=o,a=Pe):a=je):(n.push([Be]),a=_e):(a===Te?n.push([Te,u]):a===Pe?n.push([Pe,u]):a===Ie&&u.length&&n.push([Ie,u]),n.push([Le]),u="",a=Oe)}return a===Oe&&u.length?(n.push([Oe,u]),u=""):a===Ie&&u.length?(n.push([Ie,u]),u=""):a===Me&&u.length?(n.push([Ie,u]),u=""):a===De&&u.length?(n.push([Ie,u]),u=""):a===Pe&&(n.push([Pe,u]),u=""),n}for(var a=Oe,u="",s=arguments.length,l=[],c=0;c<o.length;c++)if(c<s-1){var f=arguments[c+1],p=i(o[c]),h=a;h===Me&&(h=Ie),h===De&&(h=Ie),h===_e&&(h=Ie),h===je&&(h=Pe),p.push([0,h,f]),l.push.apply(l,p)}else l.push.apply(l,i(o[c]));for(var d=[null,{},[]],m=[[d,-1]],c=0;c<l.length;c++){var v=m[m.length-1][0],y=(p=l[c])[0];if(y===Te&&/^\//.test(p[1])){x=m[m.length-1][1];m.length>1&&(m.pop(),m[m.length-1][0][2][x]=e(v[0],v[1],v[2].length?v[2]:void 0))}else if(y===Te){var g=[p[1],{},[]];v[2].push(g),m.push([g,v[2].length-1])}else if(y===Pe||0===y&&p[1]===Pe){for(var b,N="";c<l.length;c++)if(l[c][0]===Pe)N=r(N,l[c][1]);else{if(0!==l[c][0]||l[c][1]!==Pe)break;if("object"!==D(l[c][2])||N)N=r(N,l[c][2]);else for(b in l[c][2])l[c][2].hasOwnProperty(b)&&!v[1][b]&&(v[1][b]=l[c][2][b])}l[c][0]===Be&&c++;for(var w=c;c<l.length;c++)if(l[c][0]===Ie||l[c][0]===Pe)v[1][N]?v[1][N]=r(v[1][N],l[c][1]):v[1][N]=n(l[c][1]);else{if(0!==l[c][0]||l[c][1]!==Ie&&l[c][1]!==Pe){!N.length||v[1][N]||c!==w||l[c][0]!==Le&&l[c][0]!==Ue||(v[1][N]=N.toLowerCase()),l[c][0]===Le&&c--;break}v[1][N]?v[1][N]=r(v[1][N],l[c][2]):v[1][N]=n(l[c][2])}}else if(y===Pe)v[1][p[1]]=!0;else if(0===y&&p[1]===Pe)v[1][p[2]]=!0;else if(y===Le);else if(y===Fe){var x=m[m.length-1][1];m.pop(),m[m.length-1][0][2][x]=e(v[0],v[1],v[2].length?v[2]:void 0)}else if(0===y&&p[1]===Oe)void 0===p[2]||null===p[2]?p[2]="":p[2]||(p[2]=r("",p[2])),Array.isArray(p[2][0])?v[2].push.apply(v[2],p[2]):v[2].push(p[2]);else if(y===Oe)v[2].push(p[1]);else if(y!==Be&&y!==Ue)throw new Error("unhandled: "+y)}if(d[2].length>1&&/^\s*$/.test(d[2][0])&&d[2].shift(),d[2].length>2||2===d[2].length&&/\S/.test(d[2][1]))throw new Error("multiple root elements must be wrapped in an enclosing tag");return Array.isArray(d[2][0])&&"string"==typeof d[2][0][0]&&Array.isArray(d[2][0][2])&&(d[2][0]=e(d[2][0][0],d[2][0][1],d[2][0][2])),d[2][0]}},qe=function(e,t){var n=function(n,r,o){var i=t[n];return i?i(r,o):e(n,r,o)},r=Ge(n);return r.h=n,r},Qe=E(function(e,t){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){e.exports=function(e){window.addEventListener("hashchange",e,!1),window.addEventListener("popstate",e,!1);var t=window.history.pushState;window.history.pushState=function(n){for(var r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];var a=t.apply(history,[n].concat(o));return e({state:n}),a}}}])})});return function(){function e(t){M(this,e),t=t||{},this.defaultRoute=t.defaultRoute||"/404",this.router=ke(),this.internalRouter={},this.engine=new me}return B(e,[{key:"addActions",value:function(e){return this.engine.addActions(e),this}},{key:"addListener",value:function(e){return this.engine.addListener(e),this}},{key:"addRoute",value:function(e,t){return this.internalRouter[e]=function(e){return function(n,r){return t(n,r,e)}},this.router=ke(this.internalRouter[this.defaultRoute],this.internalRouter),this}},{key:"start",value:function(e,t){var n=this;return this.engine.addListener(function(r,o){n.mount(e,t,r,o)}),Qe(function(){n.mount(e,t)}),this.mount(e,t),this}},{key:"mount",value:function(e,t,n,r){var o="string"==typeof e?document.querySelector(e):e;if(null===o&&console.warn("Tram-One: could not find target, is the element on the page yet?"),!o.firstElementChild){var i=document.createElement("div");o.appendChild(i)}var a=o.firstElementChild,u=t||window.location.href.replace(window.location.origin,"");return Ce(a,this.toNode(u,n,r)),this}},{key:"toNode",value:function(e,t,n){return this.router(e)(t||this.engine.store,n||this.engine.actions)}},{key:"toString",value:function(e,t){return"undefined"!=typeof window?this.toNode(e,t).outerHTML:this.toNode(e,t).toString()}}],[{key:"html",value:function(e){return qe(ce,e||{})}}]),e}()});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <div style="max-width: 600px; margin:auto;">\n      <search-input\n        title="Wine Name" placeholder="Name"\n        disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      />\n      <search-range\n        title="Vintage" disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      />\n      <search-options\n        title="Color" disabled=', '\n        onenable=', ' ondisable=', '\n        options=', '\n        value=', ' onsetvalue=', '\n      />\n      <search-range\n        title="Price" disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      />\n      <search-dropdown\n        title="Country" disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      >\n        <option value="US" ', '> United States </option>\n        <option value="AR" ', '> Argentina </option>\n        <option value="AU" ', '> Australia </option>\n        <option value="AT" ', '> Austria </option>\n        <option value="BE" ', '> Belgium </option>\n        <option value="CA" ', '> Canada </option>\n        <option value="DK" ', '> Denmark </option>\n        <option value="SV" ', '> El Salvador </option>\n        <option value="EE" ', '> Estonia </option>\n        <option value="FR" ', '> France </option>\n        <option value="DE" ', '> Germany </option>\n        <option value="GB" ', '> Great Britain </option>\n        <option value="HK" ', '> Hong Kong </option>\n        <option value="HU" ', '> Hungary </option>\n        <option value="IE" ', '> Ireland </option>\n        <option value="IT" ', '> Italy </option>\n        <option value="JP" ', '> Japan </option>\n        <option value="MY" ', '> Malaysia </option>\n        <option value="MT" ', '> Malta </option>\n        <option value="NL" ', '> Netherlands </option>\n        <option value="NZ" ', '> New Zealand </option>\n        <option value="NO" ', '> Norway </option>\n        <option value="PL" ', '> Poland </option>\n        <option value="PT" ', '> Portugal </option>\n        <option value="PR" ', '> Puerto Rico </option>\n        <option value="RU" ', '> Russia </option>\n        <option value="SG" ', '> Singapore </option>\n        <option value="ES" ', '> Spain </option>\n        <option value="CH" ', '> Switzerland </option>\n        <option value="UK" ', '> United Kingdom </option>\n      </search-dropdown>\n      <button onclick=', ' style=\'width: 100%; height: 5em;\'>Search</button>\n    </div>\n  '], ['\n    <div style="max-width: 600px; margin:auto;">\n      <search-input\n        title="Wine Name" placeholder="Name"\n        disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      />\n      <search-range\n        title="Vintage" disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      />\n      <search-options\n        title="Color" disabled=', '\n        onenable=', ' ondisable=', '\n        options=', '\n        value=', ' onsetvalue=', '\n      />\n      <search-range\n        title="Price" disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      />\n      <search-dropdown\n        title="Country" disabled=', '\n        onenable=', ' ondisable=', '\n        onsetvalue=', ' value=', '\n      >\n        <option value="US" ', '> United States </option>\n        <option value="AR" ', '> Argentina </option>\n        <option value="AU" ', '> Australia </option>\n        <option value="AT" ', '> Austria </option>\n        <option value="BE" ', '> Belgium </option>\n        <option value="CA" ', '> Canada </option>\n        <option value="DK" ', '> Denmark </option>\n        <option value="SV" ', '> El Salvador </option>\n        <option value="EE" ', '> Estonia </option>\n        <option value="FR" ', '> France </option>\n        <option value="DE" ', '> Germany </option>\n        <option value="GB" ', '> Great Britain </option>\n        <option value="HK" ', '> Hong Kong </option>\n        <option value="HU" ', '> Hungary </option>\n        <option value="IE" ', '> Ireland </option>\n        <option value="IT" ', '> Italy </option>\n        <option value="JP" ', '> Japan </option>\n        <option value="MY" ', '> Malaysia </option>\n        <option value="MT" ', '> Malta </option>\n        <option value="NL" ', '> Netherlands </option>\n        <option value="NZ" ', '> New Zealand </option>\n        <option value="NO" ', '> Norway </option>\n        <option value="PL" ', '> Poland </option>\n        <option value="PT" ', '> Portugal </option>\n        <option value="PR" ', '> Puerto Rico </option>\n        <option value="RU" ', '> Russia </option>\n        <option value="SG" ', '> Singapore </option>\n        <option value="ES" ', '> Spain </option>\n        <option value="CH" ', '> Switzerland </option>\n        <option value="UK" ', '> United Kingdom </option>\n      </search-dropdown>\n      <button onclick=', ' style=\'width: 100%; height: 5em;\'>Search</button>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  'search-input': require('../search-card-components/search-input'),
  'search-options': require('../search-card-components/search-options'),
  'search-range': require('../search-card-components/search-range'),
  'search-dropdown': require('../search-card-components/search-dropdown')
});

var queryToString = function queryToString(queryObject) {
  var wineParams = Object.keys(searchParameters).reduce(function (stringParam, key) {
    switch (key) {
      case 'Wine Name':
        return stringParam + '&q=' + searchParameters[key];
      case 'Color':
        return stringParam + '&color=' + searchParameters[key];
      case 'Price':
        return stringParam + '&mp=' + searchParameters[key].min + '&xp=' + searchParameters[key].max;
      case 'Country':
        return stringParam + '&c=' + searchParameters[key];
      default:
        return stringParam;
    }
  }, '');
};

module.exports = function (store, actions) {
  var nav = function nav() {
    window.history.pushState({}, '', '/wineSearch/#wineResults?' + queryToString(store.enabled));
  };

  return html(_templateObject, !store.enabled["Wine Name"], actions.enable, actions.disable, actions.setSearchParam, store.enabled["Wine Name"], !store.enabled["Vintage"], actions.enable, actions.disable, actions.setSearchParam, store.enabled["Vintage"], !store.enabled["Color"], actions.enable, actions.disable, ['Red', 'White', 'Rose', 'Amber', 'Clear'], store.enabled["Color"], actions.setSearchParam, !store.enabled["Price"], actions.enable, actions.disable, actions.setSearchParam, store.enabled["Price"], !store.enabled["Country"], actions.enable, actions.disable, actions.setSearchParam, store.enabled["Country"], store.enabled['Country'] === 'US' ? 'selected' : '', store.enabled['Country'] === 'AR' ? 'selected' : '', store.enabled['Country'] === 'AU' ? 'selected' : '', store.enabled['Country'] === 'AT' ? 'selected' : '', store.enabled['Country'] === 'BE' ? 'selected' : '', store.enabled['Country'] === 'CA' ? 'selected' : '', store.enabled['Country'] === 'DK' ? 'selected' : '', store.enabled['Country'] === 'SV' ? 'selected' : '', store.enabled['Country'] === 'EE' ? 'selected' : '', store.enabled['Country'] === 'FR' ? 'selected' : '', store.enabled['Country'] === 'DE' ? 'selected' : '', store.enabled['Country'] === 'GB' ? 'selected' : '', store.enabled['Country'] === 'HK' ? 'selected' : '', store.enabled['Country'] === 'HU' ? 'selected' : '', store.enabled['Country'] === 'IE' ? 'selected' : '', store.enabled['Country'] === 'IT' ? 'selected' : '', store.enabled['Country'] === 'JP' ? 'selected' : '', store.enabled['Country'] === 'MY' ? 'selected' : '', store.enabled['Country'] === 'MT' ? 'selected' : '', store.enabled['Country'] === 'NL' ? 'selected' : '', store.enabled['Country'] === 'NZ' ? 'selected' : '', store.enabled['Country'] === 'NO' ? 'selected' : '', store.enabled['Country'] === 'PL' ? 'selected' : '', store.enabled['Country'] === 'PT' ? 'selected' : '', store.enabled['Country'] === 'PR' ? 'selected' : '', store.enabled['Country'] === 'RU' ? 'selected' : '', store.enabled['Country'] === 'SG' ? 'selected' : '', store.enabled['Country'] === 'ES' ? 'selected' : '', store.enabled['Country'] === 'CH' ? 'selected' : '', store.enabled['Country'] === 'UK' ? 'selected' : '', nav);
};

},{"../search-card-components/search-dropdown":9,"../search-card-components/search-input":10,"../search-card-components/search-options":11,"../search-card-components/search-range":12,"tram-one":5}],7:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n            <wine-card name=', '\n              image=', ' price=', '\n              vintage=', ' href=', '/>\n        '], ['\n            <wine-card name=', '\n              image=', ' price=', '\n              vintage=', ' href=', '/>\n        ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div>\n      ', '\n    </div>\n  '], ['\n    <div>\n      ', '\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html({
  'wine-card': require('../elements/wine-card')
});

var getOrFetchDrinkDOM = function getOrFetchDrinkDOM(store, actions, params) {
  switch (store.results.status) {
    case 'NOT_LOADED':
      actions.fetchWineResults(params);
      return 'fetching...';
    case 'LOADING':
      return 'loading...';
    case 'LOADED':
      // If we have results, check if they're for the same search params
      // if (store.results.drink.id !== params.drinkId) {
      //   actions.fetchWineResults(params.drinkId)
      //   return 'fetching...'
      // }
      return store.results.wineResults.map(function (wineResult) {
        return html(_templateObject, wineResult.name, wineResult.image, wineResult.price, wineResult.vintage, wineResult.link);
      });
    default:
      return 'Error...';
  }
};

module.exports = function (store, actions, params) {
  var drinkDOM = getOrFetchDrinkDOM(store, actions, params);
  return html(_templateObject2, drinkDOM);
};

},{"../elements/wine-card":3,"tram-one":5}],8:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n      <div onclick=', ' style="', ' ', ' ', '">\n        <div style=', '>\n          ', '\n        </div>\n        <div style=', '>\n          Click to add option to search\n        </div>\n      </div>\n    '], ['\n      <div onclick=', ' style="', ' ', ' ', '">\n        <div style=', '>\n          ', '\n        </div>\n        <div style=', '>\n          Click to add option to search\n        </div>\n      </div>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <div style="', ' ', '">\n      <div style=', '>\n        ', '\n      </div>\n      <div style=', '>\n        ', '\n      </div>\n      <button style=', ' onclick=', '> Disable </button>\n    </div>\n  '], ['\n    <div style="', ' ', '">\n      <div style=', '>\n        ', '\n      </div>\n      <div style=', '>\n        ', '\n      </div>\n      <button style=', ' onclick=', '> Disable </button>\n    </div>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Tram = require('tram-one');
var html = Tram.html();

var box = '\n  box-shadow:0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);\n  min-height: 100px;\n  margin-bottom: 1em;\n  padding: 1em;\n';

var cardTitleStyle = '\n  grid-area: title;\n  font-size: 1.2em;\n';
var contentStyle = '\n  grid-area: content;\n  text-align: center;\n';

var disableButtonStyle = '\n  grid-area: disable-button;\n  margin: auto;\n';

var disabledStyle = '\n  opacity: 0.4;\n';

var gridDisplay = '\n  display: grid;\n  grid-template-areas:\n    "title"\n    "content"\n    "disable-button"\n  ;\n';

module.exports = function (attrs, children) {
  var enable = function enable(event) {
    attrs.onenable(attrs.title);
  };
  var disable = function disable(event) {
    attrs.ondisable(attrs.title);
    event.cancelBubble = true;
  };

  if (attrs.disabled === 'true') {
    return html(_templateObject, enable, box, gridDisplay, disabledStyle, cardTitleStyle, attrs.title, contentStyle);
  }
  return html(_templateObject2, box, gridDisplay, cardTitleStyle, attrs.title, contentStyle, children, disableButtonStyle, disable);
};

},{"tram-one":5}],9:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <search-card title=', ' disabled=', '\n    onenable=', ' ondisable=', '>\n      <select onchange=', '>', '</select>\n    </search-card>\n  '], ['\n    <search-card title=', ' disabled=', '\n    onenable=', ' ondisable=', '>\n      <select onchange=', '>', '</select>\n    </search-card>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tram = require('tram-one');
var html = Tram.html({
  'search-card': require('./search-card')
});

module.exports = function (attrs, children) {
  var select = function select(event) {
    if (event.currentTarget.value) {
      attrs.onsetvalue(_defineProperty({}, attrs.title, event.currentTarget.value));
    }
  };
  return html(_templateObject, attrs.title, attrs.disabled, attrs.onenable, attrs.ondisable, select, children);
};

},{"./search-card":8,"tram-one":5}],10:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <search-card\n      title=', ' disabled=', '\n      onenable=', ' ondisable=', '\n    >\n      <input placeholder=', ' onblur=', ' value=', '/>\n    </search-card>\n  '], ['\n    <search-card\n      title=', ' disabled=', '\n      onenable=', ' ondisable=', '\n    >\n      <input placeholder=', ' onblur=', ' value=', '/>\n    </search-card>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tram = require('tram-one');
var html = Tram.html({
  'search-card': require('./search-card')
});

module.exports = function (attrs) {
  var input = function input(event) {
    if (event.currentTarget.value) {
      attrs.onsetvalue(_defineProperty({}, attrs.title, event.currentTarget.value));
    }
  };
  return html(_templateObject, attrs.title, attrs.disabled, attrs.onenable, attrs.ondisable, attrs.placeholder, input, attrs.value === 'true' ? '' : attrs.value);
};

},{"./search-card":8,"tram-one":5}],11:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <span>\n      <input\n        type="radio" name="Color" value="', '" onchange=', '\n        ', '/> ', '\n    </span>\n  '], ['\n    <span>\n      <input\n        type="radio" name="Color" value="', '" onchange=', '\n        ', '/> ', '\n    </span>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <search-card title=', ' disabled=', ' onenable=', ' ondisable=', '>\n      ', '\n    </search-card>\n  '], ['\n    <search-card title=', ' disabled=', ' onenable=', ' ondisable=', '>\n      ', '\n    </search-card>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tram = require('tram-one');
var html = Tram.html({
  'search-card': require('./search-card')
});

module.exports = function (attrs) {
  var change = function change(event) {
    attrs.onsetvalue(_defineProperty({}, attrs.title, event.currentTarget.value));
  };
  var options = attrs.options.map(function (option) {
    return html(_templateObject, option.toLowerCase(), change, attrs.value == option.toLowerCase() ? 'checked' : '', option);
  });
  return html(_templateObject2, attrs.title, attrs.disabled, attrs.onenable, attrs.ondisable, options);
};

},{"./search-card":8,"tram-one":5}],12:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n    <search-card title=', ' disabled=', ' onenable=', ' ondisable=', '>\n      Min: <input placeholder="Min ', '" onblur=', ' value=', '/>\n      Max: <input placeholder="Max ', '" onblur=', ' value=', '/>\n    </search-card>\n  '], ['\n    <search-card title=', ' disabled=', ' onenable=', ' ondisable=', '>\n      Min: <input placeholder="Min ', '" onblur=', ' value=', '/>\n      Max: <input placeholder="Max ', '" onblur=', ' value=', '/>\n    </search-card>\n  ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tram = require('tram-one');
var html = Tram.html({
  'search-card': require('./search-card')
});

module.exports = function (attrs) {
  var vintageValue = attrs.value === 'true' ? { min: 0, max: 0 } : attrs.value;
  var minInput = function minInput(event) {
    if (event.currentTarget.value) {
      attrs.onsetvalue(_defineProperty({}, attrs.title, Object.assign({}, vintageValue, { min: event.currentTarget.value })));
    }
  };
  var maxInput = function maxInput(event) {
    if (event.currentTarget.value) {
      attrs.onsetvalue(_defineProperty({}, attrs.title, Object.assign({}, vintageValue, { max: event.currentTarget.value })));
    }
  };
  return html(_templateObject, attrs.title, attrs.disabled, attrs.onenable, attrs.ondisable, attrs.title, minInput, vintageValue.min, attrs.title, maxInput, vintageValue.max);
};

},{"./search-card":8,"tram-one":5}]},{},[4]);
