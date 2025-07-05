import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any; // For dynamic fields
}

export interface Column {
  key: string;
  label: string;
  visible: boolean;
  sortable: boolean;
  type: 'string' | 'number' | 'email';
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface TableState {
  rows: TableRow[];
  columns: Column[];
  sortConfig: SortConfig | null;
  searchTerm: string;
  currentPage: number;
  rowsPerPage: number;
  editingCell: { rowId: string; columnKey: string } | null;
  pendingChanges: Record<string, any>;
}

const defaultColumns: Column[] = [
  { key: 'name', label: 'Name', visible: true, sortable: true, type: 'string' },
  { key: 'email', label: 'Email', visible: true, sortable: true, type: 'email' },
  { key: 'age', label: 'Age', visible: true, sortable: true, type: 'number' },
  { key: 'role', label: 'Role', visible: true, sortable: true, type: 'string' },
];

const initialState: TableState = {
  rows: [
    { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, role: 'Developer' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'Designer' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Manager' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 28, role: 'Developer' },
    { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, role: 'Designer' },
  ],
  columns: defaultColumns,
  sortConfig: null,
  searchTerm: '',
  currentPage: 0,
  rowsPerPage: 10,
  editingCell: null,
  pendingChanges: {},
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<{ id: string; data: Partial<TableRow> }>) => {
      const index = state.rows.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...action.payload.data };
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    addColumn: (state, action: PayloadAction<Omit<Column, 'visible'>>) => {
      state.columns.push({ ...action.payload, visible: true });
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(col => col.key === action.payload);
      if (column) {
        column.visible = !column.visible;
      }
    },
    reorderColumns: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.columns.splice(sourceIndex, 1);
      state.columns.splice(destinationIndex, 0, removed);
    },
    setSortConfig: (state, action: PayloadAction<SortConfig | null>) => {
      state.sortConfig = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 0; // Reset to first page when searching
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.currentPage = 0; // Reset to first page when changing page size
    },
    setEditingCell: (state, action: PayloadAction<{ rowId: string; columnKey: string } | null>) => {
      state.editingCell = action.payload;
    },
    setPendingChanges: (state, action: PayloadAction<Record<string, any>>) => {
      state.pendingChanges = action.payload;
    },
    clearPendingChanges: (state) => {
      state.pendingChanges = {};
    },
  },
});

export const {
  setRows,
  addRow,
  updateRow,
  deleteRow,
  addColumn,
  toggleColumnVisibility,
  reorderColumns,
  setSortConfig,
  setSearchTerm,
  setCurrentPage,
  setRowsPerPage,
  setEditingCell,
  setPendingChanges,
  clearPendingChanges,
} = tableSlice.actions;

export default tableSlice.reducer; 