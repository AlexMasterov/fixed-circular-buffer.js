# Fixed Circular Buffer

A tiny, fast and heap safe singly-linked list of fixed-size (2048) [circular buffers](https://en.wikipedia.org/wiki/Circular_buffer).

[![npm](https://img.shields.io/npm/v/fixed-circular-buffer.svg)](https://www.npmjs.com/package/fixed-circular-buffer)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://travis-ci.org/AlexMasterov/fixed-circular-buffer.js.svg)](https://travis-ci.org/AlexMasterov/fixed-circular-buffer.js)
[![Coverage Status](https://coveralls.io/repos/github/AlexMasterov/fixed-circular-buffer.js/badge.svg?branch=master)](https://coveralls.io/github/AlexMasterov/fixed-circular-buffer.js?branch=master)

## Installation
```sh
# npm
npm install fixed-circular-buffer

# yarn
yarn add fixed-circular-buffer
```

## Usage
```javascript
const CircularBuffer = require('fixed-circular-buffer')

const Q = new CircularBuffer()

Q.push('xyz')

Q.size        // 1
Q.length      // 2048

Q.shift()     // 'xyz'
Q.shift()     // null

let i = 2049  // data items
while (i > 0) Q.push(i -= 1)

Q.size        // 2049
Q.length      // 4096
```

## Tests
Run tests as follows:

```
npm run test
```

## License
Copyright &#169; 2018-present Alex Masterov &lt;alex.masterow@gmail.com&gt;

Fixed Circular Buffer is licensed under MIT and can be used for any personal or commercial project.
