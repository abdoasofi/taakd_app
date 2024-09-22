<template>
     <span :class="['aspect-square', 'rounded-full', 'flex', 'justify-center', 'items-center','w-full',{
        'bg-secondary/30 border-[1px] border-primary ':status==='process',
        'bg-more_lighter_gray':status==='init',
        'bg-secondary/30 border-[1px] border-secondary':status==='done',
     }]">
    <i :class="[' w-1/3 h-1/3 rounded-full block',
       {
        'bg-primary':status==='process',
        'bg-mid_gray':status==='init',
        'bg-secondary':status==='done',
     }]"></i>
    </span>
</template>
<script>

export default{
    name:"StyledIcon",
    props: {
      status: {
        type: String,
        default: 'process',
      },
     
    },
}
</script>

<style scoped>
.cir-border{
    border: 1.07px solid #3F4457
}
</style>