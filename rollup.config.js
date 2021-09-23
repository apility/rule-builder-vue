// import necessary dependencies
import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from "rollup-plugin-uglify";

export default {
  input: './src/index.js',
  plugins: [
      vue({ css: true }),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      globals(),
      buble({
        objectAssign: 'Object.assign',
        transforms: { asyncAwait: false }
      }),
      uglify()
  ],
  output: {
    compact: true,
    dir: './dist',
    format: 'es',
  }
}