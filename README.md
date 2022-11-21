# Airtable to JSON

This project can be used to extract data from any public Airtable table and write it to a JSON file.
The project includes a table `fuser` that can be used to combine multiple tables into a single JSON file, with the ability to project columns and rename them, and group rows by a common column (Primary Key).
All possible merging errors are handled with error messages that make it easy to resolve them.
This project is designed to work perfectly with MongoDB.

## Install the dependencies

```bash
yarn
```

## Download data from Airtable

1. Go to the airtable page on your browser
2. Go to inspect element
3. Go to network tab
4. Reload the page (F5)
5. Search `readSharedViewData` or `read` in the network tab
6. Click the first or second result
7. Go to `Response` tab
8. Copy the content
9. Create a `input.json` file in the `./inputs` directory
10. Paste the content in the file

## Parse the JSON files

This will parse all the JSON files in the `./inputs` directory and create a file in the `./outputs` directory.

```bash
yarn start
```

## Format and merge the JSON files

This will merge all the JSON files in the `./outputs` directory and create a `merged.output.json` file.

```bash
yarn merge
```

### Fuser configuration

When you run the `yarn merge` command for the first time, it will create a `fuser.config.ts` file in the root directory. You can then edit this file to change the configuration.

```ts
{
  /**
   * The column name that will
   * be used to merge the data.
   *
   * If not provided, there may
   * be duplicates in the output.
   */
  uniqueKey: 'theColumnId',
  /**
   * The projection that will be used
   * to merge the data.
   *
   * The key is the column name of the
   * Airtable table and the value is the
   * column name wanted in the output file.
   */
  projection: {
    'The column id': 'theColumnId',
    'The column name': 'theColumnName',
    'the_column_type': 'theColumnType',
  },
  /**
   * Set it to true if you want to remove
   * the `_date` column after merging.
   *
   * This column is used to merge the data.
   * 
   * Default: false
   */
  removeDate: false,
}
```
