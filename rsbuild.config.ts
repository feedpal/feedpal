import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  dev: {
    client: {
      host: '0.0.0.0',
      port: 3000,
      protocol: 'ws',
    },
    writeToDisk: (file) => !file.includes('.hot-update.'),
  },
  server: {
    publicDir: {
      copyOnBuild: false,
    },
    open: false,
    port: 3000,
    strictPort: true,
  },
  output: {
    filenameHash: false,
  },
  environments: {
    web: {
      plugins: [pluginReact()],
      source: {
        entry: {
          main: './src/main/index.tsx',
        },
      },
      html: {
        title: '',
      },
      output: {
        target: 'web',
        copy: [{ from: './public' }],
      },
    },
    webworker: {
      source: {
        entry: {
          background: './src/background/index.ts',
        },
      },
      output: {
        target: 'web-worker',
      },
    },
  },
});
