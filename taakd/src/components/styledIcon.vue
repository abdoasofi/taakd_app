<template>
     <span :class="['aspect-square', 'rounded-full', 'flex', 'justify-center', 'items-center','w-full',{
        'bg-secondary/30 border-[1px] border-primary ':status==1,
        'bg-more_lighter_gray':status==0,
        'bg-secondary/30 border-[1px] border-secondary':status==2,
     }]">
    <!-- <i :class="[' w-1/3 h-1/3 rounded-full block',
       {
        'bg-primary':status==1,
        'bg-mid_gray':status==0,
        'bg-secondary':status==2,
     }]"> -->
     
    <div :class="[' rounded-full flex items-center w-1/3 h-1/3 justify-center',
       {
        'text-primary':status==1,
        'text-mid_gray':status==0,
        'text-secondary':status==2,
     }]">
   
      <v-icon :scale='scale' name="md-done-twotone" v-if="status==2"  />
      <v-icon :scale='scale' :name="icon"  v-if="status==0||status==1" />
    </div>
    
    <!-- </i> -->
    </span>
</template>
<script setup>
 
const props = defineProps({
	status: { type: Number,
		required: true,default:0 },
    icon: { type: String,
     default:"bi-music-player"},
     scale:{ type: Number,
      default:2 },
	
});
</script>

<style scoped>
.cir-border{
    border: 1.07px solid #3F4457
}
</style>