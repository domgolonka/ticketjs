/**
 * angular-ui-utils - Swiss-Army-Knife of AngularJS tools (with no external dependencies!)
 * @version v0.1.1 - 2014-02-05
 * @link http://angular-ui.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

!function(window,document){"use strict";var tags=["ngInclude","ngPluralize","ngView","ngSwitch","uiCurrency","uiCodemirror","uiDate","uiEvent","uiKeypress","uiKeyup","uiKeydown","uiMask","uiMapInfoWindow","uiMapMarker","uiMapPolyline","uiMapPolygon","uiMapRectangle","uiMapCircle","uiMapGroundOverlay","uiModal","uiReset","uiScrollfix","uiSelect2","uiShow","uiHide","uiToggle","uiSortable","uiTinymce"];window.myCustomTags=window.myCustomTags||[],tags.push.apply(tags,window.myCustomTags);for(var toCustomElements=function(str){var result=[],dashed=str.replace(/([A-Z])/g,function($1){return" "+$1.toLowerCase()}),tokens=dashed.split(" ");if(1===tokens.length){var name=tokens[0];result.push(name),result.push("x-"+name),result.push("data-"+name)}else{var ns=tokens[0],dirname=tokens.slice(1).join("-");result.push(ns+":"+dirname),result.push(ns+"-"+dirname),result.push("x-"+ns+"-"+dirname),result.push("data-"+ns+"-"+dirname)}return result},i=0,tlen=tags.length;tlen>i;i++)for(var customElements=toCustomElements(tags[i]),j=0,clen=customElements.length;clen>j;j++){var customElement=customElements[j];document.createElement(customElement)}}(window,document);