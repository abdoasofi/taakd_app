import { defineStore } from 'pinia';
import { language } from '../data/useLangLogic'

interface languages {
    languages: Object
  }
  const getDefaultState = (): languages => ({
    languages:language,
  });
  export const useLanguage= defineStore('languages', {
    state: (): languages => getDefaultState(),
  
    actions: {
      // تعيين اسم الوثيقة
      getLanguage() {
        return this.languages;
      },

    },
  });