// ملف التخزين (Store):
// src/stores/verificationRequest.ts
// src/stores/verificationRequest.ts
import { defineStore } from 'pinia';
import {
  HomeData,
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
  Step5Data,
  Step6Data,
  RequestData,
  ValidationResult,
} from '../data/types';

interface StepValidation {
  validation: ValidationResult;
}

interface VerificationRequestStoreState {
  documentName: string | null;
  home:HomeData;
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5Data;
  step6: Step6Data;
  validations: StepValidation[];
}

const getDefaultState = (): VerificationRequestStoreState => ({
  documentName: null,
  home: {
    country: { value: '', isValid: false, validationMessage: '' },
    mobile_number: { value: '', isValid: false, validationMessage: '' },
    is_degree_or_diploma: { value: false, isValid: false, validationMessage: '' },
    from_time: { value: '', isValid: true, validationMessage: '' },
    to_time: { value: '', isValid: false, validationMessage: '' },
  },
  step1: {
    employer_name: { value: '', isValid: false, validationMessage: '' },
    first_name: { value: '', isValid: false, validationMessage: '' },
    last_name: { value: '', isValid: false, validationMessage: '' },
    // middle_name: { value: '', isValid: true, validationMessage: '' },
    suffix: { value: '', isValid: true, validationMessage: '' },
    alias_name: { value: '', isValid: true, validationMessage: '' },
    // email_address: { value: '', isValid: false, validationMessage: '' },
    // i_agree_to_the_electronic_signature: { value: false, isValid: false, validationMessage: '' },
    // i_acknowledge_the_above: { value: false, isValid: false, validationMessage: '' },
  },
  step2: {
    education_information: [],
  },
  step3: {
    employment_history: [],
  },
  step4: {
    professional_qualification: [],
  },
  step5: {
    review_comments: { value: '', isValid: true, validationMessage: '' },
    // أضف الحقول المطلوبة لمراجعة المعلومات
  },
  step6: {
    full_name: { value: '', isValid: false, validationMessage: '' },
    email_address: { value: '', isValid: false, validationMessage: '' },
    other_languages: { value: [], isValid: true, validationMessage: '' },
    electronic_signature: { value: '', isValid: false, validationMessage: '' },
    i_agree_to_the_electronic_signature: { value: false, isValid: false, validationMessage: '' },
    i_acknowledge_the_above: { value: false, isValid: false, validationMessage: '' },
  },
  validations: Array.from({ length: 6 }, () => ({ validation: {} })),
});

export const useVerificationRequestStore = defineStore('verificationRequest', {
  state: (): VerificationRequestStoreState => getDefaultState(),
  
  actions: {
    setDocumentName(name: string) {
      console.log("$$$$$$$$$$$$$$",name)
      this.documentName = name;
    },
    // تحديث بيانات الخطوة باستخدام النوع المحدد
    updateStep<T extends keyof VerificationRequestStoreState>(
      step: T,
      data: Partial<VerificationRequestStoreState[T]>
    ) {
      this[step] = { ...this[step], ...data };
    },
    // تحديث التحقق من خطوات معينة
    updateValidation(stepIndex: number, validation: ValidationResult) {
      if (stepIndex >= 0 && stepIndex < this.validations.length) {
        this.validations[stepIndex].validation = validation;
      }
    },
    // إعادة تعيين المتجر إلى الحالة الافتراضية
    resetStore() {
      Object.assign(this, getDefaultState());
    },
    // تحديث حقل معين في Step1 باستخدام FormField
    // updateStep1Field<K extends keyof Step1Data>(field: K, value: Step1Data[K]['value']) {
    //   if (this.step1[field]) {
    //     this.step1[field].value = value;
    //     // يمكنك إضافة منطق للتحقق من صحة الحقل هنا إذا لزم الأمر
    //   }
    // },
    // تحديث حقل معين في Step6 باستخدام FormField
    updateStep6Field<K extends keyof Step6Data>(field: K, value: Step6Data[K]['value']) {
      if (this.step6[field]) {
        this.step6[field].value = value;
        // يمكنك إضافة منطق للتحقق من صحة الحقل هنا إذا لزم الأمر
      }
    },
    // يمكنك إضافة إجراءات مماثلة للخطوات الأخرى إذا لزم الأمر

       // تحديث حقل معين في Home باستخدام FormField
       updateSHomeField<K extends keyof HomeData>(field: K, value: HomeData[K]['value']) {
        if (this.home[field]) {
          this.home[field].value = value;
          // يمكنك إضافة منطق للتحقق من صحة الحقل هنا إذا لزم الأمر
        }
      },
  },
});