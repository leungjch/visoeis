(this.webpackJsonpvizeois=this.webpackJsonpvizeois||[]).push([[0],{53:function(e,t,n){e.exports=n(61)},58:function(e,t,n){},59:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(22),c=n.n(o),i=(n(58),n(1)),l=n(11),s=(n(59),n(15)),u=n.n(s),f=n(4);var m=function(e){var t=e.width,n=e.height,o=e.data,c=e.usingLinear;function i(e,t){return{min:Math.min.apply(null,e.map((function(e){return e[t]}))),max:Math.max.apply(null,e.map((function(e){return e[t]})))}}var l=Object(a.useRef)();Object(a.useEffect)((function(){f.c(l.current).attr("width",t).attr("height",n)}),[]),Object(a.useEffect)((function(){s()}),[o,c]);var s=function(){var e=f.c(l.current);e.selectAll("*").remove();var a=e.selectAll("circle").remove().data(o);console.log(o);var r=i(o,1),s=i(o,0),u=(r.max-r.max)/2;console.log("max data is",r,s);var m=f.a().domain([s.min-1,s.max+1]).range([20,t-20]);if(c)var d=f.a();else{d=f.b();console.log("Used log scale")}d.domain([r.min-u/10,r.max+u/10]).range([n-10,10]),a.data(o).enter().append("circle").attr("cx",(function(e){return m(e[0])})).attr("cy",(function(e){return d(e[1])})).attr("r",5)};return r.a.createElement("div",{className:"chart"},r.a.createElement("svg",{ref:l}))};var d=function(){var e=Object(a.useState)([[0,0],[1,1],[2,2],[3,3]]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)({index:"0001",description:"Hillo",link:"http://oeis.org"}),s=Object(l.a)(c,2),f=s[0],d=s[1],h=Object(a.useState)(!0),g=Object(l.a)(h,2),p=g[0],v=g[1];return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,r.a.createElement("a",{href:f.link},"A",f.index)),r.a.createElement("p",null,f.description),n&&r.a.createElement(m,{width:1500,height:900,data:n,usingLinear:p}),r.a.createElement("button",{onClick:function e(){var t=String(Math.floor(34e4*Math.random())).padStart(6,"0");console.log("http://oeis.org/A".concat(t,"/b").concat(t,".txt")),u.a.get("http://oeis.org/A".concat(t,"/b").concat(t,".txt"),(function(e){return function(e){var t,n=[],a=e.split("\n"),r=Object(i.a)(a);try{for(r.s();!(t=r.n()).done;){var c=t.value;if(/^\d+$/.test(c[0])){var l=c.split(" "),s=parseInt(l[0]),u=parseInt(l[1]);if(!(n.length<2e3&&u!==1/0&&u!==-1/0&&s!==1/0&&s!==-1/0))break;n.push([s,u])}}}catch(f){r.e(f)}finally{r.f()}return o(n),n}(e)})).done((function(){u.a.get("http://oeis.org/search?q=id:A".concat(t,"&fmt=text"),(function(e){var n,a=e.split("\n"),r=Object(i.a)(a);try{for(r.s();!(n=r.n()).done;){var o=n.value;if("%N"===o.substring(0,2)){d({index:t,link:"http://oeis.org/A".concat(t),description:o.substring(11)}),console.log("desc",o);break}}}catch(c){r.e(c)}finally{r.f()}}))})).fail((function(){e()}))}}," New sequence! "),r.a.createElement("button",{onClick:function(){return p?(v(!1),console.log("Linear is",p)):(v(!0),console.log("Linear is",p)),p}}," Linear/log scale "))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[53,1,2]]]);
//# sourceMappingURL=main.5bcaaccf.chunk.js.map