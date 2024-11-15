// src/data/request.ts
import { createListResource, createDocumentResource, ResourceList, ResourceDocument } from 'frappe-ui';
import { session } from './session';
import { RequestData, UpdateFields } from './types';
import axios from 'axios';

/**
 * واجهة خيارات إنشاء مورد القائمة
 */
interface CreateListResourceOptions {
  doctype: string;
  fields: string[];
  filters: { [key: string]: any };
  auto: boolean;
  orderBy:string,
  pageLength: number;
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

  const options: CreateListResourceOptions = {
    doctype: 'Verification Instructions Request',
    fields,
    filters: { user_id: session.user },
    auto: true,
    orderBy:'',
    pageLength: 1,
  };

  return createListResource<RequestData>(options);
}

/**
 * إنشاء مورد قائمة لجميع طلبات Verification Instructions Request.
 * @param fields - قائمة أسماء الحقول المراد جلبها.
 * @returns مورد قائمة من نوع ResourceList<RequestData>
 */
export async function createAllRequestsList(fields: string[]): Promise<RequestData[]> {
  if (!session.user) {
    throw new Error("User session is not available.");
  }

  try {
    const response = await axios.get('/api/resource/Verification Instructions Request', {
      params: {
        fields: JSON.stringify(fields),
        filters: JSON.stringify({ user_id: session.user }),
        order_by: 'creation desc',
        page_length: 100, // تعيين إلى قيمة كبيرة لضمان جلب السجلات
      },
    });

    console.log("Fetched requests:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
}
/**
 * تحديث الحقول في مورد القائمة `Verification Instructions Request`.
 * @param requestList - مورد القائمة المراد تحديثه.
 * @param updatedFields - كائن يحتوي على الحقول المراد تحديثها.
 * @returns Promise<void>
 */
export async function updateFieldsInRequestList(
  requestList: ResourceList<RequestData>,
  updatedFields: UpdateFields
): Promise<void> {
  const documentName: string = ''; // يجب تحديد اسم الوثيقة هنا

  const document: ResourceDocument<RequestData> | undefined = requestList.documents.find(doc => doc.name === documentName);

  if (!document) {
    throw new Error(`Document with name ${documentName} not found.`);
  }

  try {
    await document.setValue(updatedFields);
  } catch (error) {
    throw new Error(`Error updating data: ${error}`);
  }
}

/**
 * إنشاء مورد وثيقة معين.
 * @param name - (اختياري) اسم الوثيقة.
 * @returns ResourceDocument<RequestData>
 */
export function getDocumentResource(name: string = ''): ResourceDocument<RequestData> {
  if (!name) {
    console.warn("Document name is not provided.");
  }
  return createDocumentResource<RequestData>({
    doctype: "Verification Instructions Request",
    name: name,
  });
}