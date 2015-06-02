'use strict';

var chai = require('chai');
var expect = chai.expect;

describe('corazon', function() {
  it('exports class', function() { expect(require('..').Class).to.exist; });
  it('exports class via subpath', function() {
    expect(require('../class')).to.equal(require('..').Class);
  });

  it('exports property', function() { expect(require('..').Property).to.exist; });
  it('exports property fn', function() { expect(require('..').property).to.exist; });
  it('exports property fn via subpath', function() {
    expect(require('../property')).to.equal(require('..').Property.fn);
  });

  it('exports mixin', function() { expect(require('..').Mixin).to.exist; });
  it('exports mixin via subpath', function() {
    expect(require('../mixin')).to.equal(require('..').Mixin);
  });

  it('exports attribute trigger', function() {
    expect(require('..').AttributeTrigger).to.exist;
  });
});
