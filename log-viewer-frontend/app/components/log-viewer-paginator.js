import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  currPage: computed('limit', 'fromOffset', function () {
    return Math.ceil((this.get('fromOffset') + 1) / this.get('limit'));
  }),

  totalPages: computed('total', 'limit', function () {
    return Math.ceil(this.get('total') / this.get('limit'));
  }),

  disableNextButton: computed('currPage', 'totalPages', function () {
    return this.get('currPage') >= this.get('totalPages');
  }),

  disablePrevButton: computed('currPage', 'totalPages', function () {
    return this.get('currPage') === 1;
  }),

  actions: {
    goToPage(page) {
      this.set('fromOffset', (page - 1) * this.get('limit'));
    },

    goToNextPage() {
      this.send('goToPage', this.get('currPage') + 1);
    },

    goToPrevPage() {
      this.send('goToPage', this.get('currPage') - 1);
    }
  }
});
