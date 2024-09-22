import router from '@/router'
import { computed, reactive, ref } from 'vue'
import { createResource, createListResource } from 'frappe-ui'

import { userResource } from './user'

export function sessionUser() {
  const cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
  let _sessionUser = cookies.get('user_id')
  if (_sessionUser === 'Guest') {
    _sessionUser = null
  }
  return _sessionUser
}

const createNewPassword = ref(false);

export const session = reactive({
  login: createResource({
    url: 'login',
    makeParams({ email, password }) {
      return {
        usr: email,
        pwd: password,
      }
    },
    onSuccess(data) {

// =================================

// const requestList = createListResource({
//   doctype: 'Verification Instructions Request',
//   fields: ['name', 'user_id', 'create_new_password'],
//   filters: { user_id: session.user },
//   auto: true,
//   pageLength: 1,
// });

// function updateValueCreateNewPassword() {
//   if (requestList.data) {
//     console.error("create_new_password is not defined");
//     return;
//   }
//   // createNewPassword.value = requestList.data[0].create_new_password;
//   console.log("*******************************",requestList.data);

// }

// updateValueCreateNewPassword()

// =================================
      userResource.reload()
      session.user = sessionUser()
      session.login.reset()
      if (!createNewPassword.value) {
        router.replace({ name: 'reset' });
      } else {
        router.replace('/');
      }
    },
    onError(error) {
      console.error("Login failed", error);
      // توفير تعليقات للمستخدم عند فشل تسجيل الدخول إذا لزم الأمر
    },
  }),
  logout: createResource({
    url: 'logout',
    onSuccess() {
      userResource.reset()
      session.user = sessionUser()
      router.replace({ name: 'Login' });
    },
  }),
  user: sessionUser(),
  isLoggedIn: computed(() => !!session.user),
});