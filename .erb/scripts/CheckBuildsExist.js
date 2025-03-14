// Check if the renderer and main bundles are built
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const mainPath = path.join(__dirname, '../../src/main.prod.js');
const rendererPath = path.join(__dirname, '../../src/dist/renderer.prod.js');

if (!fs.existsSync(mainPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The main process is not built yet. Build it by running "yarn build-main"',
    ),
  );
}

if (!fs.existsSync(rendererPath)) {
  throw new Error(
    chalk.whiteBright.bgRed.bold(
      'The renderer process is not built yet. Build it by running "yarn build-renderer"',
    ),
  );
}
