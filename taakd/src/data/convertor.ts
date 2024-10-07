// محول البيانات: 
// src/data/convertor.ts

import { FormField } from './types';

/**
 * محول كائن يحول الحقول الملتفة بـ FormField إلى كائن يحتوي على القيم فقط.
 * @param data - الكائن الذي يحتوي على حقول من نوع FormField.
 * @returns كائن جديد يحتوي على القيم المستخرجة من FormField.
 */
function objectConvertor<T extends { [key: string]: FormField<any> }>(
  data: T
): { [K in keyof T]: T[K]['value'] } {
  return Object.keys(data).reduce((result, key) => {
    const typedKey = key as keyof T;
    const field = data[typedKey];

    if (field && 'value' in field) {
      return { ...result, [typedKey]: field.value };
    } else {
      console.warn(`الحقل "${key}" لا يحتوي على خاصية "value".`);
      return result;
    }
  }, {} as { [K in keyof T]: T[K]['value'] });
}

export default objectConvertor; // التأكد من التصدير كـ default export