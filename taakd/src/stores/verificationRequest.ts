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
} from '../data/types';
import { createDocumentResource } from 'frappe-ui';
import { ref } from 'vue';
import { createRequestList, updateFieldsInRequestList } from '../data/request';
import { useToast } from 'vue-toastification';

interface StepValidation {
  validation: ValidationResult;
}

interface VerificationRequestStoreState {
  documentName: string | null;
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
    alias_name: [], 
    country_now: { value: '', isValid: false, validationMessage: '' },
    city: { value: '', isValid: false, validationMessage: '' },
    governorate: { value: '', isValid: false, validationMessage: '' },
    zip_code: { value: '', isValid: false, validationMessage: '' },
    location_text: { value: '', isValid: false, validationMessage: '' },
    street_address: { value: '', isValid: false, validationMessage: '' },
    date_living_address: { value: '', isValid: false, validationMessage: '' },
    phone: [],
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
    other_languages:  { value: [], isValid: true, validationMessage: '' },
    electronic_signature: { value: '', isValid: false, validationMessage: '' },
    full_name: { value: '', isValid: false, validationMessage: '' },
    email_address: { value: '', isValid: false, validationMessage: '' },
    i_agree_to_electronic_signature: { value: false, isValid: false, validationMessage: '' },
    acknowledge_electronic_signature: { value: false, isValid: false, validationMessage: '' },
  },
  validations: Array.from({ length: 5 }, () => ({ validation: {} })),
});

export const useVerificationRequestStore = defineStore('verificationRequest', {
  state: (): VerificationRequestStoreState => getDefaultState(),

  actions: {
     // تعيين اسم الوثيقة
    setDocumentName(name: string) {
      this.documentName = name;
    },

    // دالة لتحديث أي حقل في `home`
    updateHome<K extends keyof VerificationRequestStoreState['home']>(
      field: K,
      payload: Partial<VerificationRequestStoreState['home'][K]>
    ) {
      this.home[field] = { ...this.home[field], ...payload };
    },

    // دالة لتحديث أي حقل في `step1`
    updateStep1<K extends keyof VerificationRequestStoreState['step1']>(
      field: K,
      payload: Partial<VerificationRequestStoreState['step1'][K]>
    ) {
      this.step1[field] = { ...this.step1[field], ...payload };
    },

    // دالة لتحديث أي حقل في `step2`
    updateStep2<K extends keyof VerificationRequestStoreState['step2']>(
      field: K,
      payload: Partial<VerificationRequestStoreState['step2'][K]>
    ) {
      this.step2[field] = { ...this.step2[field], ...payload };
    },

    // دالة لتحديث أي حقل في `step3`
    updateStep3<K extends keyof VerificationRequestStoreState['step3']>(
      field: K,
      payload: Partial<VerificationRequestStoreState['step3'][K]>
    ) {
      this.step3[field] = { ...this.step3[field], ...payload };
    },

    // دالة لتحديث أي حقل في `step4`
    updateStep4<K extends keyof VerificationRequestStoreState['step4']>(
      field: K,
      payload: Partial<VerificationRequestStoreState['step4'][K]>
    ) {
      this.step4[field] = { ...this.step4[field], ...payload };
    },

    // تحديث step6
    updateStep6<K extends keyof VerificationRequestStoreState['step6']>(
      field: K,
      payload: Partial<VerificationRequestStoreState['step6'][K]>
    ) {
      this.step6[field] = { ...this.step6[field], ...payload };
    },

    // إعادة تعيين الستور إلى الحالة الافتراضية
    resetStore() {
      Object.assign(this, getDefaultState());
    },

    /**
     * تحميل الوثيقة الحالية
     */
    addPhoneNumber() {
      this.step1.phone.push({ id: `${Date.now()}`, phone: '' });
    },

    removePhoneNumber(index: number) {
      this.step1.phone.splice(index, 1);
    },

    updatePhoneNumber(index: number, value: string) {
      this.step1.phone[index].phone = value;
    },

    validatePhoneNumbers(): boolean {
      let isValid = true;
      this.step1.phone.forEach((phone, index) => {
        if (!phone.phone || phone.phone.trim() === '') {
          isValid = false;
          this.step1.phone[index].isValid = false;
        } else {
          this.step1.phone[index].isValid = true;
        }
      });
      return isValid;
    },

    updateAliasName(index: number, value: { first_name: string, last_name: string, middle_name: string }) {
      console.log("/*/**/*/*/*//*/")
      this.step1.alias_name[index] = value;
    },

    async loadDocument() {
      const toast = useToast();
      const requestList = createRequestList(['name', 'user_id']);
      try {
        // انتظار جلب البيانات        
        await requestList.fetch();
        if (requestList.data.length > 0) {
          this.documentName = requestList.data[0].name;
          toast.success("تم تحميل الوثيقة بنجاح.");
        } else {
          // لا توجد وثيقة، نقوم بإنشاء واحدة جديدة
          const initialFields: UpdateFields = {
            country: this.home.country.value,
            mobile_number: this.home.mobile_number.value,
            is_degree_or_diploma: this.home.is_degree_or_diploma.value,
            from_time: this.home.from_time.value,
            to_time: this.home.to_time.value,
          };
          await this.createNewDocument(initialFields);
        }
      } catch (error) {
        console.error("Error loading document:", error);
        toast.error("حدث خطأ أثناء تحميل الوثيقة.");
      }
    },
    /**
     * إنشاء وثيقة جديدة
     */
  async createNewDocument(initialFields: UpdateFields) {
      const toast = useToast();
      try {
        const newDoc = await createDocumentResource({
          doctype: 'Verification Instructions Request',
          fields: initialFields,
        });
        this.documentName = newDoc.name;
        toast.success("تم إنشاء الوثيقة الجديدة بنجاح.");
      } catch (error) {
        console.error("Error creating new document:", error);
        toast.error("حدث خطأ أثناء إنشاء الوثيقة الجديدة.");
      }
    },

    /**
     * تحديث الحقول في الوثيقة الحالية
     */   
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
      }
    },

    /**
     * دالة التحقق من صحة بيانات Step 1
     */
    validateStep1(): boolean {
      let isValid = true;
      const requiredFields: (keyof Step1Data)[] = [
        'employer_name',
        'first_name',
        'last_name',
        // 'country_now',
        // 'city',
        // 'governorate',
        'zip_code',
        'location_text',
        // 'street_address',
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
      this.step2.educationInformation.forEach(education => {
        if (!education.name_of_school_or_college_university || !education.field_of_study_or_major) {
          isValid = false;
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
          // يمكن إضافة رسائل تحقق خاصة لكل حقل إذا لزم الأمر
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
          // إعادة التحقق من Expiration Date يتم بناءً على is_an_expiration_date
        ) {
          isValid = false;
          // يمكن إضافة رسائل تحقق خاصة بكل حقل إذا لزم الأمر
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

      ];
      
      requiredFields.forEach((field) => {
        const fieldData = this.step6[field];
        if (!fieldData.value || (Array.isArray(fieldData.value) && fieldData.value.length === 0)) {
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
      if (this.step6.email.value && !emailPattern.test(this.step6.email.value)) {
        this.updateStep6('email', {
          isValid: false,
          validationMessage: 'يرجى إدخال بريد إلكتروني صحيح.',
        });
        isValid = false;
      } else if (this.step6.email.value) {
        this.updateStep6('email', {
          isValid: true,
          validationMessage: '',
        });
      }

      return isValid;
    },


    /**
     * دالة الحفظ لخطوة Step 1
     */    
    async saveStep1() {
      const toast = useToast();
            // التحقق من صحة البيانات
      if (!this.validateStep1()) {
        toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        throw new Error('Validation failed');
      }

      // تجهيز البيانات للإرسال
      const dataToSubmit: UpdateFields = {};
      for (const key in this.step1) {
        if (Object.prototype.hasOwnProperty.call(this.step1, key)) {
          const field = key as keyof Step1Data;
          dataToSubmit[key] = this.step1[field].value;
        }
      }

      try {
        await this.updateDocumentFields(dataToSubmit);
        toast.success('تم حفظ البيانات بنجاح.');
      } catch (error) {
        throw error;
      }
    },
  
    /**
     * دالة الحفظ لخطوة Step 2
     */
    async saveStep2() {
      const toast = useToast();
      if (!this.validateStep2()) {
        toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        throw new Error('Validation failed');
      }

      const dataToSubmit: UpdateFields = {
        education_information: this.step2.educationInformation,
      };

       try {
        await this.updateDocumentFields(dataToSubmit);
        toast.success('تم حفظ بيانات التعليم بنجاح.');
      } catch (error) {
        throw error;
      }
    },
    /**
     * دالة الحفظ لخطوة Step 3
     */
    async saveStep3() {
      const toast = useToast();
      if (!this.validateStep3()) {
        toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        throw new Error('Validation failed');
      }

      const dataToSubmit: UpdateFields = {
        employment_history: this.step3.employment_history,
      };

      try {
        await this.updateDocumentFields(dataToSubmit);
        toast.success('تم حفظ بيانات التوظيف بنجاح.');
      } catch (error) {
        console.error('حدث خطأ أثناء حفظ بيانات التوظيف:', error);
        throw error;
      }
    },
    /**
     * دالة الحفظ لخطوة Step 4
     */
    async saveStep4() {
      const toast = useToast();
      if (!this.validateStep4()) {
        toast.error('يرجى تصحيح الأخطاء قبل الحفظ.');
        throw new Error('Validation failed');
      }

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
    
  },
});