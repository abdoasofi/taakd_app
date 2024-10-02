var i=Object.defineProperty;var l=Object.getOwnPropertySymbols;var r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;var c=(e,t,a)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,o=(e,t)=>{for(var a in t||(t={}))r.call(t,a)&&c(e,a,t[a]);if(l)for(var a of l(t))n.call(t,a)&&c(e,a,t[a]);return e};import{B as p}from"./button.3122b5b4.js";import{v as f,o as u,h as v,i as d,x as h,j as C,w as _,n as g,d as V}from"./vendor.1aaec15d.js";import{s as H}from"./index.b3db4008.js";const m={class:"header w-full overflow-x-hidden z-10 relative"},x={class:"container flex justify-between items-center"},L={class:"flex justify-around items-center gap-7"},y={__name:"header",setup(e){return(t,a)=>(u(),v("header",m,[d("div",x,[a[3]||(a[3]=h('<div class="logo py-4 lg:flex lg:gap-6" data-v-5d10f2c6><div class="h-6 lg:h-9 aspect-[1.376] flex justify-center items-center" data-v-5d10f2c6><svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-5d10f2c6><g clip-path="url(#clip0_944_13802)" data-v-5d10f2c6><path d="M55.9662 21.9149V24.1236L62.7031 21.8174V25.0489L53.3271 28.1221V22.8374L55.9662 21.9149Z" fill="#81C045" data-v-5d10f2c6></path><mask id="mask0_944_13802" style="mask-type:luminance;" maskUnits="userSpaceOnUse" x="-15" y="-15" width="102" height="102" data-v-5d10f2c6><path d="M86.625 -14.625H-14.625V86.625H86.625V-14.625Z" fill="white" data-v-5d10f2c6></path></mask><g mask="url(#mask0_944_13802)" data-v-5d10f2c6><path d="M34.9153 24.0023H28.6181L32.6043 17.4961H27.4162L23.9728 24.0258C24.0196 25.8183 24.6328 27.2808 25.3406 28.2473H35.175C36.0243 28.2473 36.6375 28.4592 37.0612 28.9317C37.4625 29.3798 37.5796 29.9461 37.5796 30.6061V32.422H21.4256V30.3698C21.4256 28.0823 21.119 26.408 19.9162 25.0167C18.7134 23.6255 16.8028 23.0592 14.3971 23.0592H13.5009V27.3042H14.7984C15.7181 27.3042 16.2609 27.5873 16.6612 28.1058C17.0146 28.5773 17.1806 29.167 17.1806 29.992V32.4211H9.32715V36.6661H41.8246V30.9352C41.8246 29.0011 41.3765 27.0436 40.3153 25.8408C39.089 24.473 37.3434 24.0014 34.9143 24.0014" fill="#3F4457" data-v-5d10f2c6></path><path d="M55.9775 28.6214V32.422H49.3241L49.3597 20.3686H46.6691L49.3653 18.247L49.3682 17.4961H45.1232L45.0791 36.667H60.2225V27.2302L55.9775 28.6214Z" fill="#3F4457" data-v-5d10f2c6></path><path d="M21.1207 46.8464C20.4682 47.4089 20.0866 48.2058 19.917 49.1836C19.9029 49.2605 19.8916 49.3393 19.8795 49.4189C19.811 49.913 19.811 50.4155 19.8795 50.9096C19.8907 50.9893 19.902 51.068 19.917 51.1449C20.0866 52.1227 20.4682 52.9186 21.1207 53.4839C22.0516 54.2893 23.1757 54.4946 24.7095 54.4946H25.3076L26.0848 53.3293V54.4946H28.931V45.833H24.7104C23.1766 45.833 22.0526 46.0383 21.1216 46.8455M26.0838 51.6493H24.4563C23.9032 51.6493 23.5085 51.5396 23.1926 51.3005C22.9198 51.0905 22.7445 50.8233 22.6816 50.4221C22.6545 50.2505 22.6545 50.0761 22.6816 49.9064C22.7445 49.5052 22.9198 49.2352 23.1926 49.0252C23.5085 48.788 23.9032 48.6783 24.4563 48.6783H26.0838V51.6483V51.6493Z" fill="#3F4457" data-v-5d10f2c6></path><path d="M31.2165 46.8464C30.564 47.4089 30.1843 48.2058 30.0127 49.1836C29.9996 49.2605 29.9874 49.3393 29.9771 49.4189C29.9087 49.913 29.9087 50.4155 29.9771 50.9096C29.9874 50.9893 29.9996 51.068 30.0127 51.1449C30.1843 52.1227 30.564 52.9186 31.2165 53.4839C32.1502 54.2893 33.2715 54.4946 34.8043 54.4946H35.4165L36.1937 53.3293V54.4946H39.0249V45.833H34.8043C33.2705 45.833 32.1502 46.0383 31.2165 46.8455M36.1796 51.6493H34.5521C33.998 51.6493 33.6043 51.5396 33.2884 51.3005C33.0155 51.0905 32.8402 50.8233 32.7774 50.4221C32.7502 50.2505 32.7502 50.0761 32.7765 49.9064C32.8412 49.5052 33.0165 49.2352 33.2893 49.0252C33.6052 48.788 33.999 48.6783 34.553 48.6783H36.1805V51.6483L36.1796 51.6493Z" fill="#3F4457" data-v-5d10f2c6></path><path d="M57.37 41.0869V45.8325H55.9938C54.4591 45.8325 53.336 46.0378 52.4022 46.8441C51.7488 47.4094 51.3682 48.2053 51.1975 49.1859C51.1844 49.2628 51.1722 49.3416 51.161 49.4212C51.0935 49.9153 51.0935 50.4187 51.161 50.9128C51.1722 50.9925 51.1844 51.0713 51.1975 51.1491C51.3682 52.1288 51.7488 52.9256 52.4022 53.4891C53.336 54.2972 54.4591 54.5025 55.9938 54.5025H60.2191V41.0859H57.37V41.0869ZM57.37 51.6553H55.7407C55.1875 51.6553 54.7919 51.5438 54.475 51.3066C54.2022 51.0966 54.0269 50.8275 53.9632 50.4253C53.936 50.2547 53.936 50.0803 53.9632 49.9097C54.0269 49.5075 54.2022 49.2394 54.475 49.0294C54.791 48.7922 55.1866 48.6806 55.7407 48.6806H57.37V51.6544V51.6553Z" fill="#3F4457" data-v-5d10f2c6></path><path d="M50.69 42.7944H47.2129L43.7057 47.0797V41.0947H40.8604V54.4972H43.7057V51.4541L44.5663 50.3853L47.93 54.4972H51.4082L46.4675 48.0285L50.69 42.7944Z" fill="#3F4457" data-v-5d10f2c6></path><path d="M15.386 51.6515H12.1432L12.1675 43.5721L12.1713 42.1499L12.1732 41.4121H9.29785V54.4968H18.2313V49.1034H15.386V51.6515Z" fill="#3F4457" data-v-5d10f2c6></path><path d="M12.1687 43.59V45.0853L16.7296 43.5244V45.7116L10.3818 47.7919V44.2144L12.1687 43.59Z" fill="#81C045" data-v-5d10f2c6></path></g></g><defs data-v-5d10f2c6><clipPath id="clip0_944_13802" data-v-5d10f2c6><rect width="72" height="72" fill="white" data-v-5d10f2c6></rect></clipPath></defs></svg></div><span class="h-9 w-[2px] bg-light_gray hidden lg:block" data-v-5d10f2c6></span><div class="gap-2 hidden lg:flex text-3xl" data-v-5d10f2c6><span class="block text-secondary" data-v-5d10f2c6>&lt;</span><span class="block text-secondary" data-v-5d10f2c6>&gt;</span></div><input class="lg:block hidden border-[1px] border-mid_gray rounded-lg w-80 p-1" data-v-5d10f2c6></div>',1)),d("div",L,[C(p,{class:"hidden lg:block",level:"secondary"},{default:_(()=>a[0]||(a[0]=[g(" Contact Us ")])),_:1}),a[1]||(a[1]=d("div",{class:"min-h-4 max-h-7 aspect-square bg-dark_gray lg:hidden"},null,-1)),a[2]||(a[2]=d("div",{class:"text-dark_gray text-3xl font-bold"},"...",-1))])])]))}};var Z=f(y,[["__scopeId","data-v-5d10f2c6"]]);function F(e){return V({doctype:"Verification Instructions Request",fields:e,filters:{user_id:H.user},auto:!0,pageLength:1,onSuccess(t){console.log("Data retrieved successfully:",t)},setValue:{onSuccess(t){console.log("Data update successful.")},onError(t){console.error("Error updating data:",t)}}})}function j(e,t){if(!e||!e.data||!e.data[0]){console.error("Request list data is not available");return}const a=e.data[0].name;e.setValue.submit(o({name:a},t)).then(s=>{console.log("Data updated successfully:",s)}).catch(s=>{console.error("Error updating data:",s)})}export{Z as H,F as c,j as u};