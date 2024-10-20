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
    other_languages:  { value: [] as string[], isValid: true, validationMessage: '' }, // تصحيح النوع هنا
    electronic_signature: { value: '', isValid: false, validationMessage: '' },
    full_name: { value: '', isValid: false, validationMessage: '' },
    email_address: { value: '', isValid: false, validationMessage: '' },
    i_agree_to_the_electronic_signature: { value: false, isValid: false, validationMessage: '' },
    i_acknowledge_the_above: { value: false, isValid: false, validationMessage: '' }, // إضافة هذا الحقل
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
        /**
     * تحميل الوثيقة الحالية
     */
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
    

    // دوال تحديث الحقول لمختلف الخطوات
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
     * إضافة رقم هاتف جديد
     */
    addPhoneNumber() {
      this.step1.phone.push({ id: `${Date.now()}`, phone: '' });
    },

    /**
     * إزالة رقم هاتف
     */
    removePhoneNumber(index: number) {
      this.step1.phone.splice(index, 1);
    },

    /**
     * تحديث رقم هاتف معين
     */
    updatePhoneNumber(index: number, value: string) {
      this.step1.phone[index].phone = value;
    },

    /**
     * التحقق من صحة أرقام الهواتف
     */
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

    /**
     * تحديث اسم مستعار
     */
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
          // يمكن إضافة رسائل تحقق خاصة لكل حقل إذا لزم الأمر
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

      if (!this.step6.acknowledge_electronic_signature.value) {
        this.updateStep6('acknowledge_electronic_signature', {
          isValid: false,
          validationMessage: 'يجب تأكيد التوقيع الإلكتروني.',
        });
        isValid = false;
      } else {
        this.updateStep6('acknowledge_electronic_signature', {
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
        /**
     * دالة تحميل الحقول الخاصة بـ Home من الوثيقة
   */
    async loadHomeFields() {
      
      try {
        const request = createDocumentResource({
          doctype: 'Verification Instructions Request',
          name: this.documentName,
        });
        const data = await request.reload();
          // تأكد من كيفية جلب البيانات حسب مكتبة frappe-ui
        // تحديث الحقول في Home
        this.updateHome('country', { value: data.country });
        this.updateHome('mobile_number', { value: data.mobile_number });
        this.updateHome('is_degree_or_diploma', { value: data.is_degree_or_diploma });
        this.updateHome('from_time', { value: data.from_time });
        this.updateHome('to_time', { value: data.to_time });
        
      } catch (error) {
        console.error("Error loading Step1 fields:", error);
        const toast = useToast();
        toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الأولى.");
      }
    },
    /**
     * دالة تحميل الحقول الخاصة بـ Step1 من الوثيقة
   */
   
    async loadStep1Fields() {
      try {
        const request = createDocumentResource({
          doctype: 'Verification Instructions Request',
          name: this.documentName,
        });
        const data = await request.reload();
         // تأكد من كيفية جلب البيانات حسب مكتبة frappe-ui
        // تحديث الحقول في Step1
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

        // يمكنك إضافة المزيد من الحقول بناءً على احتياجاتك

        this.validations = data.validations || this.validations; // تحديث التحققات إذا كانت موجودة
      } catch (error) {
        console.error("Error loading Step1 fields:", error);
        const toast = useToast();
        toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الأولى.");
      }
    },
 /**
     * دالة تحميل الحقول الخاصة بـ Step2 من الوثيقة
 */

    async loadStep2Fields() {
      // if (!this.documentName) return;
      try {
        const request = createDocumentResource({
          doctype: 'Verification Instructions Request',
          name: this.documentName,
        });
        const data = await request.reload();
        // تأكد من كيفية جلب البيانات حسب مكتبة frappe-ui
        this.step2.educationInformation = data.education_information;

      } catch (error) {
        console.error("Error loading Step1 fields:", error);
        const toast = useToast();
        toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الأولى.");
      }
    },   

  /**
   * دالة تحميل الحقول الخاصة بـ Step3 من الوثيقة
   * يجب إنشاء هذه الدالة لتحميل البيانات الخاصة بـ Step6 بشكل صحيح
   */

  async loadStep3Fields() {
    // if (!this.documentName) return;
    try {
      const request = createDocumentResource({
        doctype: 'Verification Instructions Request',
        name: this.documentName,
      });
      const data = await request.reload();
      // تأكد من كيفية جلب البيانات حسب مكتبة frappe-ui
      this.step3.employment_history = data.employment_history;

    } catch (error) {
      console.error("Error loading Step1 fields:", error);
      const toast = useToast();
      toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الأولى.");
    }
  },   

  /**
   * دالة تحميل الحقول الخاصة بـ Step4 من الوثيقة
   * يجب إنشاء هذه الدالة لتحميل البيانات الخاصة بـ Step6 بشكل صحيح
   */

  async loadStep4Fields() {
    // if (!this.documentName) return;
    try {
      const request = createDocumentResource({
        doctype: 'Verification Instructions Request',
        name: this.documentName,
      });
      const data = await request.reload();
       // تأكد من كيفية جلب البيانات حسب مكتبة frappe-ui
      this.step4.professional_qualification = data.professional_qualification;
  
    } catch (error) {
      console.error("Error loading Step1 fields:", error);
      const toast = useToast();
      toast.error("حدث خطأ أثناء تحميل بيانات الخطوة الأولى.");
    }
  }, 
    /**
     * دالة تحميل الحقول الخاصة بـ Step6 من الوثيقة
   */
    async loadStep6Fields() {
      // if (!this.documentName) return;
      try {
        const request = createDocumentResource({
          doctype: 'Verification Instructions Request',
          name:this.documentName,
        });
        const data = await request.reload(); // تأكد من كيفية جلب البيانات حسب مكتبة frappe-ui
        // تحديث الحقول في Step6
        this.updateStep6('other_languages', { value: data.other_languages });
        this.updateStep6('electronic_signature', { value: data.electronic_signature });
        this.updateStep6('full_name', { value: data.full_name });
        this.updateStep6('email_address', { value: data.email_address });
        this.updateStep6('i_agree_to_the_electronic_signature', { value: data.i_agree_to_the_electronic_signature });
        this.updateStep6('acknowledge_electronic_signature', { value: data.acknowledge_electronic_signature });
        this.updateStep6('i_acknowledge_the_above', { value: data.i_acknowledge_the_above });
      } catch (error) {
        console.error("Error loading Step6 fields:", error);
        // يمكنك إضافة رسالة خطأ هنا باستخدام toast
      }
    },
  },
});