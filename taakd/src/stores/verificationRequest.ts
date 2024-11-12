  // src/stores/verificationRequest.ts
  import { defineStore } from 'pinia';
  import {
    HomeData,
    Step1Data,
    Step2Data,
    Step3Data,
    Step4Data,
    Step6Data,
    RequestData,
    ValidationResult,
    UpdateFields,
    EmploymentHistory,
  } from '../data/types';
  import { createDocumentResource } from 'frappe-ui';
  import { useToast } from 'vue-toastification';
  import axios from 'axios';

  interface StepValidation {
    validation: ValidationResult;
  }

  interface VerificationRequestStoreState {
    documentName: string | null;
    isLoding: boolean; // Consider renaming to `isLoading`
    home: HomeData;
    step1: Step1Data;
    step2: Step2Data;
    step3: Step3Data;
    step4: Step4Data;
    step6: Step6Data;
    validations: StepValidation[];
  }

  const getDefaultState = (): VerificationRequestStoreState => ({
    documentName: null,
    isLoding: false,
    home: {
      country: { value: '', isValid: false, validationMessage: '' },
      mobile_number: { value: '', isValid: false, validationMessage: '' },
      is_degree_or_diploma: { value: false, isValid: false, validationMessage: '' },
      from_time: { value: '', isValid: false, validationMessage: '' },
      to_time: { value: '', isValid: false, validationMessage: '' },
    },
    step1: {
      employer_name: { value: '', isValid: false, validationMessage: '' },
      first_name: { value: '', isValid: false, validationMessage: '' },
      last_name: { value: '', isValid: false, validationMessage: '' },
      dont_middle_name: { value: false, isValid: false, validationMessage: '' },
      middle_name: { value: '', isValid: true, validationMessage: '' },
      this_is_my_name_column: { value: false, isValid: false, validationMessage: '' },
      suffix: { value: '', isValid: true, validationMessage: '' },
      alias_name: [], // أسماء المستعارة
      country_now: { value: '', isValid: false, validationMessage: '' },
      city: { value: '', isValid: false, validationMessage: '' },
      governorate: { value: '', isValid: false, validationMessage: '' },
      zip_code: { value: '', isValid: false, validationMessage: '' },
      location_text: { value: '', isValid: false, validationMessage: '' },
      street_address: { value: '', isValid: false, validationMessage: '' },
      date_living_address: { value: '', isValid: false, validationMessage: '' },
      phone: [], // أرقام الهاتف
      email: { value: '', isValid: false, validationMessage: '' },
      date_of_birth: { value: '', isValid: false, validationMessage: '' },
    },
    step2: { 
      educationInformation: [],
    },
    step3: { 
      employment_history: [],
    },
    step4: {
      professional_qualification: [],
    },
    step6: { 
      other_languages: { value: [] as string[], isValid: true, validationMessage: '' },
      electronic_signature: { value: '', isValid: false, validationMessage: '' },
      full_name: { value: '', isValid: false, validationMessage: '' },
      email_address: { value: '', isValid: false, validationMessage: '' },
      i_agree_to_the_electronic_signature: { value: false, isValid: false, validationMessage: '' },
      i_acknowledge_the_above: { value: false, isValid: false, validationMessage: '' },
    },
    validations: Array.from({ length: 5 }, () => ({ validation: {} })),
  });

  // دالة مساعدة للتحقق من ملء الحقول
  function isFieldFilled(value: any): boolean {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'boolean') {
      return value === true;
    }
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    if (value instanceof File) {
      return true;
    }
    // إضافة المزيد من الشروط إذا لزم الأمر
    return false;
  }

// تعريف الحقول الإلزامية لكل مرحلة
const STEPS_MANDATORY_FIELDS: Record<number, Array<string>> = {
  1: [
    'employer_name',
    'first_name',
    'last_name',
    'zip_code',
    'location_text',
    'date_living_address',
    'email',
    'date_of_birth',
  ],
  2: [
    'name_of_school_or_college_university',
    'country',
    'city',
    'governorate',
    'from_date',
    // 'end_date',
    'phone',
  ],
  3: [
    'company',
    'name_of_your_employer',
    'country',
    'city',
    'governorate',
    'from_date',
    'end_date',
    'phone',
    'official_job_title_held_currently',
  ],
  4: [
    'awarding_body',
    'license_or_certificate_number',
    'issuing_country',
    'date_awarded',
    'award_name_description',
  ],
  6: [
    'full_name',
    'email_address',
    'i_agree_to_the_electronic_signature',
    'i_acknowledge_the_above',
  ],
};
  export const useVerificationRequestStore = defineStore('verificationRequest', {
    state: (): VerificationRequestStoreState => getDefaultState(),

    getters: {
      /**
       * حساب نسب الإنجاز لكل مرحلة كـ Record<number, number>.
       */
      stepsCompletionPercentage(state): Record<number, number> {
        const percentages: Record<number, number> = {};
        // المرور على كل مرحلة
        for (const [step, mandatoryFields] of Object.entries(STEPS_MANDATORY_FIELDS)) {
          const stepNumber = parseInt(step);
          let filledFields = 0;
          let totalFields = 0;
    
          // تحديد ما إذا كانت المرحلة تحتوي على مصفوفة أم لا
          if (stepNumber === 2) { // Step2: educationInformation
            const entries = state.step2.educationInformation;
            if (entries.length === 0) {
              // لا توجد مدخلات، نسبة الإنجاز 0%
              percentages[stepNumber] = 0;
            } else {
              entries.forEach(entry => {
                mandatoryFields.forEach(field => {
                  totalFields++;
                  const value = entry[field as keyof typeof entry];
                  if (isFieldFilled(value)) {
                    filledFields++;
                  }
                });
              });
              percentages[stepNumber] = Math.round((filledFields / totalFields) * 100);
            }
          }
          else if (stepNumber === 3) { // Step3: employment_history
            const entries = state.step3.employment_history;
            if (entries.length === 0) {
              percentages[stepNumber] = 0;
            } else {
              entries.forEach(entry => {
                mandatoryFields.forEach(field => {
                  totalFields++;
                  const value = entry[field as keyof typeof entry];
                  if (isFieldFilled(value)) {
                    filledFields++;
                  }
                });
              });
              percentages[stepNumber] = Math.round((filledFields / totalFields) * 100);
            }
          }
          else if (stepNumber === 4) { // Step4: professional_qualification
            const entries = state.step4.professional_qualification;
            if (entries.length === 0) {
              percentages[stepNumber] = 0;
            } else {
              entries.forEach(entry => {
                mandatoryFields.forEach(field => {
                  totalFields++;
                  const value = entry[field as keyof typeof entry];
                  if (isFieldFilled(value)) {
                    filledFields++;
                  }
                });
              });
              percentages[stepNumber] = Math.round((filledFields / totalFields) * 100);
            }
          }
          else { // Steps 1 and 6
            const stepData = (state as any)[`step${stepNumber}`];
            mandatoryFields.forEach((field: string) => {
              totalFields++;
              const value = stepData[field].value;
              if (isFieldFilled(value)) {
                filledFields++;
              }
            });
            percentages[stepNumber] = Math.round((filledFields / totalFields) * 100);
          }
        }
        return percentages;
      },
    
      /**
       * حساب النسبة الكلية للإنجاز
       */
      overallCompletionPercentage(state): number {
        let filledFields = 0;
        let totalFields = 0;
    
        for (const [step, mandatoryFields] of Object.entries(STEPS_MANDATORY_FIELDS)) {
          const stepNumber = parseInt(step);
    
          if (stepNumber === 2) { // Step2: educationInformation
            const entries = state.step2.educationInformation;
            if (entries.length === 0) {
              // لا توجد مدخلات، لا يتم حساب الحقول
              continue;
            }
            entries.forEach(entry => {
              mandatoryFields.forEach(field => {
                totalFields++;
                const value = entry[field as keyof typeof entry];
                if (isFieldFilled(value)) {
                  filledFields++;
                }
              });
            });
          }
          else if (stepNumber === 3) { // Step3: employment_history
            const entries = state.step3.employment_history;
            if (entries.length === 0) {
              continue;
            }
            entries.forEach(entry => {
              mandatoryFields.forEach(field => {
                totalFields++;
                const value = entry[field as keyof typeof entry];
                if (isFieldFilled(value)) {
                  filledFields++;
                }
              });
            });
          }
          else if (stepNumber === 4) { // Step4: professional_qualification
            const entries = state.step4.professional_qualification;
            if (entries.length === 0) {
              continue;
            }
            entries.forEach(entry => {
              mandatoryFields.forEach(field => {
                totalFields++;
                const value = entry[field as keyof typeof entry];
                if (isFieldFilled(value)) {
                  filledFields++;
                }
              });
            });
          }
          else { // Steps 1 and 6
            const stepData = (state as any)[`step${stepNumber}`];
            mandatoryFields.forEach((field: string) => {
              totalFields++;
              const value = stepData[field].value;
              if (isFieldFilled(value)) {
                filledFields++;
              }
            });
          }
        }
    
        if (totalFields === 0) return 0;
    
        return Math.round((filledFields / totalFields) * 100);
      },
    },
    actions: {
      setDocumentName(name: string) {
        this.documentName = name;
      },

      async loadDocument() {
        const toast = useToast();
        try {
          await this.loadHomeFields();
          await this.loadStep1Fields();
          await this.loadStep2Fields();
          await this.loadStep3Fields();
          await this.loadStep4Fields();
          await this.loadStep6Fields(); 
        } catch (error) {
          console.error("Error loading document:", error);
          toast.error("حدث خطأ أثناء تحميل الوثيقة.");
        }
      },
      // إضافة اسم مستعار جديد

      updateHome<K extends keyof VerificationRequestStoreState['home']>(
        field: K,
        payload: Partial<VerificationRequestStoreState['home'][K]>
      ) {
        this.home[field] = { ...this.home[field], ...payload };
      },

      updateStep1<K extends keyof VerificationRequestStoreState['step1']>(
        field: K,
        payload: Partial<VerificationRequestStoreState['step1'][K]>
      ) {
        this.step1[field] = { ...this.step1[field], ...payload };
      },

      updateStep2<K extends keyof VerificationRequestStoreState['step2']>(
        field: K,
        payload: Partial<VerificationRequestStoreState['step2'][K]>
      ) {
        this.step2[field] = { ...this.step2[field], ...payload };
      },

      updateStep3<K extends keyof VerificationRequestStoreState['step3']>(
        field: K,
        payload: Partial<VerificationRequestStoreState['step3'][K]>
      ) {
        this.step3[field] = { ...this.step3[field], ...payload };
      },

      updateStep4<K extends keyof VerificationRequestStoreState['step4']>(
        field: K,
        payload: Partial<VerificationRequestStoreState['step4'][K]>
      ) {
        this.step4[field] = { ...this.step4[field], ...payload };
      },

      updateStep6<K extends keyof VerificationRequestStoreState['step6']>(
        field: K,
        payload: Partial<VerificationRequestStoreState['step6'][K]>
      ) {
        this.step6[field] = { ...this.step6[field], ...payload };
      },

      resetStore() {
        Object.assign(this, getDefaultState());
      },

      addPhoneNumber() {
        this.step1.phone.push({ id: `${Date.now()}`, phone: '' });
      },

      removePhoneNumber(index: number) {
        this.step1.phone.splice(index, 1);
      },

      validatePhoneNumbers(): boolean {
        let isValid = true;
        this.step1.phone.forEach((phone, index) => {
          if (!phone.phone || phone.phone.trim() === '') {
            isValid = false;
            // يجب تعريف واجهة PhoneNumber لتشمل isValid
            this.step1.phone[index].isValid = false;
          } else {
            this.step1.phone[index].isValid = true;
          }
        });
        return isValid;
      },

      updatePhoneNumber(index: number, value: { phone: string; }) {
        this.step1.phone[index] = value; // تصحيح الوصول إلى حقل phone
      },

      updateAliasName(index: number, value: { first_name: string; last_name: string; middle_name: string }) {
        this.step1.alias_name[index] = value;
      },
  
      async updateDocumentFields(updatedFields: UpdateFields) {
        const toast = useToast();
        if (!this.documentName) {
          toast.error("لم يتم العثور على اسم الوثيقة. يرجى إنشاء وثيقة أولاً.");
          return;
        }
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          await request.setValue.submit(updatedFields);
          toast.success("تم تحديث الوثيقة بنجاح.");
        } catch (error) {
          console.error("Error updating document fields:", error);
          toast.error("حدث خطأ أثناء تحديث الوثيقة.");
          throw new Error('Error updating document fields');
        }
      },

      validateStep1(): boolean {
        let isValid = true;
        const requiredFields: (keyof Step1Data)[] = [
          'employer_name',
          'first_name',
          'last_name',
          'zip_code',
          'location_text',
          'date_living_address',
          'email',
          'date_of_birth',
        ];

        requiredFields.forEach((field) => {
          const fieldData = this.step1[field];
          if (!fieldData.value || (Array.isArray(fieldData.value) && fieldData.value.length === 0)) {
            this.updateStep1(field, {
              isValid: false,
              validationMessage: 'هذا الحقل مطلوب.',
            });
            isValid = false;
          } else {
            this.updateStep1(field, {
              isValid: true,
              validationMessage: '',
            });
          }
        });

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.step1.email.value && !emailPattern.test(this.step1.email.value)) {
          this.updateStep1('email', {
            isValid: false,
            validationMessage: 'يرجى إدخال بريد إلكتروني صحيح.',
          });
          isValid = false;
        } else if (this.step1.email.value) {
          this.updateStep1('email', {
            isValid: true,
            validationMessage: '',
          });
        }

        return isValid;
      },
      
      /**
       * دالة التحقق من صحة بيانات Step 2
       */
      validateStep2(): boolean {
        let isValid = true;
        this.step2.educationInformation.forEach((education, index) => {
          if (
            !education.name_of_school_or_college_university ||
            !education.country ||
            !education.city ||
            !education.governorate ||
            !education.from_date ||
            !education.end_date ||
            !education.phone 
          ) {
            isValid = false;
            // يمكنك إضافة رسائل تحقق خاصة لكل حقل إذا لزم الأمر
          }
        });
        return isValid;
      },

      /**
       * دالة التحقق من صحة بيانات Step 3
       */
      validateStep3(): boolean {
        let isValid = true;
        this.step3.employment_history.forEach((employment, index) => {
          if (
            !employment.company ||
            !employment.name_of_your_employer ||
            !employment.country ||
            !employment.city ||
            !employment.governorate ||
            !employment.from_date ||
            !employment.end_date ||
            !employment.phone ||
            !employment.official_job_title_held_currently 
          ) {
            isValid = false;
            // يمكنك إضافة رسائل تحقق خاصة لكل حقل إذا لزم الأمر
          }
        });
        return isValid;
      },

      /**
       * دالة التحقق من صحة بيانات Step 4
       */
      validateStep4(): boolean {
        let isValid = true;
        this.step4.professional_qualification.forEach((qualification, index) => {
          if (
            !qualification.awarding_body ||
            !qualification.license_or_certificate_number ||
            !qualification.issuing_country ||
            !qualification.date_awarded ||
            !qualification.award_name_description
          ) {
            isValid = false;
          }

          if (qualification.is_an_expiration_date && (!qualification.expiration_date || qualification.expiration_date.trim() === '')) {
            isValid = false;
          }
        });
        return isValid;
      },

      /**
       * دالة التحقق من صحة بيانات Step6
       */
      validateStep6(): boolean {
        let isValid = true;
        const requiredFields: (keyof Step6Data)[] = [
          'full_name',
          'email_address',
          'i_agree_to_the_electronic_signature',
          'i_acknowledge_the_above',
        ];
        
        requiredFields.forEach((field) => {
          const fieldData = this.step6[field];
          if (fieldData.value === false || !fieldData.value || (Array.isArray(fieldData.value) && fieldData.value.length === 0)) {
            this.updateStep6(field, {
              isValid: false,
              validationMessage: 'هذا الحقل مطلوب.',
            });
            isValid = false;
          } else {
            this.updateStep6(field, {
              isValid: true,
              validationMessage: '',
            });
          }
        });

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.step6.email_address.value && !emailPattern.test(this.step6.email_address.value)) {
          this.updateStep6('email_address', {
            isValid: false,
            validationMessage: 'يرجى إدخال بريد إلكتروني صحيح.',
          });
          isValid = false;
        } else if (this.step6.email_address.value) {
          this.updateStep6('email_address', {
            isValid: true,
            validationMessage: '',
          });
        }

        // التحقق من التوقيع الإلكتروني والموافقة
        if (!this.step6.electronic_signature.value) {
          this.updateStep6('electronic_signature', {
            isValid: false,
            validationMessage: 'التوقيع الإلكتروني مطلوب.',
          });
          isValid = false;
        } else {
          this.updateStep6('electronic_signature', {
            isValid: true,
            validationMessage: '',
          });
        }

        if (!this.step6.i_agree_to_the_electronic_signature.value) {
          this.updateStep6('i_agree_to_the_electronic_signature', {
            isValid: false,
            validationMessage: 'يجب الموافقة على التوقيع الإلكتروني.',
          });
          isValid = false;
        } else {
          this.updateStep6('i_agree_to_the_electronic_signature', {
            isValid: true,
            validationMessage: '',
          });
        }

        if (!this.step6.i_acknowledge_the_above.value) {
          this.updateStep6('i_acknowledge_the_above', {
            isValid: false,
            validationMessage: 'يجب تأكيد التوقيع الإلكتروني.',
          });
          isValid = false;
        } else {
          this.updateStep6('i_acknowledge_the_above', {
            isValid: true,
            validationMessage: '',
          });
        }

        return isValid;
      },

      async saveStep1() {
        const toast = useToast();
      
        // تحقق من صلاحية البيانات
        // if (!this.validateStep1()) {
        //   toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        //   throw new Error('Validation failed');
        // }
        const aliasNameToSubmit: UpdateFields = {
          alias_name: this.step1.alias_name, 
        };
        const phoneToSubmit: UpdateFields = {
          phone: this.step1.phone, 
        };
        const dataToSubmit: UpdateFields = {};
      
        for (const key in this.step1) {
          if (Object.prototype.hasOwnProperty.call(this.step1, key)) {
            const field = key as keyof Step1Data;
            dataToSubmit[key] = this.step1[field].value;
          }
        }
      
        try {
          await this.updateDocumentFields(dataToSubmit);
          await this.updateDocumentFields(aliasNameToSubmit);
          await this.updateDocumentFields(phoneToSubmit);
          toast.success('تم حفظ البيانات بنجاح.');
        } catch (error) {
          throw error;
        }
      },

      /**
       * دالة الحفظ لخطوة Step2
       */
      async saveStep2() {
        const toast = useToast();
        // if (!this.validateStep2()) {
        //   toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        //   throw new Error('Validation failed');
        // }

        const dataToSubmit: UpdateFields = {
          education_information: this.step2.educationInformation,
        };
        console.log("Data to Submit for Step2:", dataToSubmit)

        try {
          await this.updateDocumentFields(dataToSubmit);
          toast.success('تم حفظ بيانات التعليم بنجاح.');
        } catch (error) {
          throw error;
        }
      },

      /**
       * دالة الحفظ لخطوة Step3
       */
      async saveStep3() {
        this.isLoding = true;
        const toast = useToast();
        // if (!this.validateStep3()) {
        //   toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        //   this.isLoding = false;
        //   throw new Error('Validation failed');
        // }

        // معالجة رفع الملفات أولاً
        const uploadPromises = this.step3.employment_history.map(async (employment, index) => {
          if (employment.file instanceof File) { // تحقق إذا كان الملف كائن File
            try {
              const uploadedFile = await this.uploadFile(employment.employment_id, employment.file); // استخدام employment_id
              employment.file = uploadedFile.file_url; // تخزين رابط الملف المرفوع
            } catch (error) {
              toast.error(`فشل رفع الملف للسجل رقم ${index + 1}.`);
              throw new Error(`File upload failed for employment index ${index}`);
            }
          }
        });

        // انتظار رفع جميع الملفات
        try {
          await Promise.all(uploadPromises);
        } catch (error) {
          console.error('Error uploading files:', error);
          this.isLoding = false;
          throw error;
        }

        // تجهيز البيانات للإرسال بعد رفع الملفات
        const dataToSubmit: UpdateFields = {
          employment_history: this.step3.employment_history.map(employment => ({
            employment_id: employment.employment_id, // تأكد من تضمين employment_id
            company: employment.company,
            name_of_your_employer: employment.name_of_your_employer,
            contact_the_employer: employment.contact_the_employer,
            issuing_salary: employment.issuing_salary,
            country: employment.country,
            city: employment.city,
            governorate: employment.governorate,
            location_text: employment.location_text,
            continuous: employment.continuous,
            activity_has_stopped: employment.activity_has_stopped,
            from_date: employment.from_date,
            end_date: employment.end_date,
            phone: employment.phone,
            ext: employment.ext,
            official_job_title_held_currently: employment.official_job_title_held_currently,
            type_of_employment: employment.type_of_employment,
            the_company_has_different_names: employment.the_company_has_different_names,
            different_company_names: employment.different_company_names,
            you_have_a_nicknamecx: employment.you_have_a_nicknamecx,
            nickname: employment.nickname,
            file: employment.file, // الآن يجب أن يكون الرابط النصي للملف
          })),
        };

        // حفظ بيانات التوظيف إلى الـ Doctype
        try {
          console.log("Data to Submit for Step3:", dataToSubmit);
          await this.updateDocumentFields(dataToSubmit);
          toast.success('تم حفظ بيانات التوظيف بنجاح.');
        } catch (error) {
          console.error('حدث خطأ أثناء حفظ بيانات التوظيف:', error);
          toast.error('حدث خطأ أثناء حفظ بيانات التوظيف.');
          throw error;
        } finally {
          this.isLoding = false; // تعيين isLoading هنا بعد انتهاء جميع العمليات
        }
      },

      /**
       * دالة الحفظ لخطوة Step4
       */
      async saveStep4() {
        const toast = useToast();
        // if (!this.validateStep4()) {
        //   toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        //   throw new Error('Validation failed');
        // }

        const dataToSubmit: UpdateFields = {
          professional_qualification: this.step4.professional_qualification,
        };

        try {
          await this.updateDocumentFields(dataToSubmit);
          toast.success('تم حفظ بيانات المؤهلات المهنية الإضافية بنجاح.');
        } catch (error) {
          console.error('حدث خطأ أثناء حفظ بيانات المؤهلات المهنية الإضافية:', error);
          toast.error('حدث خطأ أثناء حفظ بيانات المؤهلات المهنية الإضافية.');
          throw error;
        }
      },  
      
      /**
       * دالة الحفظ لخطوة Step6
       */
      async saveStep6() {
        const toast = useToast();
        // التحقق من صحة البيانات
        // if (!this.validateStep6()) {
        //   toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        //   throw new Error('Validation failed');
        // }

        // تجهيز البيانات للإرسال
        const dataToSubmit: UpdateFields = {};
        for (const key in this.step6) {
          if (Object.prototype.hasOwnProperty.call(this.step6, key)) {
            const field = key as keyof Step6Data;
            dataToSubmit[key] = this.step6[field].value;
          }
        }
        // إرسال البيانات إلى Doctype
        try {
          await this.updateDocumentFields(dataToSubmit);
          toast.success('تم حفظ البيانات بنجاح.');
        } catch (error) {
          throw error;
        }
      }, 

      /**
       * دالة تحميل الملف إلى الـ Doctype
       * @param employmentId معرف التوظيف (employment_id)
       * @param file الملف الذي سيتم تحميله
       */
      async uploadFile(employmentId: string, file: File) {
        if (!this.documentName) {
          throw new Error('Document name is not set.');
        }

        const formData = new FormData();
        formData.append('filedata', file);
        formData.append('doctype', 'Verification Instructions Request');
        formData.append('docname', this.documentName);
        formData.append('fieldname', 'file'); // تأكد من أن الحقل هو 'file' داخل الجدول الفرعي
        formData.append('parentfield', 'employment_history'); // اسم جدول التوظيف الفرعي
        formData.append('parenttype', 'Verification Instructions Request');
        formData.append('employment_id', employmentId); // لربط الملف بسجل التوظيف المحدد

        try {
          const response = await axios.post(
            '/api/method/taakd_app.taakd_app.doctype.verification_instructions_request.verification_instructions_request.upload_verification_file', // استبدل 'taakd_app' باسم تطبيقك الفعلي
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          return response.data; // تأكد من المسار الصحيح للملف في الاستجابة
        } catch (error) {
          console.error('Error uploading file:', error);
          throw error;
        }
      },

      async loadHomeFields() {
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          const data = await request.reload();
          // تحديث الحقول في Home
          this.updateHome('country', { value: data.country });
          this.updateHome('mobile_number', { value: data.mobile_number });
          this.updateHome('is_degree_or_diploma', { value: data.is_degree_or_diploma });
          this.updateHome('from_time', { value: data.from_time });
          this.updateHome('to_time', { value: data.to_time });
        } catch (error) {
          console.error("Error loading Home fields:", error);
          const toast = useToast();
          toast.error("حدث خطأ أثناء تحميل بيانات الحقول الرئيسية.");
        }
      },

      async loadStep1Fields() {
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          const data = await request.reload();
          
          this.updateStep1('employer_name', { value: data.employer_name });
          this.updateStep1('first_name', { value: data.first_name });
          this.updateStep1('last_name', { value: data.last_name });
          this.updateStep1('dont_middle_name', { value: data.dont_middle_name });
          this.updateStep1('middle_name', { value: data.middle_name });
          this.updateStep1('this_is_my_name_column', { value: data.this_is_my_name_column });
          this.updateStep1('suffix', { value: data.suffix });
          this.updateStep1('country_now', { value: data.country_now });
          this.updateStep1('city', { value: data.city });
          this.updateStep1('governorate', { value: data.governorate });
          this.updateStep1('zip_code', { value: data.zip_code });
          this.updateStep1('location_text', { value: data.location_text });
          this.updateStep1('street_address', { value: data.street_address });
          this.updateStep1('date_living_address', { value: data.date_living_address });
          this.updateStep1('email', { value: data.email });
          this.updateStep1('date_of_birth', { value: data.date_of_birth });

          // تحميل الحقول الفرعية مثل alias_name و phone إذا كانت موجودة
          if (data.alias_name && Array.isArray(data.alias_name)) {
            this.step1.alias_name = data.alias_name;
          }

          if (data.phone && Array.isArray(data.phone)) {
            this.step1.phone = data.phone;
          }
          this.validations = data.validations || this.validations; // تحديث التحققات إذا كانت موجودة      
        } catch (error) {
          console.error("Error loading Step1 fields:", error);
          const toast = useToast();
          toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الأولى.");
        }
      },

      async loadStep2Fields() {
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          const data = await request.reload();
          this.step2.educationInformation = data.education_information;
        } catch (error) {
          console.error("Error loading Step2 fields:", error);
          const toast = useToast();
          toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الثانية.");
        }
      },

      async loadStep3Fields() {
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          const data = await request.reload();
          this.step3.employment_history = data.employment_history.map((employment: any) => ({
            employment_id: employment.employment_id || '', // تأكد من تعيين `employment_id`
            company: employment.company || '',
            name_of_your_employer: employment.name_of_your_employer || '',
            contact_the_employer: employment.contact_the_employer || false,
            issuing_salary: employment.issuing_salary || false,
            country: employment.country || '',
            city: employment.city || '',
            governorate: employment.governorate || '',
            location_text: employment.location_text || '',
            continuous: employment.continuous || false,
            activity_has_stopped: employment.activity_has_stopped || false,
            from_date: employment.from_date || '',
            end_date: employment.end_date || '',
            phone: employment.phone || '',
            ext: employment.ext || '',
            official_job_title_held_currently: employment.official_job_title_held_currently || '',
            type_of_employment: employment.type_of_employment || '',
            the_company_has_different_names: employment.the_company_has_different_names || false,
            different_company_names: employment.different_company_names || '',
            you_have_a_nicknamecx: employment.you_have_a_nicknamecx || false,
            nickname: employment.nickname || '',
            file: employment.file || null,
          }));
        } catch (error) {
          console.error("Error loading Step3 fields:", error);
          const toast = useToast();
          toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الثالثة.");
        }
      },

      async loadStep4Fields() {
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          const data = await request.reload();
          this.step4.professional_qualification = data.professional_qualification;
        } catch (error) {
          console.error("Error loading Step4 fields:", error);
          const toast = useToast();
          toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الرابعة.");
        }
      },

      async loadStep6Fields() {
        try {
          const request = createDocumentResource({
            doctype: 'Verification Instructions Request',
            name: this.documentName,
          });
          const data = await request.reload();
          this.updateStep6('other_languages', { value: data.other_languages });
          this.updateStep6('electronic_signature', { value: data.electronic_signature });
          this.updateStep6('full_name', { value: data.full_name });
          this.updateStep6('email_address', { value: data.email_address });
          this.updateStep6('i_agree_to_the_electronic_signature', { value: data.i_agree_to_the_electronic_signature });
          this.updateStep6('i_acknowledge_the_above', { value: data.i_acknowledge_the_above });
        } catch (error) {
          console.error("Error loading Step6 fields:", error);
          const toast = useToast();
          toast.error("حدث خطأ أثناء تحميل بيانات الخطوة السادسة.");
        }
      },
    },
  });