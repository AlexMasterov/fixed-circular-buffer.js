'use strict';

const size = require('rollup-plugin-bundle-size');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const replace = require('rollup-plugin-re');

const { name, main } = require('./package.json');

module.exports = {
  input: main,
  output: {
    dir: 'dist',
    file: 'bundle.esm.js',
    format: 'esm',
  },
  plugins: [
    size(),
    commonjs(),
    terser({
      ecma: 6,
      parse: {
        ecma: 8,
      },
      output: {
        ecma: 6,
        quote_style: 3,
        comments: false,
        beautify: false,
      },
      compress: {
        ecma: 6,
        inline: 2,
        toplevel: true,
        warnings: true,
        unsafe: true,
        unsafe_math: true,
        unsafe_comps: true,
        unsafe_methods: true,
        unsafe_undefined: true,
      },
      module: false,
      toplevel: true,
      keep_classnames: true,
    }),
    replace({
      include: /index.js$/,
      patterns: [
        {
          transform(code) {
            return code
              .replace(/(this.\w+)/g, (_, p1) => p1.substring(6, 0))
              .replace(/(top|bottom|list|next|tail|head)/g, (_, p1) => p1.substring(1, 0));
          },
        },
        { test: /const (CAPACITY|MASK).+/g, replace: '' },
        { test: 'CAPACITY', replace: '2048' },
        { test: 'MASK', replace: '2047' },
      ],
    }),
  ],
};
