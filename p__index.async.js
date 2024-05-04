"use strict";(self.webpackChunkdbml_editor=self.webpackChunkdbml_editor||[]).push([[8866],{1230:function(I,N,t){t.r(N),t.d(N,{default:function(){return G}});var F=t(48305),x=t.n(F),C=t(16649),Z=t(20240),D=t(87255),w=t(70642),A=t(89967),T=t(95792),E=t(48831),h=t(93236),j=t(66348);function B(e,n,a){var o=e.name;return e.pk&&(o+=" \u{1F511}"),e.not_null&&(o+=" \u{1F6AB}"),{id:"".concat(n,"-").concat(a,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:o},portTypeLabel:{text:e.type.type_name||"unknown"}}}}function O(e,n){for(var a=[],o=0;o<e.fields.length;o++){var r=e.fields[o],s=B(r,n,e.name);a.push(s)}return{id:"".concat(n,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:a}}function P(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var n=e.endpoints[0],a=e.endpoints[1],o=n.fieldNames[0],r=a.fieldNames[0],s=n.schemaName||"public",l=a.schemaName||"public";return{id:"",shape:"edge",source:{cell:"".concat(s,"-").concat(n.tableName),port:"".concat(s,"-").concat(n.tableName,"-").concat(o)},target:{cell:"".concat(l,"-").concat(a.tableName),port:"".concat(l,"-").concat(a.tableName,"-").concat(r)},labels:[{attrs:{label:{text:n.relation,fontFamily:"monospace"}},position:.2},{attrs:{label:{text:a.relation,fontFamily:"monospace"}},position:.8}]}}function $(e){for(var n=[],a=0;a<e.schemas.length;a++)for(var o=e.schemas[a],r=0;r<e.schemas[a].tables.length;r++){var s=e.schemas[a].tables[r],l=O(s,o.name);n.push(l)}for(var u=[],v=0;v<e.schemas.length;v++)for(var b=e.schemas[v],i=0;i<b.refs.length;i++){var f=e.schemas[v].refs[i],d=P(f);d!==null&&(console.log(d),u.push(d))}return{nodes:n,edges:u}}var L=$,k=t(66508),c=t(62086),G=function(){var e=w.Z.useToken(),n=e.token,a=n.colorBgContainer,o=n.borderRadiusLG,r=`Table users {
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
`,s=(0,h.useState)(r),l=x()(s,2),u=l[0],v=l[1],b=(0,h.useState)({}),i=x()(b,2),f=i[0],d=i[1],y=(0,h.useRef)(null),M=new D._b;new C.Me({type:"grid",width:600,height:400,rows:6,cols:4});var H=new C.Vq({type:"dagre",rankdir:"LR",align:"UL",ranksep:80,nodesep:60,controlPoints:!0}),S=H;(0,h.useEffect)(function(){if(y.current){var m=new Z.kJ({container:y.current,connecting:{anchor:{name:"midSide",args:{direction:"H"}},allowBlank:!1,allowEdge:!1,allowNode:!1},background:{color:"#F2F7FA"},interacting:{nodeMovable:!0,edgeMovable:!1,edgeLabelMovable:!1,arrowheadMovable:!1,vertexMovable:!1,vertexAddable:!1,vertexDeletable:!1},panning:!0,mousewheel:!0});m.use(new k.H({enabled:!0})),m.fromJSON(f),m.centerContent()}},[f]);var J=function(R,z){var p=M.parse(u,"dbmlv2"),g=L(p);d(S.layout(g))},U=function(R,z){var p=M.parse(R,"dbmlv2");console.log(p);var g=L(p);console.log(g),d(S.layout(g))},V=(0,E.Z)(U,500);return(0,c.jsxs)(A.Z,{children:[(0,c.jsx)(T.Z,{span:12,children:(0,c.jsx)(j.ZP,{language:"dbml",theme:"vs-dark",value:u,options:{selectOnLineNumbers:!0,minimap:{enabled:!1}},onChange:V,editorDidMount:J})}),(0,c.jsx)(T.Z,{span:12,children:(0,c.jsx)("div",{className:"react-shape-app",children:(0,c.jsx)("div",{className:"app-content",ref:y})})})]})}}}]);
