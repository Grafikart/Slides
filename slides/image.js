import {copyFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {sync} from 'glob';

/**
 * Copie les images des slides dans le dossier de build
 * En attendant le support dans ViteJS : https://github.com/vitejs/vite/pull/11138
 */
const jpgFiles = sync(join('src', '**/*.{jpg,png,webp}'));
jpgFiles.forEach(filePath => {
    const destPath = filePath.replace('src/', 'dist/src/');
    const destDir = dirname(destPath);
    if (!existsSync(destDir)) {
        mkdirSync(destDir, { recursive: true });
    }
    copyFileSync(filePath, destPath);
});
