(this.webpackJsonppart2phonebook=this.webpackJsonppart2phonebook||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var o=t(1),c=t(15),r=t.n(c),a=t(3),u=t(0),i=function(e){return Object(u.jsxs)("div",{children:["filter shown with",Object(u.jsx)("input",{value:e.display,onChange:e.handler})]})},l=function(e){return Object(u.jsxs)("form",{onSubmit:e.addNumber,children:[Object(u.jsxs)("div",{children:["name:",Object(u.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(u.jsxs)("div",{children:["number:",Object(u.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("p",{children:[e.name," ",e.number," ",Object(u.jsx)("button",{onClick:e.deleteHandler,children:"Delete"})]})})},d=t(5),b=t.n(d),j="/api/persons",h=function(){return b.a.get(j).then((function(e){return e.data}))},f=function(e){return b.a.post(j,e).then((function(e){return e.data}))},m=function(e,n){return b.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return b.a.delete("".concat(j,"/").concat(e)).then((function(e){console.log("deleted: ",e)}))},g=function(e){return Object(u.jsxs)(u.Fragment,{children:[console.log("props: ",e),e.personsToShow.map((function(n){return Object(u.jsx)(s,{name:n.name,number:n.number,deleteHandler:function(){return t=n.id,o=e.updateState,void(window.confirm("Do you really want to remove item with id = ".concat(t,"?"))&&O(t).then((function(e){console.log(o),o()})));var t,o}},n.name)}))]})},p=t(4),v=function(e){var n,t=e.message,o=e.color;if(null===t)return null;console.log("color: ",o);var c="green";null!==o&&void 0!==o&&(c=o);var r=(n={color:c,fontSize:16,background:"lightgrey"},Object(p.a)(n,"fontSize","20px"),Object(p.a)(n,"borderStyle","solid"),Object(p.a)(n,"borderRadius","5px"),Object(p.a)(n,"padding","10px"),Object(p.a)(n,"marginBottom","10px"),n);return Object(u.jsx)("div",{style:r,children:t})},x=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),s=Object(a.a)(r,2),d=s[0],b=s[1],j=Object(o.useState)(""),O=Object(a.a)(j,2),p=O[0],x=O[1],w=Object(o.useState)(""),S=Object(a.a)(w,2),C=S[0],y=S[1],N=Object(o.useState)(null),k=Object(a.a)(N,2),D=k[0],L=k[1],T=Object(o.useState)(null),z=Object(a.a)(T,2),B=z[0],E=z[1],F=function(){console.log("updating state?"),h().then((function(e){console.log("promise fulfiled"),c(e)}))};Object(o.useEffect)((function(){console.log("effect"),F()}),[]),console.log("render",t.length,"persons");var H=function(e,n){L(e),E(n),setTimeout((function(){L(null),E(null)}),5e3)},J=""===C?t:t.filter((function(e){return console.log(e.name.toLowerCase(),C.toLowerCase()),e.name.toLowerCase().startsWith(C.toLowerCase())}));return Object(u.jsxs)("div",{children:[Object(u.jsx)(v,{message:D,color:B}),Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(i,{display:C,handler:function(e){var n=e.target.value;y(n)}}),Object(u.jsx)("h2",{children:"add a new"}),Object(u.jsx)(l,{addNumber:function(e){e.preventDefault();var n={name:d,number:p},o=t.map((function(e){return e.name})).indexOf(d);-1===o?f(n).then((function(e){F(),b(""),x("")})).then((function(e){H("Added ".concat(d))})):window.confirm("Do you really want to change the number for ".concat(d,"?"))&&m(t[o].id,n).then((function(e){F()})).then((function(e){H("Updated number for ".concat(d))})).catch((function(e){H("".concat(d," was removed from the server"),"red")}))},newName:d,handleNameChange:function(e){console.log(e.target.value),b(e.target.value)},newNumber:p,handleNumberChange:function(e){console.log(e.target.value),x(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(g,{personsToShow:J,updateState:F})]})};r.a.render(Object(u.jsx)(x,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.a886189c.chunk.js.map