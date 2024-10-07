// التحقق من صحة المدخلات: 
// src/data/validateInputStep1.ts
import { Step2Data, ValidationResult } from '../types';

/**
 * دالة للتحقق من صحة مدخلات الخطوة الأولى.
 * تقوم بالتحقق من الحقول المطلوبة والتأكد من صحة البريد الإلكتروني.
 * @param data - بيانات الخطوة الأولى من نوع Step1Data.
 * @returns نتيجة التحقق من صحة الحقول على شكل ValidationResult.
 */
function validateInputStep2(data: Step2Data): ValidationResult {
  const validationResult: ValidationResult = {};

  // قائمة الحقول المطلوبة للتحقق من الفراغ
  const requiredFields: (keyof Step2Data)[] = [
    // 'company',
    // 'name_of_your_employer',
    // 'contact_the_employer',
    // 'issuing_salary',
    // 'country',
    // 'city',
    // 'governorate',
    // 'location_text',
    // 'continuous',
    // 'from_date',
    // 'end_date',
    // 'phone',
    // 'ext',
    // 'official_job_title_held_currently',
    // 'type_of_employment',
    // 'the_company_has_different_names',
    // 'permission',
    // 'nickname_checkbox',
    // 'different_company_names',
    // 'nickname'
    'education_information'

  ];

  requiredFields.forEach((field) => {
    const fieldValue = data['field']?.value;

    // التحقق مما إذا كان الحقل فارغاً حسب نوعه
    if (
      (typeof fieldValue === 'string' && !fieldValue.trim()) ||
      (typeof fieldValue === 'boolean' && !fieldValue)
    ) {
      validationResult[field] = {
        isValid: false,
        validationMessage: 'هذا الحقل مطلوب.',
      };
    // } else {
    //   // في حالة البريد الإلكتروني، نحتاج إلى التحقق من صحته
    //   if (field === 'email_address') {
    //     if (!isValidEmail(fieldValue)) {
    //       validationResult[field] = {
    //         isValid: false,
    //         validationMessage: 'عنوان البريد الإلكتروني غير صالح.',
    //       };
    //       return;
    //     }
    //   }

    //   // إذا كان الحقل صالحاً
    //   validationResult[field] = { isValid: true };
    }
  });

  return validationResult;
}

/**
 * دالة التحقق من صحة عنوان البريد الإلكتروني باستخدام تعبير نمطي.
 * @param email - عنوان البريد الإلكتروني للتحقق منه.
 * @returns `true` إذا كان البريد الإلكتروني صالحاً، وإلا `false`.
 */
// function isValidEmail(email: string): boolean {
//   // تعبير نمطي للتحقق من صحة البريد الإلكتروني
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

export default validateInputStep2;