var S=(C,h,i)=>new Promise((x,g)=>{var k=u=>{try{_(i.next(u))}catch(n){g(n)}},c=u=>{try{_(i.throw(u))}catch(n){g(n)}},_=u=>u.done?x(u.value):Promise.resolve(u.value).then(k,c);_((i=i.apply(C,h)).next())});import{v as N,D,b as I,L as M,a as B,r as q,o as s,h as a,u as w,H as m,J as f,K as F,E as G,R as T,i as o,t as b,z as Y,j as A,w as L,Y as d,a0 as H,a1 as p,$ as y,W as O,M as z}from"./vendor.1aaec15d.js";import{l as V}from"./useAddressLogic.ac071cda.js";import{u as P}from"./index.408ed4ba.js";const J={dir:"ltr",class:"p-6 bg-bg min-h-screen"},K={key:0,class:"max-w-7xl mx-auto bg-bg shadow-md rounded-lg p-6"},W={key:0,class:"mb-4 space-y-2"},Q={class:"space-y-4"},X={class:"flex justify-between items-center px-4 py-2 bg-more_lighter_gray hover:bg-bg rounded-t-md"},Z=["id","onClick","aria-expanded","aria-controls"],ee={class:"text-dark_gray"},oe=["onClick"],te=["id","aria-labelledby"],re={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},le=["onUpdate:modelValue"],ne=["onUpdate:modelValue"],se=["onUpdate:modelValue"],ae=["onUpdate:modelValue"],ie=["onUpdate:modelValue","onChange"],de=["value"],ue=["onUpdate:modelValue","onChange"],ce=["value"],pe=["onUpdate:modelValue"],_e=["value"],me=["onUpdate:modelValue"],fe=["onUpdate:modelValue"],ye=["onUpdate:modelValue"],ge=["onUpdate:modelValue"],ve={class:"flex justify-center items-center mt-6 space-x-4"},be=["disabled"],he={key:0},xe={key:1},ke={key:1,class:"flex justify-center items-center h-full"},we={__name:"VerificationInstructionsRequest",setup(C){const h=P(),i=D({doctype:"Verification Instructions Request",name:"VIR-2024-26-09-000007"}),x=I(()=>V.data.filter(r=>r.location_type==="Country").map(r=>({label:r.location_name,value:r.location_name}))),g=r=>r?V.data.filter(e=>e.location_type==="City"&&e.parent_location===r).map(e=>({label:e.location_name,value:e.location_name})):[],k=r=>r?V.data.filter(e=>e.location_type==="Governorate"&&e.parent_location===r).map(e=>({label:e.location_name,value:e.location_name})):[];M(()=>i.doc,r=>{r&&!r.education_information&&(r.education_information=[])},{immediate:!0});const c=B({}),_=r=>{c[r]=!c[r]},u=r=>c[r],n=q([]),j=()=>{const r={country:"",city:"",governorate:"",continuous:!1,name_of_school_or_college_university:"",field_of_study_or_major:"",phone:"",ext:"",diploma:"",date_enrolled_from:"",date_enrolled_to:"",another_name:"",selectedCountry:"",selectedCity:""};i.doc.education_information.push(r),z(()=>{c[r.id]=!0})},E=r=>{confirm("Are you sure you want to delete this education record?")&&R(r)},R=r=>{const e=i.doc.education_information.findIndex(t=>t.id===r);e!==-1&&(i.doc.education_information.splice(e,1),delete c[r])},v=q(!1),$=()=>S(this,null,function*(){if(n.value=[],i.doc.education_information.forEach((r,e)=>{r.name_of_school_or_college_university||n.value.push(`Name of School or College/University is required in record number ${e+1}.`),r.field_of_study_or_major||n.value.push(`Field of Study or Major is required in record number ${e+1}.`),r.country||n.value.push(`Country is required in record number ${e+1}.`),r.city||n.value.push(`City is required in record number ${e+1}.`),r.governorate||n.value.push(`Governorate is required in record number ${e+1}.`),r.diploma||n.value.push(`Diploma completion status is required in record number ${e+1}.`),r.date_enrolled_from||n.value.push(`Start date is required in record number ${e+1}.`),r.date_enrolled_to||n.value.push(`End date is required in record number ${e+1}.`)}),!(n.value.length>0)){v.value=!0;try{yield i.setValue.submit({education_information:i.doc.education_information}),h.success("Request has been successfully saved!")}catch(r){n.value.push(`An error occurred while saving the request: ${r.message}`)}finally{v.value=!1}}});return(r,e)=>(s(),a("div",J,[w(i).doc?(s(),a("div",K,[n.value.length>0?(s(),a("div",W,[(s(!0),a(m,null,f(n.value,(t,U)=>(s(),F(w(G),{key:U,message:t},null,8,["message"]))),128))])):T("",!0),o("div",Q,[(s(!0),a(m,null,f(w(i).doc.education_information,(t,U)=>(s(),a("div",{key:t.id,class:"border border-light_gray rounded-md"},[o("div",X,[o("button",{id:"section-button-"+t.id,onClick:l=>_(t.id),"aria-expanded":u(t.id),"aria-controls":"section-content-"+t.id,class:"flex items-center space-x-2 focus:outline-none"},[o("span",ee,b(t.name_of_school_or_college_university||"New Education Record"),1),(s(),a("svg",{class:Y([{"transform rotate-180":u(t.id)},"w-5 h-5 transition-transform duration-200"]),fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e[0]||(e[0]=[o("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"},null,-1)]),2))],8,Z),o("button",{onClick:l=>E(t.id),class:"bg-warn hover:bg-warn_hover text-white px-2 py-1 rounded-md",title:"Delete Record"}," Delete ",8,oe)]),A(O,{name:"accordion"},{default:L(()=>[d(o("div",{class:"p-4 space-y-4",id:"section-content-"+t.id,role:"region","aria-labelledby":"section-button-"+t.id},[o("div",re,[o("div",null,[e[1]||(e[1]=o("label",{class:"block text-dark_gray"},"Name of School or College/University",-1)),d(o("input",{"onUpdate:modelValue":l=>t.name_of_school_or_college_university=l,placeholder:"Name of School or College/University",class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},null,8,le),[[p,t.name_of_school_or_college_university]])]),o("div",null,[e[2]||(e[2]=o("label",{class:"block text-dark_gray"},"Field of Study or Major",-1)),d(o("input",{"onUpdate:modelValue":l=>t.field_of_study_or_major=l,placeholder:"Field of Study or Major",class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},null,8,ne),[[p,t.field_of_study_or_major]])]),o("div",null,[e[3]||(e[3]=o("label",{class:"block text-dark_gray"},"Date Enrolled From",-1)),d(o("input",{type:"date","onUpdate:modelValue":l=>t.date_enrolled_from=l,class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},null,8,se),[[p,t.date_enrolled_from]])]),o("div",null,[e[4]||(e[4]=o("label",{class:"block text-dark_gray"},"Date Enrolled To",-1)),d(o("input",{type:"date","onUpdate:modelValue":l=>t.date_enrolled_to=l,class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},null,8,ae),[[p,t.date_enrolled_to]])]),o("div",null,[e[6]||(e[6]=o("label",{class:"block text-dark_gray"},"Country",-1)),d(o("select",{"onUpdate:modelValue":l=>t.country=l,onChange:l=>t.selectedCity="",class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},[e[5]||(e[5]=o("option",{value:""},"Select Country",-1)),(s(!0),a(m,null,f(x.value,l=>(s(),a("option",{key:l.value,value:l.value},b(l.label),9,de))),128))],40,ie),[[y,t.country]])]),o("div",null,[e[8]||(e[8]=o("label",{class:"block text-dark_gray"},"City",-1)),d(o("select",{"onUpdate:modelValue":l=>t.city=l,onChange:l=>t.governorate="",class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},[e[7]||(e[7]=o("option",{value:""},"Select City",-1)),(s(!0),a(m,null,f(g(t.country),l=>(s(),a("option",{key:l.value,value:l.value},b(l.label),9,ce))),128))],40,ue),[[y,t.city]])]),o("div",null,[e[10]||(e[10]=o("label",{class:"block text-dark_gray"},"Governorate",-1)),d(o("select",{"onUpdate:modelValue":l=>t.governorate=l,class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},[e[9]||(e[9]=o("option",{value:""},"Select Governorate",-1)),(s(!0),a(m,null,f(k(t.city),l=>(s(),a("option",{key:l.value,value:l.value},b(l.label),9,_e))),128))],8,pe),[[y,t.governorate]])]),o("div",null,[e[11]||(e[11]=o("label",{class:"block text-dark_gray"},"Phone:",-1)),d(o("input",{type:"tel","onUpdate:modelValue":l=>t.phone=l,placeholder:"Phone",pattern:"[0-9]{10,15}",class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},null,8,me),[[p,t.phone]])]),o("div",null,[e[12]||(e[12]=o("label",{class:"block text-dark_gray"},"Extension",-1)),d(o("input",{"onUpdate:modelValue":l=>t.ext=l,placeholder:"Extension",class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},null,8,fe),[[p,t.ext]])]),o("div",null,[e[14]||(e[14]=o("label",{class:"block text-dark_gray"},"Have you completed the degree/diploma?",-1)),d(o("select",{"onUpdate:modelValue":l=>t.diploma=l,class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},e[13]||(e[13]=[o("option",{value:""},"Select",-1),o("option",{value:"Yes"},"Yes",-1),o("option",{value:"No"},"No",-1)]),8,ye),[[y,t.diploma]])]),o("div",null,[e[16]||(e[16]=o("label",{class:"block text-dark_gray"},"Have you used any other name besides the one on your current government ID card?",-1)),d(o("select",{"onUpdate:modelValue":l=>t.another_name=l,class:"w-full px-3 py-2 border-light_gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"},e[15]||(e[15]=[o("option",{value:""},"Select",-1),o("option",{value:"Yes"},"Yes",-1),o("option",{value:"No"},"No",-1)]),8,ge),[[y,t.another_name]])])])],8,te),[[H,u(t.id)]])]),_:2},1024)]))),128))]),o("div",ve,[o("button",{onClick:j,class:"bg-primary hover:bg-primary_hover text-white px-4 py-2 rounded-md"}," Add Education Record "),o("button",{onClick:$,disabled:v.value,class:"bg-secondary hover:bg-secondary_hover text-white px-4 py-2 rounded-md"},[v.value?(s(),a("span",xe,"Saving...")):(s(),a("span",he,"Save Request"))],8,be)])])):(s(),a("div",ke,e[17]||(e[17]=[o("p",{class:"text-dark_gray"},"Loading...",-1)])))]))}};var qe=N(we,[["__scopeId","data-v-b74ae316"]]);export{qe as default};
