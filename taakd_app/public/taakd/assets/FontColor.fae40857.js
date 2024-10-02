import{v as g,a3 as p,a4 as C,g as u,o as n,K as i,w as s,T as _,a5 as k,a6 as b,i as a,h as c,J as m,O as f,H as h,z as v}from"./vendor.1aaec15d.js";const y={name:"FontColor",props:["editor"],components:{Popover:p,Tooltip:C},methods:{setBackgroundColor(t){t.name!="Default"?this.editor.chain().focus().toggleHighlight({color:t.hex}).run():this.editor.chain().focus().unsetHighlight().run()},setForegroundColor(t){t.name!="Default"?this.editor.chain().focus().setColor(t.hex).run():this.editor.chain().focus().unsetColor().run()}},computed:{foregroundColors(){return[{name:"Default",hex:"#1F272E"},{name:"Yellow",hex:"#ca8a04"},{name:"Orange",hex:"#ea580c"},{name:"Red",hex:"#dc2626"},{name:"Green",hex:"#16a34a"},{name:"Blue",hex:"#1579D0"},{name:"Purple",hex:"#9333ea"},{name:"Pink",hex:"#db2777"}]},backgroundColors(){return[{name:"Default",hex:null},{name:"Yellow",hex:"#fef9c3"},{name:"Orange",hex:"#ffedd5"},{name:"Red",hex:"#fee2e2"},{name:"Green",hex:"#dcfce7"},{name:"Blue",hex:"#D3E9FC"},{name:"Purple",hex:"#f3e8ff"},{name:"Pink",hex:"#fce7f3"}]}}},B={class:"p-2"},P={class:"mt-1 grid grid-cols-8 gap-1"},F=["aria-label","onClick"],w={class:"mt-1 grid grid-cols-8 gap-1"},D=["aria-label","onClick"];function T(t,o,z,$,j,r){const d=u("Tooltip"),x=u("Popover");return n(),i(x,{transition:"default"},{target:s(({togglePopover:e,isOpen:l})=>[_(t.$slots,"default",k(b({onClick:()=>e(),isActive:l})))]),"body-main":s(()=>[a("div",B,[o[0]||(o[0]=a("div",{class:"text-sm text-gray-700"},"Text Color",-1)),a("div",P,[(n(!0),c(h,null,m(r.foregroundColors,e=>(n(),i(d,{class:"flex",key:e.name,text:e.name},{default:s(()=>[a("button",{"aria-label":e.name,class:"flex h-5 w-5 items-center justify-center rounded border text-base",style:f({color:e.hex}),onClick:l=>r.setForegroundColor(e)}," A ",12,F)]),_:2},1032,["text"]))),128))]),o[1]||(o[1]=a("div",{class:"mt-2 text-sm text-gray-700"},"Background Color",-1)),a("div",w,[(n(!0),c(h,null,m(r.backgroundColors,e=>(n(),i(d,{class:"flex",key:e.name,text:e.name},{default:s(()=>[a("button",{"aria-label":e.name,class:v(["flex h-5 w-5 items-center justify-center rounded border text-base text-gray-900",e.hex?"border-transparent":"border-gray-200"]),style:f({backgroundColor:e.hex}),onClick:l=>r.setBackgroundColor(e)}," A ",14,D)]),_:2},1032,["text"]))),128))])])]),_:3})}var E=g(y,[["render",T]]);export{E as default};
