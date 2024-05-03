"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8866],{1230:function(I,x,t){t.r(x),t.d(x,{default:function(){return J}});var L=t(48305),y=t.n(L),F=t(16649),Z=t(20240),D=t(87255),A=t(70642),E=t(89967),C=t(95792),j=t(48831),h=t(93236),B=t(66348);function O(e,n,a){return{id:"".concat(n,"-").concat(a,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:e.name},portTypeLabel:{text:e.type.type_name||"unknown"}}}}function $(e,n){for(var a=[],r=0;r<e.fields.length;r++){var o=e.fields[r],s=O(o,n,e.name);a.push(s)}return{id:"".concat(n,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:a}}function w(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var n=e.endpoints[0],a=e.endpoints[1],r=n.fieldNames[0],o=a.fieldNames[0],s=n.schemaName||"public",l=a.schemaName||"public";return{id:"",shape:"edge",source:{cell:"".concat(s,"-").concat(n.tableName),port:"".concat(s,"-").concat(n.tableName,"-").concat(r)},target:{cell:"".concat(l,"-").concat(a.tableName),port:"".concat(l,"-").concat(a.tableName,"-").concat(o)},labels:[{attrs:{label:{text:n.relation,stroke:"#aaa"}},position:.2},{attrs:{label:{text:a.relation,stroke:"#aaa"}},position:.8}]}}function G(e){for(var n=[],a=0;a<e.schemas.length;a++)for(var r=e.schemas[a],o=0;o<e.schemas[a].tables.length;o++){var s=e.schemas[a].tables[o],l=$(s,r.name);n.push(l)}for(var v=[],u=0;u<e.schemas.length;u++)for(var b=e.schemas[u],d=0;d<b.refs.length;d++){var f=e.schemas[u].refs[d],i=w(f);i!==null&&(console.log(i),v.push(i))}return{nodes:n,edges:v}}var T=G,H=t(66508),c=t(62086),J=function(){var e=A.Z.useToken(),n=e.token,a=n.colorBgContainer,r=n.borderRadiusLG,o=`Table users {
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
`,s=(0,h.useState)(o),l=y()(s,2),v=l[0],u=l[1],b=(0,h.useState)({}),d=y()(b,2),f=d[0],i=d[1],N=(0,h.useRef)(null),M=new D._b,S=new F.Me({type:"grid",width:600,height:400,rows:6,cols:4});(0,h.useEffect)(function(){if(N.current){var m=new Z.kJ({container:N.current,connecting:{anchor:{name:"midSide",args:{direction:"H"}},allowBlank:!1,allowEdge:!1,allowNode:!1},background:{color:"#F2F7FA"},interacting:{nodeMovable:!0,edgeMovable:!1,edgeLabelMovable:!1,arrowheadMovable:!1,vertexMovable:!1,vertexAddable:!1,vertexDeletable:!1}});m.use(new H.H({enabled:!0})),m.fromJSON(f),m.centerContent()}},[f]);var P=function(R,z){var p=M.parse(v,"dbmlv2"),g=T(p);i(S.layout(g))},k=function(R,z){var p=M.parse(R,"dbmlv2");console.log(p);var g=T(p);console.log(g),i(S.layout(g))},U=(0,j.Z)(k,500);return(0,c.jsxs)(E.Z,{children:[(0,c.jsx)(C.Z,{span:12,children:(0,c.jsx)(B.ZP,{language:"dbml",theme:"vs-dark",value:v,options:{selectOnLineNumbers:!0,minimap:{enabled:!1}},onChange:U,editorDidMount:P})}),(0,c.jsx)(C.Z,{span:12,children:(0,c.jsx)("div",{className:"react-shape-app",children:(0,c.jsx)("div",{className:"app-content",ref:N})})})]})}}}]);
