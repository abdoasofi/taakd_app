<template>
    <div class="flex flex-col items-center gap-4 px-1">
                    
                    <div class="w-12 lg:w-16">
                        <StyledIcon :status="status" />
                    </div>
        
                <div :class="[`text-xs text-center`, {
        'font-bold':status==='process'||status==='done',
        'font-semibold':status==='init',
     }]">
                   {{label}}
                </div>
            </div>
</template>
<script>
import StyledIcon from "../../components/styledIcon.vue";
export default{
    name:"ProcessItem",
    props:{
        status: {
        type: String,
        default: 'init',
      },
      label:{
        type:String,
        default:"empty"
      },
      
    },components:{
        StyledIcon
      }
};
</script>
