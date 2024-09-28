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
export function useDocumentResource(doctype) {
  const documentResource = createDocumentResource({
    doctype,
    onError(error) {
      console.error('Error interacting with document:', error);
    }
  });

  // دالة لجلب البيانات الكاملة للمستند مع الجداول الفرعية
  const fetchDocument = async (name) => {
    try {
      const documentData = await documentResource.fetch(name);
      console.log('Document fetched successfully:', documentData);
      return documentData;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  };

  // دالة لتحديث المستندات وجداولها الفرعية
  const updateDocument = async (name, updatedFields) => {
    try {
      const response = await documentResource.setValue.submit({
        name,
        ...updatedFields,
      });
      console.log('Document updated successfully:', response);
      return response;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  };

  return {
    fetchDocument,
    updateDocument,
  };
}


