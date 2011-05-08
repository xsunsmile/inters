/*=:project
    scalable Inman Flash Replacement (sIFR) version 3, revision 225

  =:file
    Copyright: 2006 Mark Wubben.
    Author: Mark Wubben, <http://novemberborn.net/>

  =:history
    * IFR: Shaun Inman
    * sIFR 1: Mike Davidson, Shaun Inman and Tomas Jogin
    * sIFR 2: Mike Davidson, Shaun Inman, Tomas Jogin and Mark Wubben

  =:license
    This software is licensed and provided under the CC-GNU LGPL.
    See <http://creativecommons.org/licenses/LGPL/2.1/>    
*/

var parseSelector=(function(){var _1=/\s*,\s*/;var _2=/\s*([\s>+~(),]|^|$)\s*/g;var _3=/([\s>+~,]|[^(]\+|^)([#.:@])/g;var _4=/^[^\s>+~]/;var _5=/[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;function parseSelector(_6,_7){_7=_7||document.documentElement;var _8=_6.split(_1),_9=[];for(var i=0;i<_8.length;i++){var _b=[_7],_c=toStream(_8[i]);for(var j=0;j<_c.length;){var _e=_c[j++],_f=_c[j++],_10="";if(_c[j]=="("){while(_c[j++]!=")"&&j<_c.length){_10+=_c[j]}_10=_10.slice(0,-1)}_b=select(_b,_e,_f,_10)}_9=_9.concat(_b)}return _9}function toStream(_11){var _12=_11.replace(_2,"$1").replace(_3,"$1*$2");if(_4.test(_12)){_12=" "+_12}return _12.match(_5)||[]}function select(_13,_14,_15,_16){return (_17[_14])?_17[_14](_13,_15,_16):[]}var _18={toArray:function(_19){var a=[];for(var i=0;i<_19.length;i++){a.push(_19[i])}return a}};var dom={isTag:function(_1d,tag){return (tag=="*")||(tag.toLowerCase()==_1d.nodeName.toLowerCase())},previousSiblingElement:function(_1f){do{_1f=_1f.previousSibling}while(_1f&&_1f.nodeType!=1);return _1f},nextSiblingElement:function(_20){do{_20=_20.nextSibling}while(_20&&_20.nodeType!=1);return _20},hasClass:function(_21,_22){return (_22.className||"").match("(^|\\s)"+_21+"(\\s|$)")},getByTag:function(tag,_24){return _24.getElementsByTagName(tag)}};var _17={"#":function(_25,_26){for(var i=0;i<_25.length;i++){if(_25[i].getAttribute("id")==_26){return [_25[i]]}}return []}," ":function(_28,_29){var _2a=[];for(var i=0;i<_28.length;i++){_2a=_2a.concat(_18.toArray(dom.getByTag(_29,_28[i])))}return _2a},">":function(_2c,_2d){var _2e=[];for(var i=0,_30;i<_2c.length;i++){_30=_2c[i];for(var j=0,_32;j<_30.childNodes.length;j++){_32=_30.childNodes[j];if(_32.nodeType==1&&dom.isTag(_32,_2d)){_2e.push(_32)}}}return _2e},".":function(_33,_34){var _35=[];for(var i=0,_37;i<_33.length;i++){_37=_33[i];if(dom.hasClass([_34],_37)){_35.push(_37)}}return _35},":":function(_38,_39,_3a){return (pseudoClasses[_39])?pseudoClasses[_39](_38,_3a):[]}};parseSelector.selectors=_17;parseSelector.pseudoClasses={};parseSelector.util=_18;parseSelector.dom=dom;return parseSelector})();
var sIFR=new function(){var _3b=this;var _3c="sIFR-active";var _3d="sIFR-replaced";var _3e="sIFR-replacing";var _3f="sIFR-flash";var _40="sIFR-ignore";var _41="sIFR-alternate";var _42="sIFR-class";var _43="sIFR-layout";var _44="http://www.w3.org/1999/xhtml";var _45=6;var _46=126;var _47=8;var _48="SIFR-PREFETCHED";var _49=" ";var _4a=[10,1.55,19,1.45,32,1.35,71,1.3,1.25];this.isActive=false;this.isEnabled=true;this.hideElements=true;this.replaceNonDisplayed=false;this.preserveSingleWhitespace=false;this.fixWrap=true;this.fixHover=true;this.registerEvents=true;this.setPrefetchCookie=true;this.cookiePath="/";this.domains=[];this.fromLocal=true;this.forceClear=false;this.forceWidth=false;this.fitExactly=false;this.forceTextTransform=true;this.useDomContentLoaded=true;this.debugMode=false;this.hasFlashClassSet=false;this.delayCss=false;var _4b=0;var _4c=false,_4d=false;var _4e=[];var dom=new function(){this.getBody=function(){var _50=document.getElementsByTagName("body");if(_50.length==1){return _50[0]}return null};this.addClass=function(_51,_52){if(_52){_52.className=((_52.className||"")==""?"":_52.className+" ")+_51}};this.removeClass=function(_53,_54){if(_54){_54.className=_54.className.replace(new RegExp("(^|\\s)"+_53+"(\\s|$)"),"").replace(/^\s+|(\s)\s+/g,"$1")}};this.hasClass=function(_55,_56){return new RegExp("(^|\\s)"+_55+"(\\s|$)").test(_56.className)};this.hasOneOfClassses=function(_57,_58){for(var i=0;i<_57.length;i++){if(this.hasClass(_57[i],_58)){return true}}return false};this.create=function(_5a){if(document.createElementNS){return document.createElementNS(_44,_5a)}return document.createElement(_5a)};this.setInnerHtml=function(_5b,_5c){if(ua.innerHtmlSupport){_5b.innerHTML=_5c}else{if(ua.xhtmlSupport){_5c=["<root xmlns=\"",_44,"\">",_5c,"</root>"].join("");var xml=(new DOMParser()).parseFromString(_5c,"text/xml");xml=document.importNode(xml.documentElement,true);while(_5b.firstChild){_5b.removeChild(_5b.firstChild)}while(xml.firstChild){_5b.appendChild(xml.firstChild)}}}};this.nodeFromHtml=function(_5e){var _5f=this.create("div");_5f.innerHTML=_5e;return _5f.firstChild};this.getComputedStyle=function(_60,_61){var _62;if(document.defaultView&&document.defaultView.getComputedStyle){_62=document.defaultView.getComputedStyle(_60,null)[_61]}else{if(_60.currentStyle){_62=_60.currentStyle[_61]}}return _62||""};this.getStyleAsInt=function(_63,_64,_65){var _66=this.getComputedStyle(_63,_64);if(_65&&!/px$/.test(_66)){return 0}_66=parseInt(_66);return isNaN(_66)?0:_66};this.getZoom=function(){return _67.zoom.getLatest()}};this.dom=dom;var ua=new function(){var ua=navigator.userAgent.toLowerCase();var _6a=(navigator.product||"").toLowerCase();this.macintosh=ua.indexOf("mac")>-1;this.windows=ua.indexOf("windows")>-1;this.quicktime=false;this.opera=ua.indexOf("opera")>-1;this.konqueror=_6a.indexOf("konqueror")>-1;this.ie=false/*@cc_on || true @*/;this.ieSupported=this.ie&&!/ppc|smartphone|iemobile|msie\s5\.5/.test(ua)/*@cc_on && @_jscript_version >= 5.5 @*/;this.ieWin=this.ie&&this.windows/*@cc_on && @_jscript_version >= 5.1 @*/;this.windows=this.windows&&(!this.ie||this.ieWin);this.ieMac=this.ie&&this.macintosh/*@cc_on && @_jscript_version < 5.1 @*/;this.macintosh=this.macintosh&&(!this.ie||this.ieMac);this.safari=ua.indexOf("safari")>-1;this.webkit=ua.indexOf("applewebkit")>-1&&!this.konqueror;this.khtml=this.webkit||this.konqueror;this.gecko=!this.webkit&&_6a=="gecko";this.operaVersion=this.opera&&/.*opera(\s|\/)(\d+\.\d+)/.exec(ua)?parseInt(RegExp.$2):0;this.webkitVersion=this.webkit&&/.*applewebkit\/(\d+).*/.exec(ua)?parseInt(RegExp.$1):0;this.geckoBuildDate=this.gecko&&/.*gecko\/(\d{8}).*/.exec(ua)?parseInt(RegExp.$1):0;this.konquerorVersion=this.konqueror&&/.*konqueror\/(\d\.\d).*/.exec(ua)?parseInt(RegExp.$1):0;this.flashVersion=0;if(this.ieWin){var axo;var _6c=false;try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(e){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");this.flashVersion=6;axo.AllowScriptAccess="always"}catch(e){_6c=this.flashVersion==6}if(!_6c){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(e){}}}if(!_6c&&axo){this.flashVersion=parseFloat(/([\d,?]+)/.exec(axo.GetVariable("$version"))[1].replace(/,/g,"."))}}else{if(navigator.plugins&&navigator.plugins["Shockwave Flash"]){var _6d=navigator.plugins["Shockwave Flash"];this.flashVersion=parseFloat(/(\d+\.?\d*)/.exec(_6d.description)[1]);var i=0;while(this.flashVersion>=_47&&i<navigator.mimeTypes.length){var _6f=navigator.mimeTypes[i];if(_6f.type=="application/x-shockwave-flash"&&_6f.enabledPlugin.description.toLowerCase().indexOf("quicktime")>-1){this.flashVersion=0;this.quicktime=true}i++}}}this.flash=this.flashVersion>=_47;this.transparencySupport=this.macintosh||this.windows;this.computedStyleSupport=this.ie||document.defaultView&&document.defaultView.getComputedStyle&&(!this.gecko||this.geckoBuildDate>=20030624);this.css=true;if(this.computedStyleSupport){try{var _70=document.getElementsByTagName("head")[0];_70.style.backgroundColor="#FF0000";var _71=dom.getComputedStyle(_70,"backgroundColor");this.css=!_71||/\#F{2}0{4}|rgb\(255,\s?0,\s?0\)/i.test(_71);_70=null}catch(e){}}this.xhtmlSupport=!!window.DOMParser&&!!document.importNode;try{var n=dom.create("span");if(!this.ieMac){n.innerHTML="x"}this.innerHtmlSupport=n.innerHTML=="x"}catch(e){this.innerHtmlSupport=false}this.zoomSupport=!!(this.opera&&document.documentElement);this.geckoXml=this.gecko&&(document.contentType||"").indexOf("xml")>-1;this.requiresPrefetch=this.ieWin||this.khtml;this.verifiedKonqueror=false;this.supported=this.flash&&this.css&&(!this.ie||this.ieSupported)&&(!this.opera||this.operaVersion>=8)&&(!this.webkit||this.webkitVersion>=412)&&(!this.konqueror||this.konquerorVersion>3.5)&&this.computedStyleSupport&&(this.innerHtmlSupport||!this.khtml&&this.xhtmlSupport)};this.ua=ua;var _73=new function(){function capitalize($){return $.toUpperCase()}this.normalize=function(str){if(_3b.preserveSingleWhitespace){return str.replace(/\s/g,_49)}return str.replace(/(\s)\s+/g,"$1").replace(/\xA0/,_49)};this.textTransform=function(_76,str){switch(_76){case "uppercase":str=str.toUpperCase();break;case "lowercase":str=str.toLowerCase();break;case "capitalize":var _78=str;str=str.replace(/^\w|\s\w/g,capitalize);if(str.indexOf("function capitalize")!=-1){var _79=_78.replace(/(^|\s)(\w)/g,"$1$1$2$2").split(/^\w|\s\w/g);str="";for(var i=0;i<_79.length;i++){str+=_79[i].charAt(0).toUpperCase()+_79[i].substring(1)}}break}return str};this.toHexString=function(str){if(typeof (str)!="string"||!str.charAt(0)=="#"||str.length!=4&&str.length!=7){return str}str=str.replace(/#/,"");if(str.length==3){str=str.replace(/(.)(.)(.)/,"$1$1$2$2$3$3")}return "0x"+str};this.toJson=function(obj){var _7d="";switch(typeof (obj)){case "string":_7d="\""+obj+"\"";break;case "number":case "boolean":_7d=obj.toString();break;case "object":_7d=[];for(var _7e in obj){if(obj[_7e]==Object.prototype[_7e]){continue}_7d.push("\""+_7e+"\":"+_73.toJson(obj[_7e]))}_7d="{"+_7d.join(",")+"}";break}return _7d};this.convertCssArg=function(arg){if(!arg){return {}}if(typeof (arg)=="object"){if(arg.constructor==Array){arg=arg.join("")}else{return arg}}var obj={};var _81=arg.split("}");for(var i=0;i<_81.length;i++){var $=_81[i].match(/([^\s{]+)\s*\{(.+)\s*;?\s*/);if(!$||$.length!=3){continue}if(!obj[$[1]]){obj[$[1]]={}}var _84=$[2].split(";");for(var j=0;j<_84.length;j++){var $2=_84[j].match(/\s*([^:\s]+)\s*\:\s*([^\s;]+)/);if(!$2||$2.length!=3){continue}obj[$[1]][$2[1]]=$2[2]}}return obj};this.extractFromCss=function(css,_88,_89,_8a){var _8b=null;if(css&&css[_88]&&css[_88][_89]){_8b=css[_88][_89];if(_8a){delete css[_88][_89]}}return _8b};this.cssToString=function(arg){var css=[];for(var _8e in arg){var _8f=arg[_8e];if(_8f==Object.prototype[_8e]){continue}css.push(_8e,"{");for(var _90 in _8f){if(_8f[_90]==Object.prototype[_90]){continue}css.push(_90,":",_8f[_90],";")}css.push("}")}return escape(css.join(""))};this.bind=function(_91,_92){return function(){_91[_92].apply(_91,arguments)}}};this.util=_73;var _67={};_67.fragmentIdentifier=new function(){this.fix=true;var _93;this.cache=function(){_93=document.title};function doFix(){document.title=_93}this.restore=function(){if(this.fix){setTimeout(doFix,0)}}};_67.synchronizer=new function(){this.isBlocked=false;this.block=function(){this.isBlocked=true};this.unblock=function(){this.isBlocked=false;_94.replaceAll()}};_67.zoom=new function(){var _95=100;this.getLatest=function(){return _95};if(ua.zoomSupport&&ua.opera){var _96=document.createElement("div");_96.style.position="fixed";_96.style.left="-65536px";_96.style.top="0";_96.style.height="100%";_96.style.width="1px";_96.style.zIndex="-32";document.documentElement.appendChild(_96);function updateZoom(){if(!_96){return}var _97=window.innerHeight/_96.offsetHeight;var _98=Math.round(_97*100)%10;if(_98>5){_97=Math.round(_97*100)+10-_98}else{_97=Math.round(_97*100)-_98}_95=isNaN(_97)?100:_97;_67.synchronizer.unblock();document.documentElement.removeChild(_96);_96=null}_67.synchronizer.block();setTimeout(updateZoom,54)}};this.hacks=_67;var _99={kwargs:[],replaceAll:function(){for(var i=0;i<this.kwargs.length;i++){_3b.replace(this.kwargs[i])}this.kwargs=[]}};var _94={kwargs:[],replaceAll:_99.replaceAll};function isValidDomain(){if(_3b.domains.length==0){return true}var _9b="";try{_9b=document.domain}catch(e){}if(_3b.fromLocal&&sIFR.domains[0]!="localhost"){sIFR.domains.unshift("localhost")}for(var i=0;i<_3b.domains.length;i++){var _9d=_3b.domains[i];if(_9d=="*"||_9d==_9b){return true}var _9e=_9d.lastIndexOf("*");if(_9e>-1){_9d=_9d.substr(_9e+1);var _9f=_9b.lastIndexOf(_9d);if(_9f>-1&&(_9f+_9d.length)==_9b.length){return true}}}return false}this.activate=function(){if(!ua.supported||!this.isEnabled||this.isActive||!isValidDomain()){return}if(arguments.length>0){this.prefetch.apply(this,arguments)}this.isActive=true;if(this.hideElements){this.setFlashClass()}if(ua.ieWin&&_67.fragmentIdentifier.fix&&window.location.hash!=""){_67.fragmentIdentifier.cache()}else{_67.fragmentIdentifier.fix=false}if(!this.registerEvents){return}function handler(evt){_3b.initialize();if(evt&&evt.type=="load"){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",handler,false)}if(window.removeEventListener){window.removeEventListener("load",handler,false)}}}if(window.addEventListener){if(_3b.useDomContentLoaded&&ua.gecko){document.addEventListener("DOMContentLoaded",handler,false)}window.addEventListener("load",handler,false)}else{if(ua.ieWin){if(_3b.useDomContentLoaded){document.write("<scr"+"ipt id=__sifr_ie_onload defer src=//:></script>");document.getElementById("__sifr_ie_onload").onreadystatechange=function(){if(this.readyState=="complete"){handler();this.removeNode()}}}window.attachEvent("onload",handler)}}};this.setFlashClass=function(){if(this.hasFlashClassSet){return}dom.addClass(_3c,dom.getBody()||document.documentElement);this.hasFlashClassSet=true};this.removeFlashClass=function(){if(!this.hasFlashClassSet){return}dom.removeClass(_3c,dom.getBody());dom.removeClass(_3c,document.documentElement);this.hasFlashClassSet=false};this.initialize=function(){if(_4d||!this.isActive||!this.isEnabled){return}_4d=true;_99.replaceAll();clearPrefetch()};function getSource(src){if(typeof (src)!="string"){if(src.src){src=src.src}if(typeof (src)!="string"){var _a2=[];for(var _a3 in src){if(src[_a3]!=Object.prototype[_a3]){_a2.push(_a3)}}_a2.sort().reverse();var _a4="";var i=-1;while(!_a4&&++i<_a2.length){if(parseFloat(_a2[i])<=ua.flashVersion){_a4=src[_a2[i]]}}src=_a4}}if(!src&&_3b.debugMode){throw new Error("sIFR: Could not determine appropriate source")}if(ua.ie&&src.charAt(0)=="/"){src=window.location.toString().replace(/([^:]+)(:\/?\/?)([^\/]+).*/,"$1$2$3")+src}return src}this.prefetch=function(){if(!ua.requiresPrefetch||!ua.supported||!this.isEnabled||!isValidDomain()){return}if(this.setPrefetchCookie&&new RegExp(";?"+_48+"=true;?").test(document.cookie)){return}try{_4c=true;if(ua.ieWin){prefetchIexplore(arguments)}else{prefetchLight(arguments)}if(this.setPrefetchCookie){document.cookie=_48+"=true;path="+this.cookiePath}}catch(e){if(_3b.debugMode){throw e}}};function prefetchIexplore(_a6){for(var i=0;i<_a6.length;i++){document.write("<script defer type=\"sifr/prefetch\" src=\""+getSource(_a6[i])+"\"></script>")}}function prefetchLight(_a8){for(var i=0;i<_a8.length;i++){new Image().src=getSource(_a8[i])}}function clearPrefetch(){if(!ua.ieWin||!_4c){return}try{var _aa=document.getElementsByTagName("script");for(var i=_aa.length-1;i>=0;i--){var _ac=_aa[i];if(_ac.type=="sifr/prefetch"){_ac.parentNode.removeChild(_ac)}}}catch(e){}}function getRatio(_ad,_ae){for(var i=0;i<_ae.length;i+=2){if(_ad<=_ae[i]){return _ae[i+1]}}return _ae[_ae.length-1]}function getFilters(obj){var _b1=[];for(var _b2 in obj){if(obj[_b2]==Object.prototype[_b2]){continue}var _b3=obj[_b2];_b2=[_b2.replace(/filter/i,"")+"Filter"];for(var _b4 in _b3){if(_b3[_b4]==Object.prototype[_b4]){continue}_b2.push(_b4+":"+escape(_73.toJson(_73.toHexString(_b3[_b4]))))}_b1.push(_b2.join(","))}return _b1.join(";")}function calculate(_b5){var _b6,_b7;if(!ua.ie){_b6=dom.getStyleAsInt(_b5,"lineHeight");_b7=Math.floor(dom.getStyleAsInt(_b5,"height")/_b6)}else{if(ua.ie){var _b8=_b5.innerHTML;_b5.style.visibility="visible";_b5.style.overflow="visible";_b5.style.position="static";_b5.style.zoom="normal";_b5.style.writingMode="lr-tb";_b5.style.width=_b5.style.height="auto";_b5.style.maxWidth=_b5.style.maxHeight=_b5.style.styleFloat="none";var _b9=_b5;var _ba=_b5.currentStyle.hasLayout;if(_ba){dom.setInnerHtml(_b5,"<div class=\""+_43+"\">X<br />X<br />X</div>");_b9=_b5.firstChild}else{dom.setInnerHtml(_b5,"X<br />X<br />X")}var _bb=_b9.getClientRects();_b6=_bb[1].bottom-_bb[1].top;_b6=Math.ceil(_b6*0.8);if(_ba){dom.setInnerHtml(_b5,"<div class=\""+_43+"\">"+_b8+"</div>");_b9=_b5.firstChild}else{dom.setInnerHtml(_b5,_b8)}_bb=_b9.getClientRects();_b7=_bb.length;if(_ba){dom.setInnerHtml(_b5,_b8)}_b5.style.visibility=_b5.style.width=_b5.style.height=_b5.style.maxWidth=_b5.style.maxHeight=_b5.style.overflow=_b5.style.styleFloat=_b5.style.position=_b5.style.zoom=_b5.style.writingMode=""}}return {lineHeight:_b6,lines:_b7}}this.replace=function(_bc,_bd){if(!ua.supported){return}if(_bd){for(var _be in _bc){if(typeof (_bd[_be])=="undefined"){_bd[_be]=_bc[_be]}}_bc=_bd}if(!_4d){return _99.kwargs.push(_bc)}if(_67.synchronizer.isBlocked){return _94.kwargs.push(_bc)}var _bf=_bc.elements;if(!_bf&&parseSelector){_bf=parseSelector(_bc.selector)}if(_bf.length==0){return}this.setFlashClass();var src=getSource(_bc.src);var css=_73.convertCssArg(_bc.css);var _c2=getFilters(_bc.filters);var _c3=(_bc.forceClear==null)?_3b.forceClear:_bc.forceClear;var _c4=(_bc.fitExactly==null)?_3b.fitExactly:_bc.fitExactly;var _c5=_c4||(_bc.forceWidth==null?_3b.forceWidth:_bc.forceWidth);var _c6=parseInt(_73.extractFromCss(css,".sIFR-root","leading"))||0;var _c7=_73.extractFromCss(css,".sIFR-root","font-size",true)||0;var _c8=_73.extractFromCss(css,".sIFR-root","background-color",true)||"#FFFFFF";var _c9=_73.extractFromCss(css,".sIFR-root","kerning",true)||"";var _ca=_bc.gridFitType||_73.extractFromCss(css,".sIFR-root","text-align")=="right"?"subpixel":"pixel";var _cb=_3b.forceTextTransform?_73.extractFromCss(css,".sIFR-root","text-transform",true)||"none":"none";var _cc=_73.extractFromCss(css,".sIFR-root","opacity",true)||"100";var _cd=_bc.pixelFont||false;var _ce=_bc.ratios||_4a;if(parseInt(_c7).toString()!=_c7&&_c7.indexOf("px")==-1){_c7=0}else{_c7=parseInt(_c7)}if(parseFloat(_cc)<1){_cc=100*parseFloat(_cc)}var _cf=null;var _d0="";if(_c4){_73.extractFromCss(css,".sIFR-root","text-align",true)}if(!_bc.modifyCss){_d0=_73.cssToString(css);_cf=_3b.fixHover&&_d0.indexOf("%3Ahover")>-1}var _d1=_bc.wmode||"";if(_d1=="transparent"){if(!ua.transparencySupport){_d1="opaque"}else{_c8="transparent"}}for(var i=0;i<_bf.length;i++){var _d3=_bf[i];if(!ua.verifiedKonqueror){if(dom.getComputedStyle(_d3,"lineHeight").match(/e\+08px/)){ua.supported=_3b.isEnabled=false;this.removeFlashClass();return}ua.verifiedKonqueror=true}if(dom.hasOneOfClassses([_3d,_3e,_40,_41],_d3)){continue}var _d4=false;if(!_d3.offsetHeight||!_d3.offsetWidth){if(!_3b.replaceNonDisplayed){continue}_d3.style.display="block";if(!_d3.offsetHeight||!_d3.offsetWidth){_d3.style.display="";continue}_d4=true}if(_c3&&ua.gecko){_d3.style.clear="both"}var _d5=null;if(_3b.fixWrap&&ua.ie&&dom.getComputedStyle(_d3,"display")=="block"){_d5=_d3.innerHTML;dom.setInnerHtml(_d3,"X")}var _d6=dom.getStyleAsInt(_d3,"width",ua.ie);if(_d6==0){var _d7=dom.getStyleAsInt(_d3,"paddingRight",true);var _d8=dom.getStyleAsInt(_d3,"paddingLeft",true);var _d9=dom.getStyleAsInt(_d3,"borderRightWidth",true);var _da=dom.getStyleAsInt(_d3,"borderLeftWidth",true);_d6=_d3.offsetWidth-_d8-_d7-_da-_d9}if(_d5&&_3b.fixWrap&&ua.ie){dom.setInnerHtml(_d3,_d5)}var _db,_dc;if(!_c7){var _dd=calculate(_d3);_db=Math.min(_46,Math.max(_45,_dd.lineHeight));if(_cd){_db=Math.max(8,8*Math.round(_db/8))}_dc=_dd.lines;if(isNaN(_dc)||!isFinite(_dc)||_dc==0){_dc=1}if(_dc>1&&_c6){_de+=Math.round((_dc-1)*_c6)}}else{_db=_c7;_dc=1}var _de=Math.round(_dc*_db);if(_d4){_d3.style.display=""}if(_c3&&ua.gecko){_d3.style.clear=""}var _df=dom.create("span");_df.className=_41;var _e0=_d3.cloneNode(true);for(var j=0,l=_e0.childNodes.length;j<l;j++){_df.appendChild(_e0.childNodes[j].cloneNode(true))}if(_bc.modifyContent){_bc.modifyContent(_e0,_bc.selector)}if(_bc.modifyCss){_d0=_bc.modifyCss(css,_e0,_bc.selector)}if(_cf==null){_cf=_3b.fixHover&&_d0.indexOf("%3Ahover")>-1}var _e3=handleContent(_e0,_cb);if(_bc.modifyContentString){_e3=_bc.modifyContentString(_e3,_bc.selector)}if(_e3==""){continue}var _e4=["content="+_e3,"width="+_d6,"height="+_de,"fitexactly="+(_c4?"true":""),"tunewidth="+(_bc.tuneWidth||""),"tuneheight="+(_bc.tuneHeight||""),"offsetleft="+(_bc.offsetLeft||""),"offsettop="+(_bc.offsetTop||""),"thickness="+(_bc.thickness||""),"sharpness="+(_bc.sharpness||""),"kerning="+_c9,"gridfittype="+_ca,"zoomsupport="+ua.zoomSupport,"flashfilters="+_c2,"opacity="+_cc,"blendmode="+(_bc.blendMode||""),"size="+_db,"zoom="+dom.getZoom(),"css="+_d0,"selectable="+(_bc.selectable==null?"true":_bc.selectable),"lines="+_dc];var _e5=encodeURI(_e4.join("&amp;"));var _e6="sIFR_callback_"+_4b++;var _e7=new CallbackInfo(_e6,_e4,_bc.onReplacement,_cf);window[_e6+"_DoFSCommand"]=(function(_e8){return function(_e9,arg){_e8.handle(_e9,arg)}})(_e7);_de=Math.round(_dc*getRatio(_db,_ce)*_db);var _eb=_c5?_d6:"100%";var _ec;if(ua.ie){_ec=["<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" id=\"",_e6,"\" sifr=\"true\" width=\"",_eb,"\" height=\"",_de,"\" class=\"",_3f,"\">","<param name=\"movie\" value=\"",src,"\"></param>","<param name=\"flashvars\" value=\"",_e5,"\"></param>","<param name=\"allowScriptAccess\" value=\"always\"></param>","<param name=\"quality\" value=\"best\"></param>","<param name=\"wmode\" value=\"",_d1,"\"></param>","<param name=\"bgcolor\" value=\"",_c8,"\"></param>","<param name=\"name\" value=\"",_e6,"\"></param>","</object>","<scr","ipt event=FSCommand(info,args) for=",_e6,">",_e6,"_DoFSCommand(info, args);","</","script>"].join("")}else{_ec=["<embed type=\"application/x-shockwave-flash\"",(ua.opera||!_3b.delayCss?" class=\""+_3f+"\"":"")," src=\"",src,"\" quality=\"best\" flashvars=\"",_e5,"\" width=\"",_eb,"\" height=\"",_de,"\" wmode=\"",_d1,"\" bgcolor=\"",_c8,"\" name=\"",_e6,"\" id=\"",_e6,"\" allowScriptAccess=\"always\" sifr=\"true\"></embed>"].join("")}dom.setInnerHtml(_d3,_ec);_e7.flashNode=_d3.firstChild;_e7.html=_ec;_4e.push(_e7);_d3.appendChild(_df);dom.addClass(_3b.delayCss?_3e:_3d,_d3);_e7.setupFixHover()}_67.fragmentIdentifier.restore()};function handleContent(_ed,_ee){var _ef=[],_f0=[];var _f1=_ed.childNodes;var i=0;while(i<_f1.length){var _f3=_f1[i];if(_f3.nodeType==3){var _f4=_73.normalize(_f3.nodeValue);_f4=_73.textTransform(_ee,_f4);_f0.push(_f4.replace(/\%/g,"%25").replace(/\&/g,"%26").replace(/\,/g,"%2C").replace(/\+/g,"%2B"))}if(_f3.nodeType==1){var _f5=[];var _f6=_f3.nodeName.toLowerCase();var _f7=_f3.className||"";if(/\s+/.test(_f7)){if(_f7.indexOf(_42)){_f7=_f7.match("(\\s|^)"+_42+"-([^\\s$]*)(\\s|$)")[2]}else{_f7=_f7.match(/^([^\s]+)/)[1]}}if(_f7!=""){_f5.push("class=\""+_f7+"\"")}if(_f6=="a"){var _f8=_f3.getAttribute("href")||"";var _f9=_f3.getAttribute("target")||"";_f5.push("href=\""+_f8+"\"","target=\""+_f9+"\"")}_f0.push("<"+_f6+(_f5.length>0?" ":"")+escape(_f5.join(" "))+">");if(_f3.hasChildNodes()){_ef.push(i);i=0;_f1=_f3.childNodes;continue}else{if(!/^(br|img)$/i.test(_f3.nodeName)){_f0.push("</",_f3.nodeName.toLowerCase(),">")}}}if(_ef.length>0&&!_f3.nextSibling){do{i=_ef.pop();_f1=_f3.parentNode.parentNode.childNodes;_f3=_f1[i];if(_f3){_f0.push("</",_f3.nodeName.toLowerCase(),">")}}while(i<_f1.length&&_ef.length>0)}i++}return _f0.join("").replace(/\n|\r/g,"")}function CallbackInfo(id,_fb,_fc,_fd){this.id=id;this.vars=_fb;this._replacementHandler=_fc;this._firedReplacementEvent=!(this._replacementHandler!=null);this._fixHover=_fd;this._setClasses=!_3b.delayCss;this.html="";this._pings=0}CallbackInfo.prototype.getFlashNode=function(){return document.getElementById(this.id)};CallbackInfo.prototype.handle=function(_fe,arg){if(/(FSCommand\:)?resize/.test(_fe)){var _100=this.getFlashNode();var $=arg.split(":");_100.setAttribute($[0],$[1]);if(!this._setClasses&&$[0]=="height"){if(!ua.ie&&!ua.opera){dom.addClass(_3f,_100)}dom.removeClass(_3e,_100.parentNode);dom.addClass(_3d,_100.parentNode);this._setClasses=true}if(ua.khtml){var _102=_100.offsetHeight}if(!this._firedReplacementEvent){this._replacementHandler(this);this._firedReplacementEvent=true}}else{if(/(FSCommand\:)?resetmovie/.test(_fe)){this.resetMovie()}else{if(/(FSCommand\:)?ping/.test(_fe)){if(this._pings>0){this.setupFixHover()}this._pings++}}}};CallbackInfo.prototype.call=function(type,_104){var _105=this.getFlashNode();if(!_105){return}_105.SetVariable("callbackType",type);_105.SetVariable("callbackValue",_104);_105.SetVariable("callbackTrigger",true)};CallbackInfo.prototype.write=function(_106){this.call("write",_106);this.vars[0]="content="+_106;this.html=this.html.replace(/(flashvars(=|\"\svalue=)\")[^\"]+/,"$1"+encodeURI(this.vars.join("&amp;")))};CallbackInfo.prototype.resetMovie=function(){var _107=this.getFlashNode();var node=_107.parentNode;node.replaceChild(dom.nodeFromHtml(this.html),_107);this.setupFixHover()};CallbackInfo.prototype.setupFixHover=function(){var _109=this.getFlashNode();if(!this._fixHover||!_109){return}var node=_109.parentNode;if(node.addEventListener){node.addEventListener("mouseout",_73.bind(this,"fixHover"),false)}else{if(node.attachEvent){node.attachEvent("onmouseout",_73.bind(this,"fixHover"))}}};CallbackInfo.prototype.fixHover=function(){this.call("resettext")}};