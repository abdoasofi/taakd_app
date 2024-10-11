// src/stores/verificationRequest.ts
import { defineStore } from 'pinia';
import {
  HomeData,
  Step1Data,
  RequestData,
  ValidationResult,
  UpdateFields,
} from '../data/types';
import { createDocumentResource } from 'frappe-ui';

import { ref } from 'vue';
import { createRequestList, updateFieldsInRequestList, } from '../data/request';
import { useToast } from 'vue-toastification';

interface StepValidation {
  validation: ValidationResult;
}

interface VerificationRequestStoreState {
  documentName: string | null;
  home: HomeData;
  step1: Step1Data;
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
    middle_name: { value: '', isValid: true, validationMessage: '' },
    suffix: { value: '', isValid: true, validationMessage: '' },
    alias_name: { value: [], isValid: true, validationMessage: '' },
    country_now: { value: '', isValid: false, validationMessage: '' },
    city: { value: '', isValid: false, validationMessage: '' },
    governorate: { value: '', isValid: false, validationMessage: '' },
    zip_code: { value: '', isValid: false, validationMessage: '' },
    location_text: { value: '', isValid: false, validationMessage: '' },
    street_address: { value: '', isValid: false, validationMessage: '' },
    date_living_address: { value: '', isValid: false, validationMessage: '' },
    phone: { value: [], isValid: true, validationMessage: '' },
    email: { value: '', isValid: false, validationMessage: '' },
    date_of_birth: { value: '', isValid: false, validationMessage: '' },
  },
  validations: Array.from({ length: 5 }, () => ({ validation: {} })), // تم تحديث الطول ليوافق عدد الحقول
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
    // إعادة تعيين الستور إلى الحالة الافتراضية
    resetStore() {
      Object.assign(this, getDefaultState());
    },

    /**
     * تحميل الوثيقة الحالية
     */
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
    // async createNewDocument(initialFields: UpdateFields) {
    //   const toast = useToast();

    //   try {
    //     const newDoc = await frappeCreateDocumentResource<RequestData>({
    //       doctype: 'Verification Instructions Request',
    //       fields: initialFields,
    //     });

    //     this.documentName = newDoc.name;
    //     toast.success("تم إنشاء الوثيقة الجديدة بنجاح.");
    //   } catch (error) {
    //     console.error("Error creating new document:", error);
    //     toast.error("حدث خطأ أثناء إنشاء الوثيقة الجديدة.");
    //   }
    // },

    /**
     * تحديث الحقول في الوثيقة الحالية
     */
    async updateDocumentFields(updatedFields: UpdateFields) {
      const toast = useToast();
      if (!this.documentName) {
        toast.error("لم يتم العثور على اسم الوثيقة. يرجى إنشاء وثيقة أولاً.");
        return;
      }

      const requestList = createRequestList(['name', 'user_id']);
      try {
        // await updateFieldsInRequestList(requestList, updatedFields);
        // toast.success("تم تحديث الوثيقة بنجاح.");
        const request = createDocumentResource({
          doctype: 'Verification Instructions Request',
          name: this.documentName // يمكنك تغيير الاسم حسب الحاجة
          // auto: true,
        })
        await request.setValue.submit(updatedFields)
      } catch (error) {
        console.error("Error updating document fields:", error);
        toast.error("حدث خطأ أثناء تحديث الوثيقة.");
      }
    },
  },
});