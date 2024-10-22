// src/data/types.ts

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

export interface PhoneNumber {
  id: string;
  phone: string;
}

export interface AliasName {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
}

export interface Step1Data {
  employer_name: FormField<string>;
  first_name: FormField<string>;
  last_name: FormField<string>;
  dont_middle_name: FormField<boolean>;
  middle_name: FormField<string>;
  this_is_my_name_column: FormField<boolean>;
  suffix: FormField<string>;
  alias_name: AliasName[];
  country_now: FormField<string>;
  city: FormField<string>;
  governorate: FormField<string>;
  zip_code: FormField<string>;
  location_text: FormField<string>;
  street_address: FormField<string>;
  date_living_address: FormField<string>;
  phone: PhoneNumber[];  
  email: FormField<string>;
  date_of_birth: FormField<string>;
}

export interface EducationInformation {
  id: string;
  name_of_school_or_college_university: string;
  country: string;
  city: string;
  governorate: string;
  location_text: string;
  from_date: string;
  to_date: string;
  field_of_study_or_major: string;
  phone: string;
  ext: string;
  diploma: string;
  another_name: string;
}

export interface EmploymentHistory {
  id: string;
  company: string;
  name_of_your_employer: string;
  contact_the_employer: boolean;
  issuing_salary: boolean;
  country: string;
  city: string;
  governorate: string;
  location_text: string;
  continuous: boolean;
  activity_has_stopped: boolean;
  from_date: string;
  end_date: string;
  phone: string;
  ext: string;
  official_job_title_held_currently: string;
  type_of_employment: string;
  the_company_has_different_names: boolean;
  different_company_names: string;
  you_have_a_nicknamecx: boolean;
  nickname: string;
  file: File | string | null; // دعم كائن File أو رابط الملف (string)
}

export interface ProfessionalQualification {
  id: string;
  awarding_body: string;
  license_or_certificate_number: string;
  issuing_country: string;
  date_awarded: string;
  expiration_date?: string; // اختياري
  award_name_description: string;
  is_an_expiration_date: boolean;
  your_name_varies: boolean;
}

export interface Step2Data {
  educationInformation: EducationInformation[];
}

export interface Step3Data {
  employment_history: EmploymentHistory[];
}

export interface Step4Data {
  professional_qualification: ProfessionalQualification[];
}

export interface Step6Data {
  other_languages: FormField<string[]>; // تصحيح النوع إلى string[]
  electronic_signature: FormField<string>;
  full_name: FormField<string>;
  email_address: FormField<string>;
  i_agree_to_the_electronic_signature: FormField<boolean>;
  i_acknowledge_the_above: FormField<boolean>; // إضافة هذا الحقل
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
  dont_middle_name: boolean;
  middle_name: string;
  this_is_my_name_column: boolean;
  suffix: string;
  alias_name: AliasName[];
  city: string;
  country_now: string;
  governorate: string;
  zip_code: string;
  location_text: string;
  street_address: string;
  date_living_address: string;
  phone: PhoneNumber[];
  email: string;
  date_of_birth: string;
  // Step2
  education_information: EducationInformation[];
  // Step3
  employment_history: EmploymentHistory[];
  // Step4
  professional_qualification: ProfessionalQualification[];
  // Step6
  other_languages: string[];
  electronic_signature: string;
  full_name: string;
  email_address: string;
  i_agree_to_the_electronic_signature: boolean;
  i_acknowledge_the_above: boolean; // إضافة هذا الحقل
}

// واجهة UpdateFields: لتمثيل الحقول المحدثة
export interface UpdateFields {
  [key: string]: any;
}

export type FormData = {
  home: HomeData &
    Step1Data &
    Step2Data &
    Step3Data &
    Step4Data &
    Step6Data;
};