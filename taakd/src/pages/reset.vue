<template>
  <BaseLayout>
    <BaseContainer>
      <div class="pb-5">
        <Heading tag="h1" level="primary">A warm welcome from Taakd.</Heading>
        <Heading tag="h2" level="secondary-2" class="mt-1">
          Let’s set up your account. All fields below are required.
        </Heading>
      </div>
      <p class="my-5">{{ session.user }}</p>
      <form @submit.prevent="confirmData">
        <div class="py-5">
          <Heading class="my-1" tag="h3" level="secondary-2">Create New Password</Heading>
          <div class="py-3 lg:w-1/2">
            <FormControl
              :type="'password'"
              size="sm"
              variant="subtle"
              placeholder="Enter password"
              label="Enter password"
              v-model="enterPassword"
              :class="{ 'border-red-500': passwordError }"
              @input="validatePasswords"
            />
            <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
          </div>
          <div class="py-3 lg:w-1/2">
            <FormControl 
              :type="'password'"
              size="sm"
              variant="subtle"
              placeholder="Confirm password"
              label="Confirm Password"
              v-model="confirmPassword"
              :class="{ 'border-red-500': passwordError }"
              @input="validatePasswords"
              required
            />
            <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
          </div>
        </div>
        <div class="py-5">
          <Heading class="my-1" tag="h3" level="secondary-2">Text notifications</Heading>
          <p class="text-sm font-medium">Would you like to subscribe to text messages for notifications and password resets?</p>
          <div>
            <div class="flex items-start gap-1 py-2">
              <input type="radio" name="textNotifications" value="yes" v-model="textNotifications" @change="handleTextNotificationChange" />
              <Label class="block"> Yes, </Label>
              <p class="mt-1">I acknowledge and agree that I may receive texts for notifications and password resets, and that standard data and text charges may apply.</p>
            </div>
            <div class="flex gap-1 py-2">
              <input type="radio" name="textNotifications" value="no" v-model="textNotifications" @change="handleTextNotificationChange" />
              <Label class="block"> No, </Label>
              <p class="mt-1">I acknowledge and agree that I may receive texts for notifications and password resets, and that standard data and text charges may apply.</p>
            </div>
          </div>
        </div>
        <div class="pt-5 flex w-full justify-center">
          <Button type="submit" :disabled="disabled" label="Next ->" :class="['bg-secondary hover:bg-secondary_hover px-4 py-2 text-white']" />
        </div>
      </form>
    </BaseContainer>
  </BaseLayout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Button, FormControl } from 'frappe-ui';
import { createListResource } from 'frappe-ui';
import Heading from "../components/heading.vue";
import BaseContainer from "../components/baseContainer.vue";
import BaseLayout from "../layouts/baseLayout.vue";
import { session } from '../data/session';

const enterPassword = ref('');
const confirmPassword = ref('');
const textNotifications = ref('');
const disabled = ref(true);
const passwordError = ref('');
const subscribeToTextMmessages = ref(false);
const createNewPassword = ref(false);

const userList = createListResource({
  doctype: 'User',
  fields: ['email', 'username', 'full_name', 'new_password', 'name', 'first_name'],
  filters: { email: session.user },
  auto: true,
  setValue: {
    onSuccess(d) {
      createNewPassword.value = true;
      updateCreateNewPassword();
      session.logout.submit();
      // window.location.reload();

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
    new_password: confirmPassword.value
  });
}

const requestList = createListResource({
  doctype: 'Verification Instructions Request',
  fields: ['name', 'user_id', 'create_new_password', 'subscribe_to_text_messages'],
  filters: { user_id: session.user },
  auto: true,
  pageLength: 1,
  setValue: {
    onSuccess(data) {},
    onError(error) {}
  },
});

function updateCreateNewPassword() {
  const requestName = requestList.data[0].name;
  if (!requestName) {
    console.error("Request document name is not available");
    return;
  }
  requestList.setValue.submit({
    name: requestName,
    create_new_password: createNewPassword.value,
    subscribe_to_text_messages: subscribeToTextMmessages.value
  });
}

const validatePasswords = () => {
  passwordError.value = enterPassword.value === confirmPassword.value ? '' : 'Passwords do not match';
  disabled.value = enterPassword.value === '' || confirmPassword.value === '' || passwordError.value !== '';
};

const confirmData = () => {
  if (enterPassword.value === confirmPassword.value) {
    updatePassword();
  } else {
    passwordError.value = 'Passwords do not match';
  }
};

function handleTextNotificationChange() {
  subscribeToTextMmessages.value = (textNotifications.value === 'yes');
}

watch([enterPassword, confirmPassword], validatePasswords);
</script>

<style scoped>
/* Custom styles if needed */
</style>