"use strict";(self.webpackChunkdbml_editor=self.webpackChunkdbml_editor||[]).push([[8866],{1230:function(K,y,t){t.r(y),t.d(y,{default:function(){return k}});var F=t(48305),x=t.n(F),T=t(16649),Z=t(20240),D=t(87255),w=t(70642),A=t(89967),C=t(95792),E=t(48831),f=t(93236),P=t(66348);function j(e,a,n){var o=e.name;return e.pk&&(o+=" \u{1F511}"),e.not_null&&(o+=" \u{1F6AB}"),{id:"".concat(a,"-").concat(n,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:o},portTypeLabel:{text:e.type.type_name||"unknown"}}}}function B(e,a,n){return{id:"".concat(a,"-").concat(n,"-note"),group:"note",attrs:{note:{text:e}}}}function H(e,a){for(var n=[],o=0;o<e.fields.length;o++){var r=e.fields[o],l=j(r,a,e.name);n.push(l)}if(e.note){var s=B(e.note,a,e.name);n.push(s)}return{id:"".concat(a,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:n}}function O(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var a=e.endpoints[0],n=e.endpoints[1],o=a.fieldNames[0],r=n.fieldNames[0],l=a.schemaName||"public",s=n.schemaName||"public";return{id:"",shape:"edge",router:{name:"er",args:{offset:16,min:4,direction:"H"}},source:{cell:"".concat(l,"-").concat(a.tableName),port:"".concat(l,"-").concat(a.tableName,"-").concat(o)},target:{cell:"".concat(s,"-").concat(n.tableName),port:"".concat(s,"-").concat(n.tableName,"-").concat(r)},labels:[{attrs:{label:{text:a.relation,fontFamily:"monospace"}},position:.2},{attrs:{label:{text:n.relation,fontFamily:"monospace"}},position:.8}]}}function U(e){for(var a=[],n=0;n<e.schemas.length;n++)for(var o=e.schemas[n],r=0;r<e.schemas[n].tables.length;r++){var l=e.schemas[n].tables[r],s=H(l,o.name);a.push(s)}for(var u=[],v=0;v<e.schemas.length;v++)for(var b=e.schemas[v],i=0;i<b.refs.length;i++){var h=e.schemas[v].refs[i],d=O(h);d!==null&&(console.log(d),u.push(d))}return{nodes:a,edges:u}}var L=U,$=t(66508),c=t(62086),k=function(){var e=w.Z.useToken(),a=e.token,n=a.colorBgContainer,o=a.borderRadiusLG,r=`Table users {
  id integer
  username varchar
  role varchar
  created_at timestamp

  Note: 'User Table'
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
`,l=(0,f.useState)(r),s=x()(l,2),u=s[0],v=s[1],b=(0,f.useState)({}),i=x()(b,2),h=i[0],d=i[1],N=(0,f.useRef)(null),M=new D._b;new T.Me({type:"grid",width:600,height:400,rows:6,cols:4});var G=new T.Vq({type:"dagre",rankdir:"LR",align:"UL",ranksep:80,nodesep:60,controlPoints:!0}),S=G;(0,f.useEffect)(function(){if(N.current){var m=new Z.kJ({container:N.current,connecting:{anchor:{name:"midSide",args:{direction:"H"}},allowBlank:!1,allowEdge:!1,allowNode:!1},background:{color:"#F2F7FA"},interacting:{nodeMovable:!0,edgeMovable:!1,edgeLabelMovable:!1,arrowheadMovable:!1,vertexMovable:!1,vertexAddable:!1,vertexDeletable:!1},panning:!0,mousewheel:!1});m.use(new $.H({enabled:!0})),m.fromJSON(h),m.centerContent()}},[h]);var J=function(R,I){var p=M.parse(u,"dbmlv2"),g=L(p);d(S.layout(g))},V=function(R,I){var p=M.parse(R,"dbmlv2");console.log(p);var g=L(p);console.log(g),d(S.layout(g))},z=(0,E.Z)(V,500);return(0,c.jsxs)(A.Z,{children:[(0,c.jsx)(C.Z,{span:12,children:(0,c.jsx)(P.ZP,{language:"dbml",theme:"vs-dark",value:u,options:{selectOnLineNumbers:!0,minimap:{enabled:!1}},onChange:z,editorDidMount:J})}),(0,c.jsx)(C.Z,{span:12,children:(0,c.jsx)("div",{className:"react-shape-app",children:(0,c.jsx)("div",{className:"app-content",ref:N})})})]})}}}]);
