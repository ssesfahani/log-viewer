import { moduleForModel, test } from 'ember-qunit';

moduleForModel('log', 'Unit | Serializer | log', {
  // Specify the other units that are required for this test.
  needs: ['serializer:log']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
