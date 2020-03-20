import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr(),
  timestamp: DS.attr(),
  httpMethod: DS.attr(),
  fullText: DS.attr(),
  latency: DS.attr()
});
