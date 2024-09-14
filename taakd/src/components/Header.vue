
<template>
	<header class=" bg-[#FFFFFF] dark:text-gray-800">
		<div class="container flex justify-between h-16 mx-auto">
			<!-- <ul class="items-stretch hidden space-x-3 lg:flex">
				<li class="flex">
					<a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 border-b-2 dark:border- dark:text-violet-600 dark:border-violet-600">Link</a>
				</li>
				<li class="flex">
					<a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 border-b-2 dark:border-">Link</a>
				</li>
				<li class="flex">
					<a rel="noopener noreferrer" href="#" class="flex items-center px-4 -mb-1 border-b-2 dark:border-">Link</a>
				</li>
			</ul> -->
            
            <div class=" flex ">
                <Logo ></Logo>
                <HeaderLine class= "pt-4"></HeaderLine>
                <div class="flex pt-6">
                    <BtnPrevious ></BtnPrevious>  
                    <BtnNext></BtnNext>
                </div>
            </div>
            <div  class=" flex pt-6">
                <BtnContactUs></BtnContactUs>
                <BtnMenu ></BtnMenu>
            </div>
		</div>
	</header>
</template>

<!-- *************************************** -->
<script setup>

import BtnMenu from './Buttons/Header/BtnMenu.vue';
import BtnContactUs from './Buttons/Header/BtnContactUs.vue';
import BtnPrevious from './Buttons/Header/BtnPrevious.vue';
import BtnNext from './Buttons/Header/BtnNext.vue';
import Logo from './Icons/Logo.vue';
import HeaderLine from './Icons/HeaderLine.vue';
// import Footer from '@/components/Footer.vue';

</script>
