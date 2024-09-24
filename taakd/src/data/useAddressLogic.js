import { computed, ref } from 'vue';
import { createListResource } from 'frappe-ui';

export const valueCountry = ref('');
export const valueCity = ref('');
export const valueGovernorate = ref('');

export const selectedCountry = ref('');
export const selectedCity = ref('');

export const location = createListResource({
  type: 'list',
  doctype: 'Location',
  fields: ["location_name", "parent_location", "location_type"],
  cache: 'location',
  auto: true,
});

// export const optionCountry = computed(() => {
//   return location.data.filter(loc => loc.location_type === 'Country').map(loc => ({
//     label: loc.location_name,
//     value: loc.location_name,
//   }));
// });

// export const optionCity = computed(() => {
//   return location.data.filter(loc => loc.location_type === 'City' && loc.parent_location == selectedCountry.value).map(loc => ({
//     label: loc.location_name,
//     value: loc.location_name,
//   }));
// });

// export const optionGovernorate = computed(() => {
//   return location.data.filter(loc => loc.location_type === 'Governorate' && loc.parent_location == selectedCity.value).map(loc => ({
//     label: loc.location_name,
//     value: loc.location_name,
//   }));
// });

// export const handleCountryChange = (value) => {
//   selectedCountry.value = value.value;
// }

// export const handleCityChange = (value) => {
//   selectedCity.value = value.value;
// }