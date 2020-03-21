import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('log-viewer-paginator', 'Integration | Component | log viewer paginator', {
  integration: true
});

test('it renders no results properly', function(assert) {
  this.render(hbs`{{log-viewer-paginator}}`);
  assert.equal(this.$().text().trim().replace(/\n/g, '').replace(/\s/g, ''), 'chevron_left1chevron_right');
});

