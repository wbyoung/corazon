# Corazón

[![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url] [![Code Climate][codeclimate-image]][codeclimate-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][david-image]][david-url] [![devDependencies][david-dev-image]][david-dev-url]

An elegant JS class system at the heart of [Azul.js][azul].

```js
var Class = require('corazon/class');

var Person = Class.extend({
  init: function(firstName, lastName) {
    console.log('creating the person %s %s', firstName, lastName);
  }
});

var person = Person.create('Whitney', 'Young');
```

See usage details [on the Azul.js website][azul-objects].


## License

This project is distributed under the MIT license.

[azul]: https://github.com/wbyoung/azul
[azul-objects]: http://www.azuljs.com/guides/core/#objects

[travis-image]: http://img.shields.io/travis/wbyoung/corazon.svg?style=flat
[travis-url]: http://travis-ci.org/wbyoung/corazon
[npm-image]: http://img.shields.io/npm/v/corazon.svg?style=flat
[npm-url]: https://npmjs.org/package/corazon
[codeclimate-image]: http://img.shields.io/codeclimate/github/wbyoung/corazon.svg?style=flat
[codeclimate-url]: https://codeclimate.com/github/wbyoung/corazon
[coverage-image]: http://img.shields.io/coveralls/wbyoung/corazon.svg?style=flat
[coverage-url]: https://coveralls.io/r/wbyoung/corazon
[david-image]: http://img.shields.io/david/wbyoung/corazon.svg?style=flat
[david-url]: https://david-dm.org/wbyoung/corazon
[david-dev-image]: http://img.shields.io/david/dev/wbyoung/corazon.svg?style=flat
[david-dev-url]: https://david-dm.org/wbyoung/corazon#info=devDependencies
