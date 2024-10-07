// تعريفات الأنواع (Types):
// src/data/types.ts

// واجهة لحقل النموذج
export interface FormField<T = any> {
  value: T;
  isValid: boolean;
  validationMessage: string;
  touched?: boolean;
}

// باقي التعريفات كما هي...

// تعريفات الخطوات (Step Data)
export interface Step1Data {
  employer_name: FormField<string>;
  first_name: FormField<string>;
  last_name: FormField<string>;
  middle_name?: FormField<string>;
  suffix?: FormField<string>;
  alias_name?: FormField<string>;
  // email_address: FormField<string>;
  // i_agree_to_the_electronic_signature: FormField<boolean>;
  // i_acknowledge_the_above: FormField<boolean>;
}

export interface EducationInformation {
  field_of_study_or_major: string;
  country: string;
  city: string;
  governorate: string;
  location_text: string;
  from_date: string;
  to_date: string;
  phone: string;
  ext: string;
  diploma:boolean;
  another_name:boolean;

}

export interface EmploymentHistory {
  company: FormField<string>;
  name_of_your_employer: FormField<string>;
  contact_the_employer: FormField<string>;
  issuing_salary: FormField<string>;
  country: FormField<string>;
  city: FormField<string>;
  governorate: FormField<string>;
  location_text: FormField<string>;
  continuous: FormField<boolean>;
  from_date: FormField<string>;
  end_date: FormField<string>;
  phone: FormField<string>;
  ext: FormField<string>;
  official_job_title_held_currently: FormField<string>;
  type_of_employment: FormField<string>;
  the_company_has_different_names: FormField<boolean>;
  permission: FormField<boolean>;
  nickname_checkbox: FormField<boolean>;
  different_company_names: FormField<string>;
  nickname: FormField<string>;
}

export interface ProfessionalQualification {
  awarding_body: FormField<string>;
  license_or_certificate_number: FormField<string>;
  issuing_country: FormField<string>; 
  date_awarded: FormField<string>;
  expiration_date: FormField<string>;
  award_name_description: FormField<string>;
  is_an_expiration_date: FormField<boolean>;
  your_name_varies: FormField<boolean>;

}

export interface Step2Data {
  education_information: EducationInformation[];
}

export interface Step3Data {
  employment_history: EmploymentHistory[];
}

export interface Step4Data {
  professional_qualification: ProfessionalQualification[];
}

export interface Step5Data {
  review_comments: FormField<string>;
  // أضف الحقول المطلوبة لمراجعة المعلومات
}

export interface Step6Data {
  full_name: FormField<string>;
  email_address: FormField<string>;
  other_languages: FormField<string[]>;
  electronic_signature: FormField<string>;
  i_agree_to_the_electronic_signature: FormField<boolean>;
  i_acknowledge_the_above: FormField<boolean>;
}

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
  // Step1
  employer_name: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  alias_name?: string;
  email_address: string;
  // Step2 إلى Step6
  education_information: EducationInformation[];
  employment_history: EmploymentHistory[];
  professional_qualification: ProfessionalQualification[];
  review_comments: string;
  full_name: string;
  other_languages: string[];
  // ... أضف الحقول الأخرى حسب الحاجة
}

// واجهة UpdateFields: لتمثيل الحقول المحدثة
export interface UpdateFields {
  [key: string]: any;
}

// تعريف FormData: تجميع بيانات جميع الخطوات
export type FormData = Step1Data &
  Step2Data &
  Step3Data &
  Step4Data &
  Step5Data &
  Step6Data;