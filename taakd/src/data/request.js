// import router from '@/router'
import { createListResource } from 'frappe-ui'
import { session } from './session';

// دالة لإنشاء مورد الطلبات مع الحقول المطلوبة
export function createRequestList(fields) {
    return createListResource({
      doctype: 'Verification Instructions Request',
      fields, // استخدم الحقول الممررة من المعامل
      filters: { user_id: session.user },
      auto: true,
      pageLength: 1,
      onSuccess(data) {
        console.log("Data retrieved successfully:", data);
      },
      setValue: {
        onSuccess(data) {
          console.log("Data update successful.");
        },
        onError(error) {
          console.error("Error updating data:", error);
        }
      },
    });
  }