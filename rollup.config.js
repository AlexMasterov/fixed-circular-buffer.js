import size from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import { main } from './package.json';

export default {
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
    {
      transform(code, id) {
        if (!id.endsWith('index.js')) return;
        return code
          .replace(/const (CAPACITY|MASK).+/g, '')
          .replace(/CAPACITY/g, '2048')
          .replace(/MASK/g, '2047')
          .replace(/(this.\w+)/g, (_, p1) => p1.substring(6, 0))
          .replace(/(top|bottom|list|next|tail|head)/g, (_, p1) => p1.substring(1, 0));
      },
    },
  ],
};
