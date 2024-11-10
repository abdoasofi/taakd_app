<!-- Login.vue -->
<template>
  <BaseLayout>
    <BaseContainer>
      <div class="login-container">
        <div class="logo-section">
          <img src="@/assets/logo.png" alt="Logo" class="h-40 w-72 mb-4" />
        </div>

        <Heading tag="h1" level="primary">{{ $t('login.welcomeMessage') }}</Heading>
        <Heading tag="h2" level="secondary-2" class="mt-1">
          {{ $t('login.loginDescription') }}
        </Heading>

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
      </div>
    </BaseContainer>
  </BaseLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Button, FormControl} from 'frappe-ui';
import BaseLayout from '../layouts/baseLayout.vue';
import BaseContainer from '../components/baseContainer.vue';
import Heading from '../components/heading.vue';
import StyledIcon from '../components/styledIcon.vue'; // تأكد من استيراده إذا كان مستخدمًا

const { t } = useI18n();
const router = useRouter();

// دالة التعامل مع تسجيل الدخول
const submit =  (e) => {
  let formData = new FormData(e.target)
  session.login.submit({
    email: formData.get('email'),
    password: formData.get('password'),
  })
};

// استيراد خدمة التوست للتنبيهات (تأكد من إضافتها في المشروع)
import { useToast } from 'vue-toastification';
import { session } from '../data/session';
const toast = useToast();

</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1rem;
}
</style>