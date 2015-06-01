'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon'); chai.use(require('sinon-chai'));
var expect = chai.expect;
var Class = require('../class');
var Mixin = require('../mixin');

describe('Mixin', function() {
  beforeEach(function() {
    sinon.spy(Class.__metaclass__.prototype, 'reopen');
  });

  afterEach(function() {
    Class.__metaclass__.prototype.reopen.restore();
  });

  it('looks like an object', function() {
    var properties = {
      first: 'first',
      second: function() { return 'second'; }
    };
    var SimpleMixin = Mixin.create(properties);
    expect(_.clone(SimpleMixin)).to.eql(properties);
  });

  it('looks like an object, but the first mixin only', function() {
    var properties = {
      first: 'first',
      second: function() { return 'second'; }
    };
    var SimpleMixin = Mixin.create(properties, { ignored: 'ignored' });
    expect(_.clone(SimpleMixin)).to.eql(properties);
  });

  it('is a mixin', function() {
    var SimpleMixin = Mixin.create({});
    expect(SimpleMixin).to.be.instanceOf(Mixin.__class__);
  });

  it('can specify mixins without instance properties', function() {
    var BarkMixin = Mixin.create({
      bark: function() { return 'bark'; }
    });
    var Animal = Class.extend(BarkMixin);
    var animal = Animal.create();
    expect(animal.bark()).to.eql('bark');
  });

  it('calls reopen with the mixin contents', function() {
    var attrs = { bark: 'bark' };
    var BarkMixin = Mixin.create(attrs);
    Class.extend(BarkMixin);
    expect(Class.reopen).to.have.been.calledWithExactly(BarkMixin);
    expect(Class.reopen).to.have.been.calledWithExactly(attrs);
  });

  it('can be passed to Class.reopen', function() {
    var BarkMixin = Mixin.create({
      bark: function() { return 'bark'; }
    });
    var LoudBarkMixin = Mixin.create(BarkMixin, {
      bark: function() { return this._super().toUpperCase(); }
    });
    var Animal = Class.extend();
    Animal.reopen(LoudBarkMixin);
    var animal = Animal.create();
    expect(animal.bark()).to.eql('BARK');
  });

  it('can be passed to Class.reopenClass', function() {
    var BarkMixin = Mixin.create({
      bark: function() { return 'bark'; }
    });
    var LoudBarkMixin = Mixin.create(BarkMixin, {
      bark: function() { return this._super().toUpperCase(); }
    });
    var Animal = Class.extend();
    Animal.reopenClass(LoudBarkMixin);
    expect(Animal.bark()).to.eql('BARK');
  });

  it('can specify mixins with instance properties', function() {
    var BarkMixin = Mixin.create({
      bark: function() { return 'bark'; }
    });
    var Animal = Class.extend(BarkMixin, {
      walk: function() { return 'walk'; }
    });
    var animal = Animal.create();
    expect(animal.walk()).to.eql('walk');
    expect(animal.bark()).to.eql('bark');
  });

  it('allows multiple mixins', function() {
    var BarkMixin = Mixin.create({
      bark: function() { return 'bark'; }
    });
    var WalkMixin = Mixin.create({
      walk: function() { return 'walk'; }
    });
    var Animal = Class.extend(BarkMixin, WalkMixin, {});
    var animal = Animal.create();
    expect(animal.walk()).to.eql('walk');
    expect(animal.bark()).to.eql('bark');
  });

  it('support #_super', function() {
    var BarkMixin = Mixin.create({
      speak: function() { return 'bark ' + (this._super() || ''); }
    });
    var Animal = Class.extend(BarkMixin, {
      speak: function() {
        return 'animal ' + this._super();
      }
    });
    var Dog = Animal.extend(BarkMixin, {
      speak: function() {
        return 'dog ' + this._super();
      }
    });
    var dog = Dog.create();
    expect(dog.speak().trim()).to.eql('dog bark animal bark');
  });

  it('is known to the class', function() {
    var AMixin = Mixin.create({ name: 'AMixin' });
    var Subclass = Class.extend(AMixin);
    expect(Subclass.__mixins__).to.eql([AMixin]);
  });

  it('it known to the class when created with sub-mixins', function() {
    var AMixin = Mixin.create({ name: 'AMixin' });
    var BMixin = Mixin.create({ name: 'BMixin' });
    var CMixin = Mixin.create({ name: 'CMixin' }, AMixin, BMixin);
    var DMixin = Mixin.create({ name: 'DMixin' });
    var EMixin = Mixin.create({ name: 'EMixin' });
    var FMixin = Mixin.create({ name: 'FMixin' });
    var GMixin = Mixin.create({ name: 'GMixin' }, EMixin, FMixin);
    var Subclass = Class.extend(CMixin, DMixin);
    Subclass.reopen(GMixin);
    expect(Subclass.__mixins__).to.eql([
      AMixin,
      BMixin,
      CMixin,
      DMixin,
      EMixin,
      FMixin,
      GMixin
    ]);
  });

  it('allows mixins to be created with mixins', function() {
    var AMixin = Mixin.create({
      fn: function() { return 'a'; }
    });

    var BMixin = Mixin.create({
      fn: function() { return this._super() + 'b'; }
    });

    var CMixin = Mixin.create(AMixin, BMixin, {
      fn: function() { return this._super() + 'c'; }
    });


    var DMixin = Mixin.create(CMixin, {
      fn: function() { return this._super() + 'd'; }
    });

    var Subclass = Class.extend(DMixin, {
      fn: function() { return this._super() + 'e'; }
    });
    var instance = Subclass.create();

    expect(instance.fn()).to.eql('abcde');
  });

  it('allows mixins to be created with mixins & call #_super', function() {
    var AMixin = Mixin.create({
      fn: function() { return this._super() + 'a'; }
    });

    var BMixin = Mixin.create({
      fn: function() { return this._super() + 'b'; }
    });

    var CMixin = Mixin.create(AMixin, BMixin, {
      fn: function() { return this._super() + 'c'; }
    });

    var Baseclass = Class.extend({
      fn: function() { return '_'; }
    });

    var Subclass = Baseclass.extend(CMixin, {
      fn: function() { return this._super() + 'd'; }
    });
    var instance = Subclass.create();

    expect(instance.fn()).to.eql('_abcd');
  });

  it('cannot be extended again', function() {
    expect(function() {
      Mixin.extend();
    }).to.throw(/cannot extend mixin/i);
  });

});
