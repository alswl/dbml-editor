import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'dbml-editor',
    locale: false,
  },
  routes: [
    {
      path: '/',
      component: './Home',
    },
    {
      name: 'Source',
      path: 'https://github.com/alswl/dbml-editor',
      external: true,
    },
    {
      name: 'How to use DBML',
      path: 'https://dbml.dbdiagram.io/home',
      external: true,
    },
    {
      name: '@alswl',
      path: 'https://twitter.com/alswl',
      external: true,
    },

  ],
  npmClient: 'pnpm',
  esbuildMinifyIIFE: true,
});
