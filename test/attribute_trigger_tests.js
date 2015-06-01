'use strict';

var chai = require('chai');
var expect = chai.expect;
var Class = require('..').Class;
var AttributeTrigger = require('..').AttributeTrigger;

describe('AttributeTrigger', function() {
  it('must be subclassed', function() {
    var trigger = AttributeTrigger.create();
    expect(function() { Class.extend({ property: trigger }); })
      .to.throw(/invoke.*must be.*subclass/i);
  });
});
