import fs from 'fs';
import { fork } from 'child_process';

if (!fs.existsSync('./fuser.config.ts')) {
  console.log('No fuser.config.ts file found');
  console.log('Creating one...');
  fs.copyFileSync('./fuser.config.ts.template', './fuser.config.ts');
}

fork('./src/fuser/instance.ts');
