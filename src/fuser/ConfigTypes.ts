export default interface FuserConfig {
  /**
   * The column name that will
   * be used to merge the data.
   *
   * If not provided, there may
   * be duplicates in the output.
   */
  uniqueKey?: string,

  /**
   * The projection that will be used
   * to merge the data.
   *
   * The key is the column name of the
   * Airtable table and the value is the
   * column name wanted in the output file.
   */
  projection: { [key: string]: string },

  /**
   * Set it to true if you want to remove
   * the `_date` column after merging.
   *
   * This column is used to merge the data.
   * 
   * Default: false
   */
  removeDate?: boolean;
}
