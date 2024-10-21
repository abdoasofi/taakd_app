import { createListResource } from 'frappe-ui';

export const language = createListResource({
  type: 'list',
  doctype: 'Language',
  fields: ["name","language_code", "language_name"],
  cache: 'language',
  auto: true,
});
