# Fixed Circular Buffer

[![npm](https://img.shields.io/npm/v/fixed-circular-buffer.svg)](https://www.npmjs.com/package/fixed-circular-buffer)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/AlexMasterov/fixed-circular-buffer.js.svg)](https://travis-ci.org/AlexMasterov/fixed-circular-buffer.js)
[![Coverage Status](https://coveralls.io/repos/github/AlexMasterov/fixed-circular-buffer.js/badge.svg?branch=master)](https://coveralls.io/github/AlexMasterov/fixed-circular-buffer.js?branch=master)

## Installation
```
npm install fixed-circular-buffer
```

## Usage
```javascript
const CircularBuffer = require('fixed-circular-buffer');

const Q = new CircularBuffer();

Q.push('xyz');
Q.shift();      // 'xyz'
Q.shift();      // null
```

## Tests
Run tests as follows:

```
npm run test
```

## License
Copyright &#169; 2018-present Alex Masterov &lt;alex.masterow@gmail.com&gt;

Fixed Circular Buffer is licensed under MIT and can be used for any personal or commercial project.
