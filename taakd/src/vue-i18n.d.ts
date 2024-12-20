// src/vue-i18n.d.ts
import { DefineComponent } from 'vue';
import { VueI18n } from 'vue-i18n';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: VueI18n['t'];
    $i18n: VueI18n;
  }
}

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>;
  export default component;
}