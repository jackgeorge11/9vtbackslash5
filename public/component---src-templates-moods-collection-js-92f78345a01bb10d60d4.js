"use strict";(self.webpackChunk_9vtbackslash5=self.webpackChunk_9vtbackslash5||[]).push([[874],{3774:function(e,t,l){l.r(t),l.d(t,{default:function(){return h}});var a,n,c=l(7294),r=l(1082),s=l(3723),o=l(2349),u=l(2143),i=l(8872),m=l(2405),d=function(e){var t=e.children;return c.createElement("span",{className:"bold"},t)},E=function(e){var t=e.children;return c.createElement("p",{className:"align-center"},t)},g={renderMark:(a={},a[m.MARKS.BOLD]=function(e){return c.createElement(d,null,e)},a),renderNode:(n={},n[m.BLOCKS.PARAGRAPH]=function(e,t){return c.createElement(E,null,t)},n[m.BLOCKS.EMBEDDED_ASSET]=function(e){return c.createElement(c.Fragment,null,c.createElement("h2",null,"Embedded Asset"),c.createElement("pre",null,c.createElement("code",null,JSON.stringify(e,null,2))))},n)};function h(e){var t=e.data.allContentfulMoodsCollection.nodes[0],l=function(e){for(var t,l=e.length;0!==l;){t=Math.floor(Math.random()*l),l--;var a=[e[t],e[l]];e[l]=a[0],e[t]=a[1]}return e}(t.moods);return c.createElement(o.Z,{page:"catalogue",title:"Moods by "+t.title,description:t.artist+"'s Moods collection. Released "+t.releaseDate+".",canonical:t.slug},c.createElement(u.Z,{className:"large catalogue",crumbs:[{title:"catalogue",slug:"/catalogue"},{title:"Moods",slug:"/catalogue/moods/"+t.slug},{title:t.artist,slug:"/catalogue/moods/"+t.slug}]},c.createElement("div",{className:"description"},c.createElement("h1",{className:"title italic"},"Moods"),c.createElement("h2",{className:"--muted ta-right author"},"by ",t.artist),t.description&&(0,i.Z)(t.description,g),t.saleEnded&&c.createElement("h2",{className:"--muted"},"sale has ended for this collection."),c.createElement("h2",{className:"--muted scroll"},"(scroll --\x3e)")),l.map((function(e){return c.createElement("div",{className:"idea"},c.createElement(r.Link,{className:"cover",to:"/catalogue/moods/cottu/"+e.slug},c.createElement(s.G,{image:(0,s.c)(e.photo),alt:e.title,objectFit:"contain",style:{maxHeight:"100%"}})),c.createElement("div",{className:"info"},c.createElement("h1",null,c.createElement(r.Link,{className:"cover",to:"/catalogue/moods/cottu/"+e.slug},e.title)),e.isSold&&c.createElement("h2",{className:"--muted"},"(sold)")))}))))}}}]);
//# sourceMappingURL=component---src-templates-moods-collection-js-92f78345a01bb10d60d4.js.map