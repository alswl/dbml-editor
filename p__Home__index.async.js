"use strict";(self.webpackChunkdbml_editor=self.webpackChunkdbml_editor||[]).push([[3371],{58827:function(W,b,n){n.r(b),n.d(b,{default:function(){return $}});var S=n(48305),h=n.n(S),M=n(87255),L=n(54400),T=n(21375),N=n(47475),C=n(48831),v=n(93236),F=n(30563),j=`Table users {
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
`;function R(e,t,a){var r=e.name;return e.pk&&(r+=" \u{1F511}"),e.not_null&&(r+=" \u{1F6AB}"),{id:"".concat(t,"-").concat(a,"-").concat(e.name),group:"list",attrs:{portNameLabel:{text:r},portTypeLabel:{text:e.type.type_name||"unknown"}}}}function D(e,t,a){return{id:"".concat(t,"-").concat(a,"-note"),group:"note",attrs:{note:{text:e}}}}function E(e,t){for(var a=[],r=0;r<e.fields.length;r++){var s=e.fields[r],l=R(s,t,e.name);a.push(l)}if(e.note){var c=D(e.note,t,e.name);a.push(c)}return{id:"".concat(t,"-").concat(e.name),shape:"er-rect",label:e.name,width:150,height:24,ports:a}}function P(e){if(e.endpoints.length!==2)return console.warn("ref.endpoints.length !== 2"),null;var t=e.endpoints[0],a=e.endpoints[1],r=t.fieldNames[0],s=a.fieldNames[0],l=t.schemaName||"public",c=a.schemaName||"public";return{id:"",shape:"edge",router:{name:"er",args:{offset:16,min:4,direction:"H"}},source:{cell:"".concat(l,"-").concat(t.tableName),port:"".concat(l,"-").concat(t.tableName,"-").concat(r)},target:{cell:"".concat(c,"-").concat(a.tableName),port:"".concat(c,"-").concat(a.tableName,"-").concat(s)},labels:[{attrs:{label:{text:t.relation,fontFamily:"monospace"}},position:.2},{attrs:{label:{text:a.relation,fontFamily:"monospace"}},position:.8}]}}function Z(e){for(var t=[],a=0;a<e.schemas.length;a++)for(var r=e.schemas[a],s=0;s<e.schemas[a].tables.length;s++){var l=e.schemas[a].tables[s],c=E(l,r.name);t.push(c)}for(var u=[],i=0;i<e.schemas.length;i++)for(var d=e.schemas[i],m=0;m<d.refs.length;m++){var p=e.schemas[i].refs[m],f=P(p);f!==null&&(console.log(f),u.push(f))}return{nodes:t,edges:u}}var A=Z,H=n(21409),w=n(20240),O=n(66508),o=n(62086),U=function(t){var a=(0,v.useRef)(null),r=(0,v.useState)({}),s=h()(r,2),l=s[0],c=s[1],u=new H.Vq({type:"dagre",rankdir:"LR",align:"UL",ranksep:80,nodesep:60,controlPoints:!0}),i=u;return(0,v.useEffect)(function(){if(a.current){var d=new w.kJ({container:a.current,connecting:{anchor:{name:"midSide",args:{direction:"H"}},allowBlank:!1,allowEdge:!1,allowNode:!1},background:{color:"#F2F7FA"},interacting:{nodeMovable:!0,edgeMovable:!1,edgeLabelMovable:!1,arrowheadMovable:!1,vertexMovable:!1,vertexAddable:!1,vertexDeletable:!1},panning:!0,mousewheel:!1});d.use(new O.H({enabled:!0})),d.fromJSON(l),d.centerContent()}},[l]),(0,v.useEffect)(function(){var d=A(t.database);c(i.layout(d))},[t.database]),(0,o.jsx)("div",{className:"react-shape-app",children:(0,o.jsx)("div",{className:"app-content",ref:a})})},V=U,J=n(22928),$=function(){var e=L.ZP.useMessage(),t=h()(e,2),a=t[0],r=t[1],s=new M._b,l=(0,v.useState)(j),c=h()(l,1),u=c[0],i=s.parse(u,"dbmlv2"),d=(0,v.useState)(i),m=h()(d,2),p=m[0],f=m[1],z=function(){f(i)},B=function(K){try{var y=s.parse(K,"dbmlv2");console.log(y),f(y)}catch(g){if(g){var Q=g.diags.map(function(x){return"".concat(x.location.start.line,":").concat(x.location.start.column," ").concat(x.message)}).join(`
`);a.error(Q),console.error(g)}else if(g instanceof Error)a.error("".concat(g.message));else throw g}},I=(0,C.Z)(B,500);return(0,o.jsxs)(o.Fragment,{children:[r,(0,o.jsx)(J._z,{ghost:!0,header:{title:""},children:(0,o.jsxs)(T.Z,{gutter:[8,8],children:[(0,o.jsx)(N.Z,{xxl:12,xl:12,lg:12,md:24,sm:24,xs:24,children:(0,o.jsx)("div",{className:"editor",children:(0,o.jsx)(F.ZP,{width:"100%",language:"dbml",theme:"vs-dark",value:u,options:{selectOnLineNumbers:!0,minimap:{enabled:!1},automaticLayout:!0,scrollBeyondLastLine:!1},onChange:I,editorDidMount:z})})}),(0,o.jsx)(N.Z,{xxl:12,xl:12,lg:12,md:24,sm:24,xs:24,children:(0,o.jsx)(V,{code:u,database:p})})]})})]})}}}]);
