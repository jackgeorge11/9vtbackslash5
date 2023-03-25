"use strict";(self.webpackChunk_9vtbackslash5=self.webpackChunk_9vtbackslash5||[]).push([[772],{1873:function(e,t,l){l.d(t,{Z:function(){return u}});var a=l(7294),c=l(2349),n=l(2143),o=l(3723),r=l(6791),i=l(1082),s=l(9111),m="undefined"!=typeof window;function u(e){var t=e.children,l=e.src,u=e.alt,d=e.title,E=e.description,g=e.canonical,h=e.additional,k=e.scroller,p=e.crumbs,f=(0,a.useContext)(r.d).color,v=(0,a.useState)(void 0),N=v[0],b=v[1],w=(0,a.useState)(void 0),C=w[0],L=w[1],S=void 0,M=void 0;return m&&(S=window.location.pathname,M=window.location.hash),(0,a.useEffect)((function(){b(S),L(M)}),[S,M]),C?a.createElement("div",{className:"zoom",style:{backgroundColor:f}},a.createElement("div",{className:"image"},a.createElement(o.G,{image:l,alt:u})),a.createElement("div",{className:"back"},a.createElement("h2",null,a.createElement(i.Link,{className:"thick under pointer",to:N},"click here")," ","to go back to the details."))):a.createElement(c.Z,{page:"catalogue",title:d,description:E,canonical:g,additional:h},a.createElement("main",{className:"product"},a.createElement(i.Link,{className:"image image-desktop pointer",to:N+"#zoom"},a.createElement(o.G,{image:l,alt:u})),a.createElement("div",{className:"product-window-wrapper"},a.createElement(s.Z,{crumbs:p,className:"small"}),a.createElement(n.Z,{className:"small",scroller:k,article:!0},t))))}},8338:function(e,t,l){l.r(t),l.d(t,{default:function(){return g}});var a,c,n=l(7294),o=l(1873),r=l(1082),i=l(8872),s=l(2405),m=l(3723),u=function(e){var t=e.children;return n.createElement("span",{className:"bold"},t)},d=function(e){var t=e.children;return n.createElement("p",{className:"align-center"},t)},E={renderMark:(a={},a[s.MARKS.BOLD]=function(e){return n.createElement(u,null,e)},a),renderNode:(c={},c[s.BLOCKS.PARAGRAPH]=function(e,t){return n.createElement(d,null,t)},c[s.BLOCKS.EMBEDDED_ASSET]=function(e){return n.createElement(n.Fragment,null,n.createElement("h2",null,"Embedded Asset"),n.createElement("pre",null,n.createElement("code",null,JSON.stringify(e,null,2))))},c)};function g(e){var t,l,a,c,s=e.data,u=null===(t=s.allContentfulMood)||void 0===t||null===(l=t.nodes)||void 0===l?void 0:l[0],d=null===(a=s.allContentfulMoodsCollection)||void 0===a||null===(c=a.nodes)||void 0===c?void 0:c[0],g=(0,m.c)(null==u?void 0:u.photo),h=u.description,k=d.description;return n.createElement(o.Z,{src:g,alt:u.title,title:u.title,description:u.title+" from "+u.artist+"'s Moods collection.",canonical:d.slug+"/"+u.slug,crumbs:[{title:"catalogue",slug:"/catalogue"},{title:"Moods",slug:"/catalogue/moods/"+d.slug},{title:d.artist,slug:"/catalogue/moods/"+d.slug},{title:u.title,slug:"/catalogue/moods/"+d.slug+"/"+u.slug}]},n.createElement("h1",{className:"italic title"},u.title),n.createElement("h2",{className:"--muted ta-right author"},"by ",d.artist),h&&(0,i.Z)(h,E),k&&(0,i.Z)(k,E),n.createElement("h2",{className:"--muted"},u.isSold&&"this piece is sold."),n.createElement("h2",{className:"--muted"},d.saleEnded&&"sale has ended for this collection."),n.createElement("h2",null,n.createElement(r.Link,{to:"/catalogue/moods/"+d.slug},"click here")," to go back to the collection, or ",n.createElement(r.Link,{to:"/catalogue"},"click here")," to go back to our catalogue."),n.createElement("h1",null,"details"),u.price&&n.createElement("h2",{className:"m-0"},"$"+u.price),u.medium&&n.createElement("h2",{className:"m-0"},u.medium),u.size&&n.createElement("h2",{className:"m-0"},u.size),n.createElement("h2",{className:"ta-right"},n.createElement(r.Link,{to:"/catalogue/moods/"+d.slug},"click here")," to go back to the collection."),n.createElement("h2",{className:"ta-right"},"or ",n.createElement(r.Link,{to:"/catalogue"},"click here")," to navigate back to our catalogue."))}}}]);
//# sourceMappingURL=component---src-templates-mood-js-1a8d8aba4da1b3771a03.js.map