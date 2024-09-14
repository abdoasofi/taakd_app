
<!-- Grid with 1 large column and 1 small column -->
<template>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div class="h-32 rounded-lg bg-gray-200 lg:col-span-2"></div>
      <div class="h-32 rounded-lg bg-gray-200"></div>
    </div>
  </template>


<!-- #Grid with 3 even columns -->
<template>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div class="h-32 rounded-lg bg-gray-200"></div>
      <div class="h-32 rounded-lg bg-gray-200"></div>
      <div class="h-32 rounded-lg bg-gray-200"></div>
    </div>
  </template>


<!-- #Timeline with title, with highlighted current step -->
<template>
    <div>
      <h2 class="sr-only">Steps</h2>
    
      <div
        class="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
      >
        <ol class="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          <li class="flex items-center gap-2 bg-white p-2">
            <span class="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"> 1 </span>
    
            <span class="hidden sm:block"> Details </span>
          </li>
    
          <li class="flex items-center gap-2 bg-white p-2">
            <span
              class="size-6 rounded-full bg-blue-600 text-center text-[10px]/6 font-bold text-white"
            >
              2
            </span>
    
            <span class="hidden sm:block"> Address </span>
          </li>
    
          <li class="flex items-center gap-2 bg-white p-2">
            <span class="size-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold"> 3 </span>
    
            <span class="hidden sm:block"> Payment </span>
          </li>
        </ol>
      </div>
    </div>
  </template>



<!-- Select Components -->
<template>
    <div>
      <label for="HeadlineAct" class="block text-sm font-medium text-gray-900"> Headliner </label>
    
      <select
        name="HeadlineAct"
        id="HeadlineAct"
        class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="">Please select</option>
        <option value="JM">John Mayer</option>
        <option value="SRV">Stevie Ray Vaughn</option>
        <option value="JH">Jimi Hendrix</option>
        <option value="BBK">B.B King</option>
        <option value="AK">Albert King</option>
        <option value="BG">Buddy Guy</option>
        <option value="EC">Eric Clapton</option>
      </select>
    </div>
  </template>


  <!-- #Large with emphasized icon, solid and bordered -->
<template>
    <!--
      Heads up! 👋
    
      This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
    -->
    
    <!-- Base -->
    
    <a
      class="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
      href="#"
    >
      <span
        class="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
      >
        Find out more
      </span>
    
      <span
        class="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
      >
        <svg
          class="size-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </a>
    
    <!-- Border -->
    
    <a
      class="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
      href="#"
    >
      <span class="font-medium transition-colors group-hover:text-white"> Find out more </span>
    
      <span
        class="shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500"
      >
        <svg
          class="size-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </a>
  </template>


<!-- #Highlighted border with rotating icon and contained content --><template>
  <div class="space-y-4">
    <details
      class="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
      open
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing?
        </h2>
  
        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>
  
      <p class="mt-4 leading-relaxed text-gray-700">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
        recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
        consequuntur distinctio corporis earum similique!
      </p>
    </details>
  
    <details
      class="group border-s-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary class="flex cursor-pointer items-center justify-between gap-1.5">
        <h2 class="text-lg font-medium text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing?
        </h2>
  
        <span class="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </summary>
  
      <p class="mt-4 leading-relaxed text-gray-700">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
        recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
        consequuntur distinctio corporis earum similique!
      </p>
    </details>
  </div>
</template>
