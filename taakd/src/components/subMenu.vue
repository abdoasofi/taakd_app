<template>
  
    <div class="absolute w-screen top-12 end-0 z-40"  >
      <div class="container  flex justify-end">
          <div class="rounded bg-white p-6 men_shadow min-w-80 shrink grow-0">
            <div class="flex justify-between items-start">
              <div class="space-y-1 text-dark_gray">
                <div class="font-semibold">[User Name]</div>
                <div class="font-normal">[User Name]@gmail.com</div>
              </div>
              <button class="text-lg font-bold" :onclick="closeFunc">x</button>
            </div>
            <div class="flex flex-col gap-3 text-black font-medium text-[14px] mt-4">
              <button class="flex justify-between border-b-[1px] border-b-light_gray hover:bg-gray-50">
                <div class="flex gap-3 items-center">
                  <div>
                    <v-icon scale="2" name="md-language-outlined" />
                  </div>
                  <div>Languages</div>
                </div>
                <div class="font-normal text-mid_gray">English</div>
              </button>
              <button class="flex gap-3 items-center border-b-[1px] border-b-light_gray hover:bg-gray-50">
                <div>
                  <v-icon scale="2" name="hi-lock-closed" />
                </div>
                <div>Change Password</div>
              </button>
              <button class="flex gap-3 items-center border-b-[1px] border-b-light_gray hover:bg-gray-50">
                <div>
                  <v-icon scale="2" name="md-phone-outlined" />
                </div>
                <div>Contact Us</div>
              </button>
              <button class="flex gap-3  items-center hover:bg-gray-50">
                <div>
                  <v-icon scale="2" name="md-logout" />
                </div>
                <div class="text-warn">Log Out</div>
              </button>
            </div>
          </div>
      </div>
    </div>

</template>
<script setup>



const props = defineProps({
    closeFunc:{type:Function}
});


const closeMenu = () => {
    this.closeFunc.call();
};



</script>
<style scoped>
.men_shadow{box-shadow: 0px 1px 6px 0px #00000052;
}
</style>