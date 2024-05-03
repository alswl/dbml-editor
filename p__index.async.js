"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[866],{47259:function(K,x,r){r.r(x),r.d(x,{default:function(){return I}});var E=r(48305),F=r.n(E),b=r(20240),T=24,R=150;function B(){b.kJ.registerPortLayout("erPortPosition",function(e){return e.map(function(a,t){return{position:{x:0,y:(t+1)*T},angle:0}})},!0),b.kJ.registerNode("er-rect",{inherit:"rect",markup:[{tagName:"rect",selector:"body"},{tagName:"text",selector:"label"}],attrs:{rect:{strokeWidth:1,stroke:"#5F95FF",fill:"#5F95FF"},label:{fontWeight:"bold",fill:"#ffffff",fontSize:12}},ports:{groups:{list:{position:"erPortPosition",markup:[{tagName:"rect",selector:"portBody"},{tagName:"text",selector:"portNameLabel"},{tagName:"text",selector:"portTypeLabel"}],attrs:{portBody:{width:R,height:T,strokeWidth:1,stroke:"#5F95FF",fill:"#EFF4FF",magnet:!0},portNameLabel:{ref:"portBody",refX:6,refY:6,fontSize:10},portTypeLabel:{ref:"portBody",refX:95,refY:6,fontSize:10}}}}}},!0)}var D=B,P=r(16649),Z=r(87255),H=r(70642),A=r(89967),L=r(95792),J=r(48831),f=r(93236),O=r(30467);function W(e,a,t){return{id:"".concat(a,"-").concat(t,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:e.name},portTypeLabel:{text:e.type.type_name||"unknown"}}}}function j(e,a){for(var t=[],o=0;o<e.fields.length;o++){var n=e.fields[o],s=W(n,a,e.name);t.push(s)}return{id:"".concat(a,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:t}}function w(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var a=e.endpoints[0],t=e.endpoints[1],o=a.fieldNames[0],n=t.fieldNames[0],s=a.schemaName||"public",l=t.schemaName||"public";return{id:"",shape:"edge",source:{cell:"".concat(s,"-").concat(a.tableName),port:"".concat(s,"-").concat(a.tableName,"-").concat(o)},target:{cell:"".concat(l,"-").concat(t.tableName),port:"".concat(l,"-").concat(t.tableName,"-").concat(n)},labels:[{attrs:{label:{text:a.relation,stroke:"#aaa"}},position:.2},{attrs:{label:{text:t.relation,stroke:"#aaa"}},position:.8}]}}function z(e){for(var a=[],t=0;t<e.schemas.length;t++)for(var o=e.schemas[t],n=0;n<e.schemas[t].tables.length;n++){var s=e.schemas[t].tables[n],l=j(s,o.name);a.push(l)}for(var u=[],v=0;v<e.schemas.length;v++)for(var N=e.schemas[v],c=0;c<N.refs.length;c++){var p=e.schemas[v].refs[c],d=w(p);d!==null&&(console.log(d),u.push(d))}return{nodes:a,edges:u}}var S=z,G=r(66508),i=r(62086),I=function(){var e=H.Z.useToken(),a=e.token,t=a.colorBgContainer,o=a.borderRadiusLG,n=`Table users {
  id integer
  username varchar
  role varchar
  created_at timestamp
}

Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer
  status post_status
  created_at timestamp
}

Enum post_status {
  draft
  published
  private [note: 'visible via URL only']
}

Ref: posts.user_id > users.id // many-to-one
`,s=(0,f.useState)(n),l=F()(s,2),u=l[0],v=l[1],N=(0,f.useState)({}),c=F()(N,2),p=c[0],d=c[1],y=(0,f.useRef)(null),C=new Z._b,M=new P.Me({type:"grid",width:600,height:400,rows:6,cols:4});(0,f.useEffect)(function(){if(D(),y.current){var m=new b.kJ({container:y.current,connecting:{anchor:{name:"midSide",args:{direction:"H"}},allowBlank:!1,allowEdge:!1,allowNode:!1},background:{color:"#F2F7FA"},interacting:{nodeMovable:!0,edgeMovable:!1,edgeLabelMovable:!1,arrowheadMovable:!1,vertexMovable:!1,vertexAddable:!1,vertexDeletable:!1}});m.use(new G.H({enabled:!0})),m.fromJSON(p),m.centerContent()}},[p]);var $=function(k,U){var h=C.parse(u,"dbmlv2"),g=S(h);d(M.layout(g))},X=function(k,U){var h=C.parse(k,"dbmlv2");console.log(h);var g=S(h);console.log(g),d(M.layout(g))},Y=(0,J.Z)(X,500);return(0,i.jsxs)(A.Z,{children:[(0,i.jsx)(L.Z,{span:12,children:(0,i.jsx)(O.ZP,{language:"dbml",theme:"vs-dark",value:u,options:{selectOnLineNumbers:!0,minimap:{enabled:!1}},onChange:Y,editorDidMount:$})}),(0,i.jsx)(L.Z,{span:12,children:(0,i.jsx)("div",{className:"react-shape-app",children:(0,i.jsx)("div",{className:"app-content",ref:y})})})]})}}}]);
