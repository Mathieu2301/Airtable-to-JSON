export interface AirtableResponse {
  msg: string;
  data: Data;
}

export default AirtableResponse;

export interface Data {
  table: Table;
  appBlanket: AppBlanket;
  description: null;
  isRevisionHistoryEnabled: boolean;
  sortTiebreakerKey: string;
  defaultViewMutability: null;
  maintenanceModeSettings: null;
  sharesById: SharesById;
  workflowSectionsById: Object;
  workflowTriggerConnectionsById: Object;
  applicationTransactionNumber: number;
  tableSchemas: TableSchema[];
  tableDatas: TableData[];
  hasBlockInstallations: boolean;
  packageInstallationsById: Object;
  applicationAdminFlags: ApplicationAdminFlags;
  pageLayoutSchemaVersion: number;
  pageBundles: any[];
  uploadedUserContentCdnSetting: UploadedUserContentCdnSetting;
  applicationV2TargetedFeatureFlagClientConfiguration: ApplicationV2TargetedFeatureFlagClientConfiguration;
  applicationV2EnabledFeatureNames: string[];
  isUserLimitsHardEnforcementEnabledForParentWorkspace: boolean;
  isConstantPooledData: boolean;
}

export interface UserInfoById {
  id: string;
  firstName: string;
  lastName: null | string;
  email: string;
  profilePicUrl: string;
  permissionLevel: string;
  pageBundlePermissionLevelByPageBundleId: Object;
  appBlanketUserState: string;
}

export interface ApplicationAdminFlags {
  UPDATE_PRIMITIVE_CELL_THROTTLE_MS: any;
  UPDATE_RICH_TEXT_CELL_THROTTLE_MS: any;
  MAX_WORKFLOWS_PER_APPLICATION: any;
  MAX_SYNC_SOURCES_PER_APPLICATION: any;
  MAX_SYNC_SOURCES_PER_TABLE: any;
  MAX_SYNCED_TABLES_PER_APPLICATION: any;
  CUSTOM_MAX_NUM_ROWS_PER_TABLE: any;
  DENYLISTED_PAGE_BUNDLES_FOR_PAGE_BUNDLE_COLLABORATORS: any;
}

export interface ApplicationV2TargetedFeatureFlagClientConfiguration {
  androidGroupsInCollaboratorField: PreCalcVariant;
  linkedRecordExpansionFromGridElement: TrafficLevel;
  blockModelBridgeLongWaitUntilReadyBeforeWriteTimeout: TrafficLevel;
  enterpriseApiRestriction: TrafficLevel;
  workflowsNonCollaborators: TrafficLevel;
  datasetPublishing: TrafficLevel;
  goldenDatasetsRelationshipMapBeta: TrafficLevel;
  syncDiscoveryMenuRedesignForEnterpriseWorkspaces: TrafficLevel;
  externalTableSyncEditSourceRecordV2: TrafficLevel;
  externalTableSyncPingSourceBasesFromTarget: PreCalcVariant;
  useAppropriateAppInterfaceForPublicApi: TrafficLevel;
  useAppropriateAppInterfaceForColumnActions: TrafficLevel;
  useAppropriateAppInterfaceForDownloadsAndEmails: TrafficLevel;
  useAppropriateAppInterfaceForPasteAndImport: TrafficLevel;
  dateFieldTimeZoneLabels: TrafficLevel;
  displayAllDateFilterValueTimeZoneLabels: TrafficLevel;
  fieldLevelTimeZone: TrafficLevel;
  applicationSearchPrototypeUi: TrafficLevel;
  recordTemplates: TrafficLevel;
  nonCollaboratorsInCollaboratorField: TrafficLevel;
  groupsInCollaboratorField: TrafficLevel;
  changesPayloadFiltering: TrafficLevel;
  insightsMetrics: TrafficLevel;
  usageInsightsWithThreading: TrafficLevel;
  disableUsageInsightsOneYearOption: TrafficLevel;
  disabledWorkflowOnSchemaChangeSuggestion: TrafficLevel;
  syncFailureSuggestion: TrafficLevel;
  unusedViewsSuggestion: TrafficLevel;
  unusedSelectChoicesSuggestion: TrafficLevel;
  unifiedEventLog: TrafficLevel;
  unifiedEventLogPublishingBlockDbCommits: TrafficLevel;
  unifiedEventLogDarkLaunch: TrafficLevel;
  formToggleRequestCopyOfResponseFeature: TrafficLevel;
  enterpriseRequireManualFilterUpdate: TrafficLevel;
  constantPoolingForCrudResponses: TrafficLevel;
  unpoolifyPreserveObjectPropertyOrder: TrafficLevel;
  logForeignKeyUsageOperationsMayAffectPerformance: TrafficLevel;
  singleApplicationRealtimeEnableCompositeConnection: TrafficLevel;
}

export interface PreCalcVariant {
  precalculatedVariant: PrecalculatedVariant;
}

export interface PrecalculatedVariant {
  variant: string;
  reason: string;
  ruleType: string;
  featureFlagRequestContext: FeatureFlagRequestContext;
}

export interface FeatureFlagRequestContext {
  geoContext: GeoContext;
}

export interface GeoContext {
  countryCode: string;
  isInEuropeanUnion: boolean;
}

export interface TrafficLevel {
  trafficLevel: number;
}

export interface SharesById {
  [id: string]: {
    id: string;
    modelId: string;
    createdByUserId: string;
    canBeCloned: boolean;
    canBeExported: boolean;
    includeHiddenColumns: boolean;
    includeBlocks: boolean;
    emailDomain: null;
    hasPassword: boolean;
    generationNumber: number;
    metadata: null;
  };
}

export interface TableData {
  id: string;
  rows: Row[];
  viewDatas: ViewData[];
  signedUserContentUrls: Object;
  hasOnlyIncludedRowAndCellDataForIncludedViews: boolean;
}

export interface ViewData {
  id: string;
  frozenColumnCount: number;
  columnOrder: ColumnOrder[];
  filters: Filters;
  lastSortsApplied: LastSortsApplied;
  groupLevels: GroupLevel[];
  colorConfig: null;
  sharesById: SharesById;
  description: null;
  createdByUserId: string;
  applicationTransactionNumber: number;
  rowOrder: RowOrder[];
  signedUserContentUrls: Object;
}

export interface Filters {
  filterSet: FilterSet[];
  conjunction: string;
}

export interface FilterSet {
  id: string;
  columnId: string;
  operator: string;
  value: string;
}

export interface LastSortsApplied {
  sortSet: any[];
  shouldAutoSort: boolean;
  appliedTime: Date;
}

export interface TableSchema {
  id: string;
  name: string;
  primaryColumnId: string;
  columns: Column[];
  meaningfulColumnOrder: ColumnOrder[];
  views: View[];
  viewOrder: string[];
  viewsById: { [key: string]: View };
  viewSectionsById: { [key: string]: ViewSectionsById };
  rowTemplatesById: Object;
  schemaChecksum: string;
  rowUnit: null;
}

export interface Dependencies {
  referencedColumnIdsForValue: string[];
  referencedFormulaFunctions: string[];
  dependsOnCurrentRow: boolean;
}

export interface LabelClass {
  staticText: string;
  type: string;
}

export interface Variant {
  staticVariant: string;
  type: string;
}

export interface ViewSectionsById {
  id: string;
  name: string;
  createdByUserId: string;
  pinnedForUserId: null;
  viewOrder: string[];
}

export interface Table {
  applicationId: string;
  id: string;
  name: string;
  columns: Column[];
  primaryColumnId: string;
  meaningfulColumnOrder: ColumnOrder[];
  views: View[];
  viewOrder: string[];
  appBlanket: AppBlanket;
  sortTiebreakerKey: string;
  uploadedUserContentCdnSetting: UploadedUserContentCdnSetting;
  rows: Row[];
  signedUserContentUrls: Object;
}

export interface AppBlanket {
  userInfoById: { [key: string]: UserInfoById };
  externalAccountInfoById: Object;
  userGroupInfoById: Object;
  workspaceSyncSources: any[];
  activeUserIdByAcceptedInviteId: Object;
  isWorkspaceOptedOutOfUserContentCdnAuth: boolean;
  isEnterpriseAccountOptedOutOfUserContentCdnAuth: boolean;
  enterpriseAttachmentRestrictions: EnterpriseAttachmentRestrictions;
  isWorkspaceLinkedToEnterpriseAccount: boolean;
}

export interface EnterpriseAttachmentRestrictions {
  restrictionType: string;
  attachmentTypeAllowlist: any[];
}

export interface Column {
  id: string;
  name: string;
  description: null;
  type: ColumnType;
  typeOptions?: TypeOptions;
  default: null;
  isEditableFromSync: boolean;
}

export type ColumnType = 'multilineText' | 'select' | 'button' | string;

export interface TypeOptions {
  choiceOrder?: string[];
  choices?: { [key: string]: Choice };
  disableColors?: boolean;
  label?: LabelClass;
  variant?: Variant;
  actionType?: string;
  formulaTextParsed?: string;
  dependencies?: Dependencies;
  resultType?: string;
  resultIsArray?: boolean;
}

export interface Choice {
  id: string;
  name: string;
  color: string;
}

export interface ColumnOrder {
  columnId: string;
  visibility: boolean;
  width?: number;
}

export interface Row {
  id: string;
  createdTime: Date;
  cellValuesByColumnId: {
    [key: string]: string | string[];
  };
}

export interface UploadedUserContentCdnSetting {
  applicationScopedAuthMode: string;
}

export type ViewType = 'form' | 'grid' | string;

export interface View {
  id: string;
  name: string;
  type: ViewType;
  personalForUserId?: string;
  description?: null;
  createdByUserId?: string;

  frozenColumnCount: number;
  viewSleepingState: ViewSleepingState;
  groupLevels: GroupLevel[];
  columnOrder: ColumnOrder[];
  rowOrder: RowOrder[];
}

export interface GroupLevel {
  id: string;
  columnId: string;
  order: string;
  emptyGroupState: string;
}

export interface RowOrder {
  rowId: string;
  visibility: boolean;
}

export interface ViewSleepingState {
  status: string;
  awakeSinceTransactionNumber: number;
}
