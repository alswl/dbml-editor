"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[866],{47259:function(Y,y,r){r.r(y),r.d(y,{default:function(){return G}});var R=r(48305),F=r.n(R),N=r(20240),T=24,E=150;function P(){N.kJ.registerPortLayout("erPortPosition",function(e){return e.map(function(a,t){return{position:{x:0,y:(t+1)*T},angle:0}})},!0),N.kJ.registerNode("er-rect",{inherit:"rect",markup:[{tagName:"rect",selector:"body"},{tagName:"text",selector:"label"}],attrs:{rect:{strokeWidth:1,stroke:"#5F95FF",fill:"#5F95FF"},label:{fontWeight:"bold",fill:"#ffffff",fontSize:12}},ports:{groups:{list:{markup:[{tagName:"rect",selector:"portBody"},{tagName:"text",selector:"portNameLabel"},{tagName:"text",selector:"portTypeLabel"}],attrs:{portBody:{width:E,height:T,strokeWidth:1,stroke:"#5F95FF",fill:"#EFF4FF",magnet:!0},portNameLabel:{ref:"portBody",refX:6,refY:6,fontSize:10},portTypeLabel:{ref:"portBody",refX:95,refY:6,fontSize:10}},position:"erPortPosition"}}}},!0)}var B=P,D=r(87255),Z=r(70642),J=r(89967),x=r(95792),M=r(48831),v=r(93236),O=r(30467);function W(e,a,t){var n={id:"".concat(a,"-").concat(t,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:e.name},portTypeLabel:{text:e.type.type_name||"unknown"}}};return n}function j(e,a){for(var t=[],n=0;n<e.fields.length;n++){var o=e.fields[n],s=W(o,a,e.name);t.push(s)}return{id:"".concat(a,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:t}}function z(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var a=e.endpoints[0],t=e.endpoints[1],n=a.fieldNames[0],o=t.fieldNames[0],s=a.schemaName||"public",l=t.schemaName||"public",c={id:"",shape:"edge",source:{cell:"".concat(s,"-").concat(a.tableName),port:"".concat(s,"-").concat(a.tableName,"-").concat(n)},target:{cell:"".concat(l,"-").concat(t.tableName),port:"".concat(l,"-").concat(t.tableName,"-").concat(o)},labels:[{attrs:{label:{text:a.relation,stroke:"#aaa"}},position:.2},{attrs:{label:{text:t.relation,stroke:"#aaa"}},position:.8}]};return c}function A(e){for(var a=[],t=0;t<e.schemas.length;t++)for(var n=e.schemas[t],o=0;o<e.schemas[t].tables.length;o++){var s=e.schemas[t].tables[o],l=j(s,n.name);a.push(l)}for(var c=[],d=0;d<e.schemas.length;d++)for(var L=e.schemas[d],u=0;u<e.schemas[d].refs.length;u++){var f=e.schemas[d].refs[u],m=z(f);m!==null&&(console.log(m),c.push(m))}return{nodes:a,edges:c}}var C=A,i=r(62086),G=function(){var e=Z.Z.useToken(),a=e.token,t=a.colorBgContainer,n=a.borderRadiusLG,o=`Table users {
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
`,s=(0,v.useState)(o),l=F()(s,2),c=l[0],d=l[1],L=(0,v.useState)([]),u=F()(L,2),f=u[0],m=u[1],b=(0,v.useRef)(null),S=new D._b;(0,v.useEffect)(function(){if(B(),b.current){var p=new N.kJ({container:b.current,background:{color:"#F2F7FA"}});p.fromJSON(f),p.centerContent()}},[f]);var H=function(k,X){var h=S.parse(c,"dbmlv2"),g=C(h);m(g)},I=function(k,X){var h=S.parse(k,"dbmlv2");console.log(h);var g=C(h);console.log(g),m(g)},$=(0,M.Z)(I,500);return(0,i.jsxs)(J.Z,{children:[(0,i.jsx)(x.Z,{span:12,children:(0,i.jsx)(O.ZP,{width:"800",height:"600",language:"dbml",theme:"vs-dark",value:c,options:{selectOnLineNumbers:!0,minimap:{enabled:!1}},onChange:$,editorDidMount:H})}),(0,i.jsx)(x.Z,{span:12,children:(0,i.jsx)("div",{className:"react-shape-app",children:(0,i.jsx)("div",{className:"app-content",ref:b})})})]})}}}]);
