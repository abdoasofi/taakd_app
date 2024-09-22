import router from '@/router';
import { computed, reactive, ref } from 'vue';
import { createResource, createListResource } from 'frappe-ui';
import { userResource } from './user';
// وظيفة للحصول على معرّف المستخدم من الكوكيز
function sessionUser() {
  const cookies = new URLSearchParams(document.cookie.split('; ').join('&'));
  let userId = cookies.get('user_id');
  
  if (userId === 'Guest') {
    userId = null;
  }
  
  return userId;
}

// متغير للإشارة إلى حالة إعداد كلمة المرور الجديدة
const createNewPassword = ref(false);
const userFullName = ref('');


// كائن يدير جلسة المستخدم
export const session = reactive({
  user: sessionUser(),
  isLoggedIn: computed(() => !!session.user),
  
  // وظيفة تسجيل الدخول
  login: createResource({
    url: 'login',
    makeParams({ email, password }) {
      return {
        usr: email,
        pwd: password,
      };
    },
    onSuccess(data) {
      userResource.reload();
      session.user = sessionUser();
      session.login.reset();
      checkForNewPassword(session.user);
    },
    onError(error) {
      console.error("فشل تسجيل الدخول", error);
      // هنا يمكنك عرض رسالة خطأ مناسبة للمستخدم
    },
  }),
  
  // وظيفة تسجيل الخروج
  logout: createResource({
    url: 'logout',
    onSuccess() {
      userResource.reset();
      session.user = sessionUser();
      router.replace({ name: 'Login' });
    },
  }),
});

// دالة للتحقق مما إذا كان يجب على المستخدم تعيين كلمة مرور جديدة
function checkForNewPassword(userId) {
  const username = ref(userId);

  const getUserResource = createListResource({
    type: 'list',
    doctype: 'User',
    filters: { "name": username.value },
    fields: ["create_new_password","full_name"],
    auto: true,
    onSuccess() {
      const userData = getUserResource.data[0];
      if (userData) {
        userFullName.value = userData.full_name
        createNewPassword.value = userData.create_new_password === 0;
        redirectAfterLogin(createNewPassword.value);
      }
    },
  });
}

// دالة لإعادة توجيه المستخدم بعد تسجيل الدخول
function redirectAfterLogin(needsNewPassword) {
  if (needsNewPassword) {
    // router.replace({ name: 'reset' });
    router.replace({ name: 'reset', query: { fullName: userFullName.value } });
  } else {
    router.replace('/');
  }
}