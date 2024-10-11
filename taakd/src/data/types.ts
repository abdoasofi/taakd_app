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

export interface Step1Data {
  employer_name: FormField<string>;
  first_name: FormField<string>;
  last_name: FormField<string>;
  middle_name: FormField<string>;
  suffix: FormField<string>;
  alias_name: FormField<[]>;
  country_now: FormField<string>;
  city: FormField<string>;
  governorate: FormField<string>;
  zip_code: FormField<string>;
  location_text: FormField<string>;
  street_address: FormField<string>;
  date_living_address: FormField<string>;
  phone: FormField<[]>;
  email: FormField<string>;
  date_of_birth: FormField<string>;
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
  // Step1
  employer_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  alias_name: [];
  city: string;
  country_now: string;
  governorate: string;
  zip_code: string;
  location_text: string;
  street_address: string;
  date_living_address: string;
  phone: [];
  email: string;
  date_of_birth: string
  //  Step2

}

// واجهة UpdateFields: لتمثيل الحقول المحدثة
export interface UpdateFields {
  [key: string]: any;
}

// تعريف FormData: تجميع بيانات جميع الخطوات
export type FormData = {
  home: HomeData &
  Step1Data;

};