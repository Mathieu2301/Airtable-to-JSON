import fs from 'fs';
import type Config from './ConfigTypes';

const files = fs
  .readdirSync('./outputs')
  .filter((file) => file.endsWith('.json') && !file.endsWith('.output.json'))
  .map((file) => file.replace(/\.json$/, ''));

if (!files.length) {
  console.log('No output files found');
  process.exit(0);
}

interface ResultRow {
  _date: Date;
  [key: string]: any;
}

interface ColReports {
  [colName: string]: {
    count: number;
    type: string;
  };
}

function mergeBy(arr: ResultRow[], key: string): ResultRow[] {
  console.log(`\nMerging ${arr.length} entries by '${key}'...`);
  const merged: { [uniqueKey: string]: ResultRow } = {};

  for (const row of arr) {
    const k = row[key];
    if (typeof k === 'undefined') {
      console.error(`Undefined '${key}' key in`, row);
      process.exit(1);
    }
    if (typeof k !== 'string' && typeof k !== 'number') {
      console.error('Invalid key', k, 'in', row);
      process.exit(1);
    }

    if (!merged[k]) {
      merged[k] = row;
      continue;
    }

    for (const col in row) {
      if ([key, '_date'].includes(col)) continue;
      const val = row[col];

      if (merged[k][col] === undefined) {
        merged[k][col] = val;
        continue;
      }

      if (JSON.stringify(merged[k][col]) !== JSON.stringify(val)) {
        if (row._date > merged[k]._date) {
          console.warn(`  - Overwriting '${col}' in '${k}'`);
          console.log(`     '${merged[k][col]}' -> '${val}'`);
          merged[k][col] = val;
        } else if (row._date < merged[k]._date) {
          console.warn(`  - Keeping '${col}' in '${k}'`);
          console.log(`     '${merged[k][col]}' -> '${val}'`);
        } else {
          console.error(`  - Duplicate '${col}' in '${k}'`);
          console.log(`     '${merged[k][col]}' <> '${val}'`);
          merged[k][`${col} (duplicate)`] = val;
        }
      }
    }
  }

  return Object.values(merged);
}

interface KeyVal { [key: string]: any }

function removeDate(arr: KeyVal[]): KeyVal[] {
  console.log(`\nRemoving '_date' key from ${arr.length} entries...`);
  for (const row of arr) delete row._date;
  return arr;
}

import('../../fuser.config'.toString()).then((confImp) => {
  const config: Config = confImp.default;

  const formattedOut: ResultRow[] = [];

  const untreatedCols: ColReports = {};
  const overwritedCols: ColReports = {};

  function reportCol(store: ColReports, colName: string, value: any) {
    if (!store[colName]) {
      store[colName] = {
        count: 0,
        type: typeof value,
      };
    }

    store[colName].count += 1;
  }

  for (const fI in files) {
    const f = files[fI];
    console.log(`[${Number(fI) + 1}/${files.length}] Processing '${f}'...`);
    const o = JSON.parse(fs.readFileSync(`./outputs/${f}.json`, 'utf8'));

    for (const r of o) {
      const row: ResultRow = { _date: new Date(r._date) };
      delete r._date;

      for (const colInitialName in config.projection) {
        const colProj = config.projection[colInitialName];
        const colNewName = typeof colProj === 'string' ? colProj : colProj[0];
        const colProjFn = typeof colProj === 'string' ? undefined : colProj[1];

        const val = (colProjFn && r[colInitialName])
          ? colProjFn(r[colInitialName])
          : r[colInitialName];

        if (val !== undefined) {
          if (row[colNewName] !== undefined) reportCol(overwritedCols, colNewName, val);
          row[colNewName] = val;
          delete r[colInitialName];
        }
      }

      for (const colName in r) reportCol(untreatedCols, colName, r[colName]);

      formattedOut.push(row);
    }
  }

  const untreatedCount = Object.keys(untreatedCols).length;
  if (untreatedCount) {
    console.warn(`\n${untreatedCount} column(s) were skipped:`);
    for (const col in untreatedCols) {
      const report = untreatedCols[col];
      console.warn(`  - (${report.type}) [${report.count}] ${col}`);
    }
  }

  const overwritedCount = Object.keys(overwritedCols).length;
  if (overwritedCount) {
    console.warn(`\n${overwritedCount} column(s) were overwrited:`);
    for (const col in overwritedCols) {
      const report = overwritedCols[col];
      console.warn(`  - (${report.type}) [${report.count}] ${col}`);
    }
  }

  const mergedOut = config.uniqueKey ? mergeBy(formattedOut, config.uniqueKey) : formattedOut;
  const dateCleanedOut = config.removeDate ? removeDate(mergedOut) : mergedOut;

  console.log(`\nWriting ${dateCleanedOut.length} entries to 'merged.output.json'...`);
  fs.writeFileSync(
    './outputs/merged.output.json',
    `${JSON.stringify(dateCleanedOut, null, 2)}\r`,
  );
  console.log('Done!');
});
