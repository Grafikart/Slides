import { defineConfig } from 'vite'
import {globby} from 'globby';
import { fileURLToPath } from 'node:url'

const realPath = (path: string): string => {
    return fileURLToPath(new URL(path, import.meta.url))
}

const pathToName = (path: string): string => {
    return path.replaceAll('/', '_')
        .replaceAll('src_','')
        .replaceAll('.html', '')
}

const paths = [
  'index.html',
  ...await globby(['src/**/index.html'])
];

export default defineConfig({
    build: {
        rollupOptions: {
          input: paths.reduce((acc, r) => {
            return {
                ...acc,
                [pathToName(r)]: realPath(r)
            }
          }, {} as Record<string, string>),
        },
      },
})