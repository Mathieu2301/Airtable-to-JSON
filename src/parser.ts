import type { AirtableResponse, Column, Row, ColumnType } from './AirtableViewData';

interface ResultRow {
  [key: string]: any;
}

interface ProcessColumn {
  name: string;
  type: ColumnType;
  choices?: { [key: string]: string };
}

interface AirtableTable {
  columns: Column[];
  rows: Row[];
}

function restructure(table: AirtableTable, result: ResultRow[] = []): ResultRow[] {
  const cols: { [id: string]: ProcessColumn } = {};
  for (const column of table.columns) {
    const col: ProcessColumn = {
      name: column.name,
      type: column.type,
    };

    if (column.typeOptions) {
      col.choices = {};
      for (const choiceI in column.typeOptions.choices) {
        col.choices[choiceI] = column.typeOptions.choices[choiceI].name;
      }
    }

    cols[column.id] = col;
  }

  for (const row of table.rows) {
    const line: ResultRow = { _date: new Date(row.createdTime) };

    for (const colId in row.cellValuesByColumnId) {
      const col = cols[colId];
      const value = row.cellValuesByColumnId[colId];

      if (col.choices) {
        const choices = col.choices ?? {};
        if (!Array.isArray(value)) line[col.name] = choices[value] ?? value;
        else line[col.name] = value.map((v) => choices[v] ?? v);
        continue;
      }

      line[col.name] = row.cellValuesByColumnId[colId];
    }

    result.push(line);
  }

  return result;
}

export default (payload: AirtableResponse) => {
  const result: ResultRow[] = [];

  if (payload.data.table && payload.data.table.rows) {
    restructure({
      columns: payload.data.table.columns,
      rows: payload.data.table.rows,
    }, result);
  }

  if (payload.data.tableDatas && payload.data.tableSchemas) {
    const schemasColumns: { [id: string]: Column[] } = {};
    for (const schema of payload.data.tableSchemas) schemasColumns[schema.id] = schema.columns;

    for (const table of payload.data.tableDatas) {
      restructure({
        columns: schemasColumns[table.id],
        rows: table.rows,
      }, result);
    }
  }

  return result;
};
