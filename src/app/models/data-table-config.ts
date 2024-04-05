export interface DataTableConfig {
  columns: Array<DataTableColumn>;
  canEdit?: boolean;
  editComponent?: any;
  canDelete?: boolean;
  deleteComponent?: any;
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
