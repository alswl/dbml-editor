import { defineConfig } from 'umi';

export default defineConfig({
  routes: [{ path: '/', component: 'index' }],
  npmClient: 'pnpm',
  title: 'dbml-editor by @alswl',
  esbuildMinifyIIFE: true,
});
