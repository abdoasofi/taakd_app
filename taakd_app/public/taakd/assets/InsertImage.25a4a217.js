import{v as f,_ as I,a7 as D,a9 as h,g as d,o as m,h as u,T as _,a5 as v,a6 as y,j as n,w as s,i as r,t as w,R as C,n as c,H as b}from"./vendor.1aaec15d.js";const k={name:"InsertImage",props:["editor"],expose:["openDialog"],data(){return{addImageDialog:{url:"",file:null,show:!1}}},components:{Button:I,Dialog:D},methods:{openDialog(){this.addImageDialog.show=!0},onImageSelect(t){let e=t.target.files[0];!e||(this.addImageDialog.file=e,h(e).then(i=>{this.addImageDialog.url=i}))},addImage(t){this.editor.chain().focus().setImage({src:t}).run(),this.reset()},reset(){this.addImageDialog=this.$options.data().addImageDialog}}},x={class:"relative cursor-pointer rounded-lg bg-gray-100 py-1 focus-within:bg-gray-200 hover:bg-gray-200"},B={class:"absolute inset-0 select-none px-2 py-1 text-base"},S=["src"];function V(t,e,i,N,a,o){const g=d("Button"),p=d("Dialog");return m(),u(b,null,[_(t.$slots,"default",v(y({onClick:o.openDialog}))),n(p,{options:{title:"Add Image"},modelValue:a.addImageDialog.show,"onUpdate:modelValue":e[2]||(e[2]=l=>a.addImageDialog.show=l),onAfterLeave:o.reset},{"body-content":s(()=>[r("label",x,[r("input",{type:"file",class:"w-full opacity-0",onChange:e[0]||(e[0]=(...l)=>o.onImageSelect&&o.onImageSelect(...l)),accept:"image/*"},null,32),r("span",B,w(a.addImageDialog.file?"Select another image":"Select an image"),1)]),a.addImageDialog.url?(m(),u("img",{key:0,src:a.addImageDialog.url,class:"mt-2 w-full rounded-lg"},null,8,S)):C("",!0)]),actions:s(()=>[n(g,{variant:"solid",onClick:e[1]||(e[1]=l=>o.addImage(a.addImageDialog.url))},{default:s(()=>e[3]||(e[3]=[c(" Insert Image ")])),_:1}),n(g,{onClick:o.reset},{default:s(()=>e[4]||(e[4]=[c(" Cancel ")])),_:1},8,["onClick"])]),_:1},8,["modelValue","onAfterLeave"])],64)}var T=f(k,[["render",V]]);export{T as default};
