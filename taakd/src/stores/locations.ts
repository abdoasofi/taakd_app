import { defineStore } from 'pinia';
import { location } from '../data/useAddressLogic'

interface locations {
    locations: Object
  }
  const getDefaultState = (): locations => ({
    locations:location,
  });
  export const useLocation= defineStore('locations', {
    state: (): locations => getDefaultState(),
  
    actions: {
      // تعيين اسم الوثيقة
      getLocation() {
        return this.locations;
      },

    },
  });