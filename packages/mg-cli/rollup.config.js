import { defineConfig } from 'rollup';
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';


import pkg from './package.json';

module.exports = defineConfig({
  input: path.resolve(__dirname, 'src/index.ts'),
  // 输出文件
  output: [
    // commonJS
    {
      file: 'dist/index.js',
      format: 'cjs',
      // interop设置为compat将会对引入的node_module中的包进行处理，自动识别并调整引入的方式
      interop: 'compat',
    }
  ],
  plugins: [
    json(),
    // rollup 编译typescript
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    // 解析第三方依赖
    nodeResolve(),
    // commonjs一般与@rollup/plugin-node-resolve配合使用
    commonjs(),
    
  ],

  external: [...(pkg.dependencies ? Object.keys(pkg.dependencies) : [])],
});
