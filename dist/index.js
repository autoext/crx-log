/*!
 * crx-log v2.0.0
 * 2021-3-17 14:24:43
 */!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e);var n,o;!function(t){t.ACTIVE="active",t.UNINSTALL="uninstall",t.CLICK="click",t.PV="pv"}(n||(n={})),function(t){t.CRX="crx"}(o||(o={}));var i=class{constructor({urlPrefix:t,httpUtil:e,commonPayload:r}){this.urlPrefix=t,this.httpUtil=e,this.commonPayload=r}report(t){const e=this.urlPrefix+"/log/report";return this.httpUtil.get(e,Object.assign({},this.commonPayload,t))}active(){return this.report({event:n.ACTIVE})}uninstall(){return this.report({event:n.UNINSTALL})}};const u=()=>{const{name:t,version:e}=chrome.runtime.getManifest();return{name:t,version:e,appId:chrome.runtime.id}};e.default=class extends i{constructor({urlPrefix:t,httpUtil:e,commonPayload:r}){super({urlPrefix:t||"http://g8up.chromedevtools.com",httpUtil:e,commonPayload:Object.assign({ua:window.navigator.userAgent,type:o.CRX},u(),r)})}}}]);