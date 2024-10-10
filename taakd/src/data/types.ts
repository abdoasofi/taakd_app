// تعريفات الأنواع (Types):
/// src/data/types.ts

// واجهة لحقل النموذج
export interface FormField<T = any> {
  value: T;
  isValid: boolean;
  validationMessage: string;
  touched?: boolean;
}

// واجهات البيانات لكل خطوة
export interface HomeData {
  country: FormField<string>;
  mobile_number: FormField<string>;
  is_degree_or_diploma: FormField<boolean>;
  from_time: FormField<string>;
  to_time: FormField<string>;
}
// واجهة لنتائج التحقق
export interface ValidationResult {
  [key: string]: {
    isValid: boolean;
    validationMessage?: string;
  };
}

// واجهة RequestData: تمثل مجموعة كافة البيانات من الخطوات (للإرسال إلى الخادم)
export interface RequestData {
  name: string;
  user_id: string;
  // Home
  country: string;
  mobile_number: string;
  is_degree_or_diploma: boolean;
  from_time: string;
  to_time: string;

}

// واجهة UpdateFields: لتمثيل الحقول المحدثة
export interface UpdateFields {
  [key: string]: any;
}

// تعريف FormData: تجميع بيانات جميع الخطوات
export type FormData = {
  home: HomeData;

};