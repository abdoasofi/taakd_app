// دوال التعامل مع Frappe UI:
// src/data/request.ts
import { createListResource, createDocumentResource, ResourceList, ResourceDocument } from 'frappe-ui';
import { session } from './session';
import { RequestData, UpdateFields } from './types';
import { useToast } from 'vue-toastification';

// تعريف خيارات إنشاء مورد القائمة باستخدام النوع المناسب
interface CreateListResourceOptions {
  doctype: string;
  fields: string[];
  filters: { [key: string]: any };
  auto: boolean;
  pageLength: number;
  onSuccess: (data: RequestData[]) => void;
  onError?: (error: any) => void;
}

/**
 * إنشاء مورد قائمة لطلبات Verification Instructions Request.
 * @param fields - قائمة أسماء الحقول المراد جلبها.
 * @returns مورد قائمة من نوع ResourceList<RequestData>
 */
export function createRequestList(fields: string[]): ResourceList<RequestData> {
  if (!session.user) {
    throw new Error("User session is not available.");
  }

  const toast = useToast(); // استدعاء useToast داخل الدالة

  const options: CreateListResourceOptions = {
    doctype: 'Verification Instructions Request',
    fields,
    filters: { user_id: session.user },
    auto: true,
    pageLength: 1,
    onSuccess(data: RequestData[]) {
      console.log("Data retrieved successfully:", data);
    },
    onError(error: any) {
      console.error("Error retrieving data:", error);
      toast.error("حدث خطأ أثناء جلب البيانات.");
    },
  };

  return createListResource<RequestData>(options);
}

/**
 * تحديث الحقول في مورد القائمة `Verification Instructions Request`.
 * @param requestList - مورد القائمة المراد تحديثه.
 * @param updatedFields - كائن يحتوي على الحقول المراد تحديثها.
 */
export function updateFieldsInRequestList(
  requestList: ResourceList<RequestData>,
  updatedFields: UpdateFields
): void {
  const toast = useToast(); // استدعاء useToast داخل الدالة

  if (!requestList || !requestList.data || requestList.data.length === 0) {
    console.error("Request list data is not available");
    toast.error("فشل في العثور على بيانات الطلب المتاحة.");
    return;
  }

  const documentName: string = requestList.data[0].name;

  const document: ResourceDocument<RequestData> | undefined = requestList.documents.find(doc => doc.name === documentName);

  if (!document) {
    console.error(`Document with name ${documentName} not found.`);
    toast.error("الوثيقة المطلوبة غير موجودة.");
    return;
  }

  document.setValue(updatedFields)
    .then((response: any) => {
      console.log("Data updated successfully:", response);
      toast.success("تم تحديث البيانات بنجاح.");
    })
    .catch((error: any) => {
      console.error("Error updating data:", error);
      toast.error("حدث خطأ أثناء تحديث البيانات.");
    });
}

/**
 * دالة عامة لإنشاء مورد وثيقة معين.
 * @param name - (اختياري) اسم الوثيقة.
 * @returns مورد وثيقة من نوع ResourceDocument<RequestData>
 */
export function useDocumentResource(name: string = ''): ResourceDocument<RequestData> {
  if (!name) {
    console.warn("Document name is not provided.");
  }
  return createDocumentResource<RequestData>({
    doctype: "Verification Instructions Request",
    name: name,
    // auto: true // إذا كنت ترغب في التفعيل التلقائي، قم بإزالة التعليق
  });
}