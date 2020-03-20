import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  didRender() {
    this._super(...arguments);
    const elems = this.$('select');
    window.M.FormSelect.init(elems, {});
  },

  sortProperties: computed('sortProperty', function () {
    return [
      {
        value: 'id',
        display: 'None',
        selected: this.get('sortProperty') === 'id'
      },
      {
        value: 'latency',
        display: 'Latency',
        selected: this.get('sortProperty') === 'latency'
      },
      {
        value: 'timestamp',
        display: 'Timestamp',
        selected: this.get('sortProperty') === 'timestamp'
      }
    ];
  }),

  sortOrders: computed('sortOrder', function () {
    return [
      {
        value: 'DESC',
        display: 'Descending',
        selected: this.get('sortOrder') === 'DESC'
      },
      {
        value: 'ASC',
        display: 'Ascending',
        selected: this.get('sortOrder') === 'ASC'
      }
    ];
  }),

  methodOptions: computed('methods.[]', function () {
    const methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'TRACE', 'HEAD', 'CONNECT', 'OPTIONS'];
    return methods.map((method) => {
      return {
        value: method,
        display: method,
        selected: (this.get('methods') || []).includes(method)
      };
    });
  }),

  actions: {
    methodFilterChanged(event) {
      const result = [];
      for(let i = 0; i < event.srcElement.options.length; ++i) {
        const currItem = event.srcElement.options.item(i);
        if (currItem.selected) {
          result.push(currItem.value);
        }
      }

      this.send('resetPage');
      this.set('methods', result);
    },

    resetPage() {
      this.set('fromOffset', 0);
    },
  }
});
