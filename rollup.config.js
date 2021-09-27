// import necessary dependencies
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import scss from "rollup-plugin-scss";
import sass from 'sass'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { uglify } from "rollup-plugin-uglify";

export default {
  input: {
    'bundle.esm': './src/index.js',
  },
  plugins: [
      json(),
      vue({ css: true }),
      scss({
        output: "./dist/css/style.css",
        failOnError: true,
        runtime: sass,
      }),
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
    compact: false,
    dir: './dist',
    format: 'esm',
  }
}