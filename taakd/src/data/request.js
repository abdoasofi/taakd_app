// import router from '@/router'
import { createListResource ,createDocumentResource } from 'frappe-ui'
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

  export function updateFieldsInRequestList(requestList, updatedFields) {
    if (!requestList || !requestList.data || !requestList.data[0]) {
      console.error("Request list data is not available");
      return;
    }
  
    const documentName = requestList.data[0].name;
  
    requestList.setValue.submit({
      name: documentName,
      ...updatedFields, // تمرير الحقول المحدثة
    }).then(response => {
      console.log("Data updated successfully:", response);
    }).catch(error => {
      console.error("Error updating data:", error);
    });
  }

// General function for document operations
export function useDocumentResource(name = '') {
  if (!name) {
    console.warn("Document name is not provided.");
  }
  return createDocumentResource({
    doctype: "Verification Instructions Request",
    name: name,
    // auto: true
  });
}


