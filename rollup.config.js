import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-cpy';
import cjs from "rollup-plugin-cjs-es";
import { terser } from 'rollup-plugin-terser';

import { main, module } from './package.json';

export default [{
  input: main,

  output: {
    file: module,
    format: 'esm',
  },

  treeshake: {
    propertyReadSideEffects: true,
    pureExternalModules: true,
  },

  plugins: [
    {
      transform(code, id) {
        return code
          .replace(/const (CAPACITY|MASK).+\r\n/g, '')
          .replace(/CAPACITY/g, '2048')
          .replace(/MASK/g, '2047')
          .replace(/(this.\w+)/g, (_, p1) => p1.substring(6, 0))
          .replace(/(top|bottom|list|next|tail|head)/g, (_, p1) => p1.substring(1, 0));
      },
    },
    del({ targets: 'dist/*' }),
    cjs({ nested: true }),
    copy({
      files: 'types/*.d.ts',
      dest: 'dist',
      options: {
        verbose: true,
      },
    }),
  ],
}, {
  input: module,

  output: {
    file: module.replace('.js', '.min.js'),
    format: 'esm',
  },

  plugins: [
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
        loops: true,
        booleans: true,
        keep_fnames: false,
        unsafe: true,
        unsafe_math: true,
        unsafe_comps: true,
        unsafe_methods: true,
        unsafe_undefined: true,
      },
      ie8: false,
      toplevel: true,
      keep_classnames: true,
      sourcemap: false,
      warnings: false,
    }),
  ],
}];
