'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon'); chai.use(require('sinon-chai'));
var expect = chai.expect;
var Property = require('..').Property;
var Attr;

describe('Property', function() {

  it('.fn creates properties', function() {
    expect(Property.fn()).to.be.instanceOf(Property.__class__);
  });

  describe('Attr sublcass', function() {
    beforeEach(function() { Attr = Property.extend(); });

    it('.fn creates attrs', function() {
      expect(Attr.fn()).to.be.instanceOf(Attr.__class__);
    });
  });

});
