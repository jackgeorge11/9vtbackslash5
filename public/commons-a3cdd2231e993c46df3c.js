(self.webpackChunk_9vtbackslash5=self.webpackChunk_9vtbackslash5||[]).push([[351],{2993:function(e){var t="undefined"!=typeof Element,n="function"==typeof Map,r="function"==typeof Set,o="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){if(e.constructor!==i.constructor)return!1;var c,s,u,l;if(Array.isArray(e)){if((c=e.length)!=i.length)return!1;for(s=c;0!=s--;)if(!a(e[s],i[s]))return!1;return!0}if(n&&e instanceof Map&&i instanceof Map){if(e.size!==i.size)return!1;for(l=e.entries();!(s=l.next()).done;)if(!i.has(s.value[0]))return!1;for(l=e.entries();!(s=l.next()).done;)if(!a(s.value[1],i.get(s.value[0])))return!1;return!0}if(r&&e instanceof Set&&i instanceof Set){if(e.size!==i.size)return!1;for(l=e.entries();!(s=l.next()).done;)if(!i.has(s.value[0]))return!1;return!0}if(o&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(i)){if((c=e.length)!=i.length)return!1;for(s=c;0!=s--;)if(e[s]!==i[s])return!1;return!0}if(e.constructor===RegExp)return e.source===i.source&&e.flags===i.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===i.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===i.toString();if((c=(u=Object.keys(e)).length)!==Object.keys(i).length)return!1;for(s=c;0!=s--;)if(!Object.prototype.hasOwnProperty.call(i,u[s]))return!1;if(t&&e instanceof Element)return!1;for(s=c;0!=s--;)if(("_owner"!==u[s]&&"__v"!==u[s]&&"__o"!==u[s]||!e.$$typeof)&&!a(e[u[s]],i[u[s]]))return!1;return!0}return e!=e&&i!=i}e.exports=function(e,t){try{return a(e,t)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}}},4839:function(e,t,n){"use strict";var r,o=n(7294),a=(r=o)&&"object"==typeof r&&"default"in r?r.default:r;function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,n){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(r){if("function"!=typeof r)throw new Error("Expected WrappedComponent to be a React component.");var s,u=[];function l(){s=e(u.map((function(e){return e.props}))),f.canUseDOM?t(s):n&&(s=n(s))}var f=function(e){var t,n;function o(){return e.apply(this,arguments)||this}n=e,(t=o).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,o.peek=function(){return s},o.rewind=function(){if(o.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=s;return s=void 0,u=[],e};var i=o.prototype;return i.UNSAFE_componentWillMount=function(){u.push(this),l()},i.componentDidUpdate=function(){l()},i.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),l()},i.render=function(){return a.createElement(r,this.props)},o}(o.PureComponent);return i(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(r)+")"),i(f,"canUseDOM",c),f}}},2349:function(e,t,n){"use strict";n.d(t,{Z:function(){return we}});var r,o,a,i,c=n(1597),s=n(8945),u=n(7294),l=n(5697),f=n.n(l),p=n(4839),d=n.n(p),m=n(2993),h=n.n(m),b=n(6494),y=n.n(b),g="bodyAttributes",v="htmlAttributes",T="titleAttributes",w={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},E=(Object.keys(w).map((function(e){return w[e]})),"charset"),C="cssText",A="href",O="http-equiv",S="innerHTML",k="itemprop",j="name",x="property",L="rel",P="src",N="target",I={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},M="defaultTitle",_="defer",R="encodeSpecialCharacters",q="onChangeClientState",D="titleTemplate",B=Object.keys(I).reduce((function(e,t){return e[I[t]]=t,e}),{}),F=[w.NOSCRIPT,w.SCRIPT,w.STYLE],H="data-react-helmet",Y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},z=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},U=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),K=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},V=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},W=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},J=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},$=function(e){var t=ee(e,w.TITLE),n=ee(e,D);if(n&&t)return n.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var r=ee(e,M);return t||r||void 0},G=function(e){return ee(e,q)||function(){}},Z=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return K({},e,t)}),{})},Q=function(e,t){return t.filter((function(e){return void 0!==e[w.BASE]})).map((function(e){return e[w.BASE]})).reverse().reduce((function(t,n){if(!t.length)for(var r=Object.keys(n),o=0;o<r.length;o++){var a=r[o].toLowerCase();if(-1!==e.indexOf(a)&&n[a])return t.concat(n)}return t}),[])},X=function(e,t,n){var r={};return n.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ae("Helmet: "+e+' should be of type "Array". Instead found type "'+Y(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,n){var o={};n.filter((function(e){for(var n=void 0,a=Object.keys(e),i=0;i<a.length;i++){var c=a[i],s=c.toLowerCase();-1===t.indexOf(s)||n===L&&"canonical"===e[n].toLowerCase()||s===L&&"stylesheet"===e[s].toLowerCase()||(n=s),-1===t.indexOf(c)||c!==S&&c!==C&&c!==k||(n=c)}if(!n||!e[n])return!1;var u=e[n].toLowerCase();return r[n]||(r[n]={}),o[n]||(o[n]={}),!r[n][u]&&(o[n][u]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(o),i=0;i<a.length;i++){var c=a[i],s=y()({},r[c],o[c]);r[c]=s}return e}),[]).reverse()},ee=function(e,t){for(var n=e.length-1;n>=0;n--){var r=e[n];if(r.hasOwnProperty(t))return r[t]}return null},te=(r=Date.now(),function(e){var t=Date.now();t-r>16?(r=t,e(t)):setTimeout((function(){te(e)}),0)}),ne=function(e){return clearTimeout(e)},re="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||te:n.g.requestAnimationFrame||te,oe="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ne:n.g.cancelAnimationFrame||ne,ae=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ie=null,ce=function(e,t){var n=e.baseTag,r=e.bodyAttributes,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,s=e.onChangeClientState,u=e.scriptTags,l=e.styleTags,f=e.title,p=e.titleAttributes;le(w.BODY,r),le(w.HTML,o),ue(f,p);var d={baseTag:fe(w.BASE,n),linkTags:fe(w.LINK,a),metaTags:fe(w.META,i),noscriptTags:fe(w.NOSCRIPT,c),scriptTags:fe(w.SCRIPT,u),styleTags:fe(w.STYLE,l)},m={},h={};Object.keys(d).forEach((function(e){var t=d[e],n=t.newTags,r=t.oldTags;n.length&&(m[e]=n),r.length&&(h[e]=d[e].oldTags)})),t&&t(),s(e,m,h)},se=function(e){return Array.isArray(e)?e.join(""):e},ue=function(e,t){void 0!==e&&document.title!==e&&(document.title=se(e)),le(w.TITLE,t)},le=function(e,t){var n=document.getElementsByTagName(e)[0];if(n){for(var r=n.getAttribute(H),o=r?r.split(","):[],a=[].concat(o),i=Object.keys(t),c=0;c<i.length;c++){var s=i[c],u=t[s]||"";n.getAttribute(s)!==u&&n.setAttribute(s,u),-1===o.indexOf(s)&&o.push(s);var l=a.indexOf(s);-1!==l&&a.splice(l,1)}for(var f=a.length-1;f>=0;f--)n.removeAttribute(a[f]);o.length===a.length?n.removeAttribute(H):n.getAttribute(H)!==i.join(",")&&n.setAttribute(H,i.join(","))}},fe=function(e,t){var n=document.head||document.querySelector(w.HEAD),r=n.querySelectorAll(e+"["+"data-react-helmet]"),o=Array.prototype.slice.call(r),a=[],i=void 0;return t&&t.length&&t.forEach((function(t){var n=document.createElement(e);for(var r in t)if(t.hasOwnProperty(r))if(r===S)n.innerHTML=t.innerHTML;else if(r===C)n.styleSheet?n.styleSheet.cssText=t.cssText:n.appendChild(document.createTextNode(t.cssText));else{var c=void 0===t[r]?"":t[r];n.setAttribute(r,c)}n.setAttribute(H,"true"),o.some((function(e,t){return i=t,n.isEqualNode(e)}))?o.splice(i,1):a.push(n)})),o.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return n.appendChild(e)})),{oldTags:o,newTags:a}},pe=function(e){return Object.keys(e).reduce((function(t,n){var r=void 0!==e[n]?n+'="'+e[n]+'"':""+n;return t?t+" "+r:r}),"")},de=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[I[n]||n]=e[n],t}),t)},me=function(e,t,n){switch(e){case w.TITLE:return{toComponent:function(){return e=t.title,n=t.titleAttributes,(r={key:e})[H]=!0,o=de(n,r),[u.createElement(w.TITLE,o,e)];var e,n,r,o},toString:function(){return function(e,t,n,r){var o=pe(n),a=se(t);return o?"<"+e+' data-react-helmet="true" '+o+">"+J(a,r)+"</"+e+">":"<"+e+' data-react-helmet="true">'+J(a,r)+"</"+e+">"}(e,t.title,t.titleAttributes,n)}};case g:case v:return{toComponent:function(){return de(t)},toString:function(){return pe(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,n){var r,o=((r={key:n})[H]=!0,r);return Object.keys(t).forEach((function(e){var n=I[e]||e;if(n===S||n===C){var r=t.innerHTML||t.cssText;o.dangerouslySetInnerHTML={__html:r}}else o[n]=t[e]})),u.createElement(e,o)}))}(e,t)},toString:function(){return function(e,t,n){return t.reduce((function(t,r){var o=Object.keys(r).filter((function(e){return!(e===S||e===C)})).reduce((function(e,t){var o=void 0===r[t]?t:t+'="'+J(r[t],n)+'"';return e?e+" "+o:o}),""),a=r.innerHTML||r.cssText||"",i=-1===F.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+o+(i?"/>":">"+a+"</"+e+">")}),"")}(e,t,n)}}}},he=function(e){var t=e.baseTag,n=e.bodyAttributes,r=e.encode,o=e.htmlAttributes,a=e.linkTags,i=e.metaTags,c=e.noscriptTags,s=e.scriptTags,u=e.styleTags,l=e.title,f=void 0===l?"":l,p=e.titleAttributes;return{base:me(w.BASE,t,r),bodyAttributes:me(g,n,r),htmlAttributes:me(v,o,r),link:me(w.LINK,a,r),meta:me(w.META,i,r),noscript:me(w.NOSCRIPT,c,r),script:me(w.SCRIPT,s,r),style:me(w.STYLE,u,r),title:me(w.TITLE,{title:f,titleAttributes:p},r)}},be=d()((function(e){return{baseTag:Q([A,N],e),bodyAttributes:Z(g,e),defer:ee(e,_),encode:ee(e,R),htmlAttributes:Z(v,e),linkTags:X(w.LINK,[L,A],e),metaTags:X(w.META,[j,E,O,x,k],e),noscriptTags:X(w.NOSCRIPT,[S],e),onChangeClientState:G(e),scriptTags:X(w.SCRIPT,[P,S],e),styleTags:X(w.STYLE,[C],e),title:$(e),titleAttributes:Z(T,e)}}),(function(e){ie&&oe(ie),e.defer?ie=re((function(){ce(e,(function(){ie=null}))})):(ce(e),ie=null)}),he)((function(){return null})),ye=(o=be,i=a=function(e){function t(){return z(this,t),W(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!h()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case w.SCRIPT:case w.NOSCRIPT:return{innerHTML:t};case w.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,n=e.child,r=e.arrayTypeChildren,o=e.newChildProps,a=e.nestedChildren;return K({},r,((t={})[n.type]=[].concat(r[n.type]||[],[K({},o,this.mapNestedChildrenToProps(n,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,n,r=e.child,o=e.newProps,a=e.newChildProps,i=e.nestedChildren;switch(r.type){case w.TITLE:return K({},o,((t={})[r.type]=i,t.titleAttributes=K({},a),t));case w.BODY:return K({},o,{bodyAttributes:K({},a)});case w.HTML:return K({},o,{htmlAttributes:K({},a)})}return K({},o,((n={})[r.type]=K({},a),n))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var n=K({},t);return Object.keys(e).forEach((function(t){var r;n=K({},n,((r={})[t]=e[t],r))})),n},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var n=this,r={};return u.Children.forEach(e,(function(e){if(e&&e.props){var o=e.props,a=o.children,i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,n){return t[B[n]||n]=e[n],t}),t)}(V(o,["children"]));switch(n.warnOnInvalidChildren(e,a),e.type){case w.LINK:case w.META:case w.NOSCRIPT:case w.SCRIPT:case w.STYLE:r=n.flattenArrayTypeChildren({child:e,arrayTypeChildren:r,newChildProps:i,nestedChildren:a});break;default:t=n.mapObjectTypeChildren({child:e,newProps:t,newChildProps:i,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(r,t)},t.prototype.render=function(){var e=this.props,t=e.children,n=V(e,["children"]),r=K({},n);return t&&(r=this.mapChildrenToProps(t,r)),u.createElement(o,r)},U(t,null,[{key:"canUseDOM",set:function(e){o.canUseDOM=e}}]),t}(u.Component),a.propTypes={base:f().object,bodyAttributes:f().object,children:f().oneOfType([f().arrayOf(f().node),f().node]),defaultTitle:f().string,defer:f().bool,encodeSpecialCharacters:f().bool,htmlAttributes:f().object,link:f().arrayOf(f().object),meta:f().arrayOf(f().object),noscript:f().arrayOf(f().object),onChangeClientState:f().func,script:f().arrayOf(f().object),style:f().arrayOf(f().object),title:f().string,titleAttributes:f().object,titleTemplate:f().string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=o.peek,a.rewind=function(){var e=o.rewind();return e||(e=he({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},i);ye.renderStatic=ye.rewind;var ge=ye,ve=n(7841),Te=n(6791);function we(e){var t=e.children,r=e.title,o=e.description,a=e.canonical,i=e.page,l=e.additional,f=(0,u.useContext)(ve.A).cartTotal,p=(0,u.useContext)(Te.d),d=p.color,m=p.arrangement,h=p.logoClick,b=function(e,t){return[{title:"home",slug:"/"},{title:"catalogue",slug:"/catalogue"},{title:"submissions",slug:"/submissions"},{title:"about",slug:"/about"},{title:"inquiries",slug:"/inquiries"},{title:"cart",slug:"/cart"}][t]},y=(0,u.useState)([{},{},{},{}]),g=y[0],v=y[1];return(0,u.useEffect)((function(){m&&v([m.a,m.b,m.c,m.d,m.e])}),[m]),u.createElement("div",{className:"main"},u.createElement(ge,null,u.createElement("title",null,r),u.createElement("meta",{name:"description",content:o}),u.createElement("link",{rel:"canonical",href:"home"===i?"https://www.9vtbackslash5.com":a?"https://www.9vtbackslash5.com/"+i+"/"+a:"https://www.9vtbackslash5.com/"+i}),u.createElement("style",{type:"text/css"},"body {background-color: "+d+"}"),l&&l.map((function(e){return u.createElement("meta",{name:e.name,content:e.content})}))),m?g.map((function(e,t){return u.createElement(c.Link,{to:b(0,t).slug,style:{top:e.top,left:e.left},className:"nav-item sm",key:t},b(0,t).title)})):u.createElement(u.Fragment,null,u.createElement("nav",{className:"sm"},u.createElement(c.Link,{to:"/",className:"home"===i?"is--active sm":"sm"},"home")," \\\\ ",u.createElement(c.Link,{to:"/catalogue",className:"catalogue"===i?"is--active sm":"sm"},"catalogue")," \\\\ ",u.createElement(c.Link,{to:"/about",className:"about"===i?"is--active sm":"sm"},"about")," \\\\ ",u.createElement(c.Link,{to:"/inquiries",className:"inquiries"===i?"is--active sm":"sm"},"inquiries"),f?u.createElement(u.Fragment,null," \\\\ ",u.createElement(c.Link,{to:"/cart",className:"cart"===i?"is--active sm":"sm"},"cart (",f,")")):null),u.createElement("div",{className:"footer"},u.createElement("p",{className:"--muted"},"© 2022 9VT\\5"),u.createElement("p",{className:"--muted"},u.createElement("a",{target:"_blank",rel:"noopener noreferrer nofollow",href:"https://instagram.com/9vtbackslash5"},"instagram")),u.createElement("p",{className:"--muted"},"website by"," ",u.createElement("a",{target:"_blank",rel:"noopener noreferrer nofollow",href:"https://jackgeorge.xyz"},"Jack George")))),t,"home"!==i?u.createElement(u.Fragment,null,u.createElement("div",{className:"w-20 half-logo right pointer",onClick:h,role:"button"},u.createElement(s.S,{src:"../assets/brand/logo.png",alt:"logo",__imageData:n(5710)})),u.createElement("div",{className:"w-20 half-logo left pointer",onClick:h,role:"button"},u.createElement(s.S,{src:"../assets/brand/logo.png",alt:"logo",__imageData:n(5710)}))):null)}},5710:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#f8f8f8","images":{"fallback":{"src":"/static/5a3c3b69cd088a7aaf8e601420a6bec3/ddeb7/logo.png","srcSet":"/static/5a3c3b69cd088a7aaf8e601420a6bec3/d5768/logo.png 266w,\\n/static/5a3c3b69cd088a7aaf8e601420a6bec3/f8c41/logo.png 532w,\\n/static/5a3c3b69cd088a7aaf8e601420a6bec3/ddeb7/logo.png 1064w","sizes":"(min-width: 1064px) 1064px, 100vw"},"sources":[{"srcSet":"/static/5a3c3b69cd088a7aaf8e601420a6bec3/fe606/logo.webp 266w,\\n/static/5a3c3b69cd088a7aaf8e601420a6bec3/0d663/logo.webp 532w,\\n/static/5a3c3b69cd088a7aaf8e601420a6bec3/b80c2/logo.webp 1064w","type":"image/webp","sizes":"(min-width: 1064px) 1064px, 100vw"}]},"width":1064,"height":1008}')}}]);
//# sourceMappingURL=commons-a3cdd2231e993c46df3c.js.map