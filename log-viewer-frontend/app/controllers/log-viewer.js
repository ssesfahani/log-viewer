import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['query', 'limit', 'fromOffset', 'sortOrder', 'sortProperty', 'methods'],

  query: '',
  limit: 100,
  fromOffset: 0,
  sortProperty: 'id',
  sortOrder: 'DESC',
  methods: undefined
});
