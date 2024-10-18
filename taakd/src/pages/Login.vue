<template>
  <div class=" bg-bg  leading-[1.6rem] text-dark_gray">
    <div class="m-3 h-screen w-screen flex items-center justify-center">
      <Card title="Login Taakd " class="w-full max-w-[40rem] mt-4">
        <Logo class="flex flex-row items-center justify-center "></Logo>
        <form class="flex flex-col justify-start  w-full" @submit.prevent="submit">
          <Input
            required
            name="email"
            type="text"
            placeholder="johndoe@email.com"
            label="User ID"
            class="p-5 py-6"

          />
          <Input
            required
            name="password"
            type="password"
            placeholder="••••••"
            label="Password"
            class="p-5 py-6"
          />
          <div class="px-5">
            <Button :loading="session.login.loading" variant="solid"
            :class="['bg-secondary hover:bg-secondary_hover block w-full h-full py-5 text-white ']" >Login</Button
            >
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { session } from '../data/session'
import Logo from '../components/Icons/Logo.vue';
import BaseLayout from '../layouts/baseLayout.vue';


function submit(e) {
  let formData = new FormData(e.target)
  session.login.submit({
    email: formData.get('email'),
    password: formData.get('password'),
  })
}
</script>
