import fs from 'fs';
import parse from './src/parser';

const inputFiles = fs
  .readdirSync('./inputs')
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''));

if (!inputFiles.length) {
  console.log('No input files found');
  process.exit(0);
}

for (const fileI in inputFiles) {
  const file = inputFiles[fileI];
  console.log(`[${Number(fileI) + 1}/${inputFiles.length}] Processing '${file}.json'...`);

  try {
    console.log(`  [1/5] Loading '${file}.json' file`);
    const raw = fs.readFileSync(`./inputs/${file}.json`, 'utf8');
    console.log('  [2/5] Parsing file');
    const input = JSON.parse(raw);
    console.log('  [3/5] Processing content');
    const rs = parse(input);
    console.log(`  [4/5] Writing ${rs.length} entries to '${file}.json'`);
    fs.writeFileSync(`./outputs/${file}.json`, `${JSON.stringify(rs, null, 2)}\r`);
    console.log('  [5/5] Done!\n');
  } catch (error: any) {
    console.error('  [Error]', error);
    process.exit(1);
  }
}

console.log('If you want to format and merge all your outputs, run `yarn nerge`.');
