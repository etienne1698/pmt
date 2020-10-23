import moment from 'moment';
import Vue from 'vue';

export function formatDate(value: Date|string) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
  return '';
}

export default function ({store}) {
  Vue.filter('formatDate', (value: Date|string) => formatDate(value));
  Vue.prototype.$formatDate = (date: Date|string) => formatDate(date);
}

