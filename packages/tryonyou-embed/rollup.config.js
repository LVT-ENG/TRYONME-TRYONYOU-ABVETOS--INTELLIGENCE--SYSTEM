import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  // UMD build (for script tag usage)
  {
    input: 'src/embed.js',
    output: {
      file: 'dist/embed.js',
      format: 'umd',
      name: 'TryOnYou',
      exports: 'default'
    },
    plugins: [
      nodeResolve(),
      terser()
    ]
  },
  // ES modules build
  {
    input: 'src/embed.js',
    output: {
      file: 'dist/embed.esm.js',
      format: 'es'
    },
    plugins: [
      nodeResolve(),
      terser()
    ]
  }
];