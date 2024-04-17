export interface DataTableConfig {
  type: string;
  columns: Array<DataTableColumn>;
  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  addEditComponent?: any;
}

export interface DataTableColumn {
  name: string;
  label: string;
  type?: string;
  canSort?: boolean;
  canSearch?: boolean;
  canFilter?: boolean;
  visible?: boolean;
  width?: string;
}
