// محول البيانات: 
// src/data/convertor.ts

import { FormField } from './types';

/**
 * تحقق مما إذا كان الكائن هو FormField.
 * @param value - القيمة للتحقق.
 * @returns boolean
 */
function isFormField(value: any): value is FormField<any> {
  return (
    value &&
    typeof value === 'object' &&
    'value' in value &&
    'isValid' in value &&
    'validationMessage' in value
  );
}

/**
 * محول كائن يحول الحقول الملتفة بـ FormField إلى كائن يحتوي على القيم فقط.
 * يدعم الهياكل المجمعة والمتداخلة مثل المصفوفات والكائنات المتداخلة.
 * @param data - الكائن الذي يحتوي على حقول من نوع FormField أو كائنات أخرى.
 * @returns كائن جديد يحتوي على القيم المستخرجة من FormField.
 */
function objectConvertor<T>(data: T): any {
  if (Array.isArray(data)) {
    return data.map(item => objectConvertor(item));
  } else if (typeof data === 'object' && data !== null) {
    const result: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = (data as any)[key];
        if (isFormField(value)) {
          result[key] = value.value;
        } else if (typeof value === 'object' && value !== null) {
          result[key] = objectConvertor(value);
        } else {
          // إذا كان الحقل ليس FormField أو كائنًا أو مصفوفة، يتم نقله كما هو
          result[key] = value;
        }
      }
    }
    return result;
  }
  // إذا لم يكن البيانات كائنًا أو مصفوفة، يتم إعادتها كما هي
  return data;
}

export default objectConvertor; // التأكد من التصدير كـ default export