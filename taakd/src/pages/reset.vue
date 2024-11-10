<!-- reset.vue -->
<template>
  <BaseLayout>
    <BaseContainer>
      <div class="pb-5">
        <Heading tag="h1" level="primary">{{ $t('reset.welcomeMessage') }}</Heading>
        <Heading tag="h2" level="secondary-2" class="mt-1">
          {{ $t('reset.accountSetupDescription') }}
        </Heading>
      </div>
      <p 
        class="my-5" 
        :class="{'text-right rtl:text-left': isArabic(userFullName), 'text-left': !isArabic(userFullName)}">
        {{ userFullName }}
      </p>
      <form @submit.prevent="confirmData">
        <div class="py-5">
          <Heading class="my-1" tag="h3" level="secondary-2">
            {{ $t('reset.createNewPassword') }}
          </Heading>
          <div class="py-3 lg:w-1/2">
            <FormControl
              :type="'password'"
              size="sm"
              variant="subtle"
              :placeholder="$t('reset.enterPasswordPlaceholder')"
              :label="$t('reset.enterPasswordLabel')"
              v-model="enterPassword"
              :class="{ 'border-red-500': passwordError }"
              @input="validatePasswords"
            />
            <p v-if="passwordError" class="text-red-500">{{ $t('reset.passwordsDoNotMatch') }}</p>
          </div>
          <div class="py-3 lg:w-1/2">
            <FormControl 
              :type="'password'"
              size="sm"
              variant="subtle"
              :placeholder="$t('reset.confirmPasswordPlaceholder')"
              :label="$t('reset.confirmPasswordLabel')"
              v-model="confirmPassword"
              :class="{ 'border-red-500': passwordError }"
              @input="validatePasswords"
              required
            />
            <p v-if="passwordError" class="text-red-500">{{ $t('reset.passwordsDoNotMatch') }}</p>
          </div>
        </div>
        <div class="py-5">
          <Heading class="my-1" tag="h3" level="secondary-2">
            {{ $t('reset.textNotificationsHeading') }}
          </Heading>
          <p class="text-sm font-medium">
            {{ $t('reset.subscribeTextNotificationsPrompt') }}
          </p>
          <div>
            <div class="flex items-start gap-1 py-2">
              <input 
                type="radio" 
                name="textNotifications" 
                value="yes" 
                v-model="textNotifications" 
                @change="handleTextNotificationChange" 
              />
              <!-- <Label class="block">{{ $t('reset.yesLabel') }} </Label> -->
              <p class="mt-1">{{ $t('reset.yesDescription') }}</p>
            </div>
            <div class="flex gap-1 py-2">
              <input 
                type="radio" 
                name="textNotifications" 
                value="no" 
                v-model="textNotifications" 
                @change="handleTextNotificationChange" 
              />
              <Label class="block">{{ $t('reset.noLabel') }} </Label>
              <p class="mt-1">{{ $t('reset.noDescription') }}</p>
            </div>
          </div>
        </div>
        <div class="pt-5 flex w-full justify-center">
          <Button 
            type="submit" 
            :disabled="disabled" 
            :label="$t('reset.nextButton')" 
            :class="['bg-secondary hover:bg-secondary_hover px-4 py-2 text-white']" 
          />
        </div>
      </form>
    </BaseContainer>
  </BaseLayout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Button, FormControl } from 'frappe-ui';
import Heading from "../components/heading.vue";
import BaseContainer from "../components/baseContainer.vue";
import BaseLayout from "../layouts/baseLayout.vue";
import { session } from '../data/session';
import { useRoute } from 'vue-router'; // استيراد useRoute
import { createRequestList, updateFieldsInRequestList } from '../data/request';
import { createListResource } from 'frappe-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const fields = ['name', 'user_id', 'subscribe_to_text_messages'];
const requestList = createRequestList(fields);

const route = useRoute(); // إنشاء مثيل من useRoute

// استقبال fullName من المتغيرات في URL
const userFullName = route.query.fullName || 'مستخدم';

// باقي المتغيرات
const enterPassword = ref('');
const confirmPassword = ref('');
const textNotifications = ref('');
const disabled = ref(true);
const passwordError = ref('');
const subscribeToTextMmessages = ref(true);
const createNewPassword = ref(true);
const updatedFields = {
  subscribe_to_text_messages: subscribeToTextMmessages.value,
};

const isArabic = (str) => {
  return /[\u0600-\u06FF]/.test(str); // هذا النمط يتحقق من وجود أحرف عربية
};

// ==========================

const userList = createListResource({
  doctype: 'User',
  fields: ['email', 'username', 'full_name', 'new_password', 'name', 'first_name'],
  filters: { email: session.user },
  auto: true,
  onSuccess(d) {
    updateFieldsInRequestList(requestList, updatedFields);
  },
  setValue: {
    onSuccess(d) {
      session.logout.submit();
    },
    onError(error) {}
  },
});

function updatePassword() {
  if (!session.user) {
    console.error("Session user is not defined");
    return;
  }
  userList.setValue.submit({
    name: session.user,
    new_password: confirmPassword.value,
    create_new_password: createNewPassword.value,
  });
}

const validatePasswords = () => {
  passwordError.value = enterPassword.value === confirmPassword.value ? '' : t('reset.passwordsDoNotMatch');
  disabled.value = enterPassword.value === '' || confirmPassword.value === '' || passwordError.value !== '';
};

const confirmData = () => {
  if (enterPassword.value === confirmPassword.value) {
    updatePassword();
  } else {
    passwordError.value = t('reset.passwordsDoNotMatch');
  }
};

function handleTextNotificationChange() {
  subscribeToTextMmessages.value = (textNotifications.value === 'yes'); // تعيينه بـ true او false مباشر
}

// ==========================

watch([enterPassword, confirmPassword], validatePasswords);
</script>

<style scoped>
/* Custom styles if needed */
</style>