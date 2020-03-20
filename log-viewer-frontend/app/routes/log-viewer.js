import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    query: {
      refreshModel: true
    },
    limit:{
      refreshModel: true
    },
    fromOffset:{
      refreshModel: true
    },
    sortProperty:{
      refreshModel: true
    },
    sortOrder:{
      refreshModel: true
    },
    methods:{
      refreshModel: true
    }
  },

  beforeModel() {
    this.controllerFor('log-viewer').set('isLoading', true);
  },

  model(params) {
    return new Promise((resolve, reject) => {
      this.store.query('log', params)
        .then((result) => {
          resolve({
            data: result.toArray(),
            meta: result.meta
          })
        });
    });
  },

  afterModel() {
    this.controllerFor('log-viewer').set('isLoading', false);
  }
});
