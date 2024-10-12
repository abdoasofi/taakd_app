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
  file: any; // يُفضل تحديد نوع البيانات إذا كان ممكنًا
}

export interface Step2Data {
  educationInformation: EducationInformation[];
}

export interface Step3Data {
  employment_history: EmploymentHistory[];
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
  date_of_birth: string;
  // Step2
  education_information: EducationInformation[];
  // Step3
  employment_history: EmploymentHistory[];
}

// واجهة UpdateFields: لتمثيل الحقول المحدثة
export interface UpdateFields {
  [key: string]: any;
}

export type FormData = {
  home: HomeData &
    Step1Data &
    Step2Data &
    Step3Data;
};