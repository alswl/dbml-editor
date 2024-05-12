"use strict";(self.webpackChunkdbml_editor=self.webpackChunkdbml_editor||[]).push([[3371],{24676:function(X,N,t){t.r(N),t.d(N,{default:function(){return z}});var F=t(48305),y=t.n(F),T=t(21409),Z=t(20240),j=t(87255),D=t(83131),P=t(21375),C=t(47475),A=t(48831),h=t(93236),E=t(30563);function H(e,n,a){var o=e.name;return e.pk&&(o+=" \u{1F511}"),e.not_null&&(o+=" \u{1F6AB}"),{id:"".concat(n,"-").concat(a,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:o},portTypeLabel:{text:e.type.type_name||"unknown"}}}}function w(e,n,a){return{id:"".concat(n,"-").concat(a,"-note"),group:"note",attrs:{note:{text:e}}}}function B(e,n){for(var a=[],o=0;o<e.fields.length;o++){var r=e.fields[o],c=H(r,n,e.name);a.push(c)}if(e.note){var s=w(e.note,n,e.name);a.push(s)}return{id:"".concat(n,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:a}}function O(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var n=e.endpoints[0],a=e.endpoints[1],o=n.fieldNames[0],r=a.fieldNames[0],c=n.schemaName||"public",s=a.schemaName||"public";return{id:"",shape:"edge",router:{name:"er",args:{offset:16,min:4,direction:"H"}},source:{cell:"".concat(c,"-").concat(n.tableName),port:"".concat(c,"-").concat(n.tableName,"-").concat(o)},target:{cell:"".concat(s,"-").concat(a.tableName),port:"".concat(s,"-").concat(a.tableName,"-").concat(r)},labels:[{attrs:{label:{text:n.relation,fontFamily:"monospace"}},position:.2},{attrs:{label:{text:a.relation,fontFamily:"monospace"}},position:.8}]}}function U(e){for(var n=[],a=0;a<e.schemas.length;a++)for(var o=e.schemas[a],r=0;r<e.schemas[a].tables.length;r++){var c=e.schemas[a].tables[r],s=B(c,o.name);n.push(s)}for(var u=[],v=0;v<e.schemas.length;v++)for(var x=e.schemas[v],i=0;i<x.refs.length;i++){var f=e.schemas[v].refs[i],d=O(f);d!==null&&(console.log(d),u.push(d))}return{nodes:n,edges:u}}var M=U,$=t(66508),G=t(22928),J=t(35423),l=t(62086),z=function(){var e=D.Z.useToken(),n=e.token,a=n.colorBgContainer,o=n.borderRadiusLG,r=`Table users {
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
`,c=(0,h.useState)(r),s=y()(c,2),u=s[0],v=s[1],x=(0,h.useState)({}),i=y()(x,2),f=i[0],d=i[1],b=(0,h.useRef)(null),L=new j._b;new T.Me({type:"grid",width:600,height:400,rows:6,cols:4});var V=new T.Vq({type:"dagre",rankdir:"LR",align:"UL",ranksep:80,nodesep:60,controlPoints:!0}),S=V;(0,h.useEffect)(function(){if(b.current){var m=new Z.kJ({container:b.current,connecting:{anchor:{name:"midSide",args:{direction:"H"}},allowBlank:!1,allowEdge:!1,allowNode:!1},background:{color:"#F2F7FA"},interacting:{nodeMovable:!0,edgeMovable:!1,edgeLabelMovable:!1,arrowheadMovable:!1,vertexMovable:!1,vertexAddable:!1,vertexDeletable:!1},panning:!0,mousewheel:!1});m.use(new $.H({enabled:!0})),m.fromJSON(f),m.centerContent()}},[f]);var k=function(R,W){var g=L.parse(u,"dbmlv2"),p=M(g);d(S.layout(p))},I=function(R,W){var g=L.parse(R,"dbmlv2");console.log(g);var p=M(g);console.log(p),d(S.layout(p))},K=(0,A.Z)(I,500),Q=(0,J.useModel)("global"),Y=Q.name;return(0,l.jsx)(G._z,{ghost:!0,header:{title:""},children:(0,l.jsxs)(P.Z,{gutter:[8,8],children:[(0,l.jsx)(C.Z,{xxl:12,xl:12,lg:12,md:24,sm:24,xs:24,children:(0,l.jsx)("div",{className:"editor",children:(0,l.jsx)(E.ZP,{width:"100%",language:"dbml",theme:"vs-dark",value:u,options:{selectOnLineNumbers:!0,minimap:{enabled:!1},automaticLayout:!0},onChange:K,editorDidMount:k})})}),(0,l.jsx)(C.Z,{xxl:12,xl:12,lg:12,md:24,sm:24,xs:24,children:(0,l.jsx)("div",{className:"react-shape-app",children:(0,l.jsx)("div",{className:"app-content",ref:b})})})]})})}}}]);
