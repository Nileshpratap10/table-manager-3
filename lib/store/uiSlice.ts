import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  theme: 'light' | 'dark';
  isManageColumnsModalOpen: boolean;
  isImportModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UIState = {
  theme: 'light',
  isManageColumnsModalOpen: false,
  isImportModalOpen: false,
  isLoading: false,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setManageColumnsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isManageColumnsModalOpen = action.payload;
    },
    setImportModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isImportModalOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTheme,
  toggleTheme,
  setManageColumnsModalOpen,
  setImportModalOpen,
  setLoading,
  setError,
} = uiSlice.actions;

export default uiSlice.reducer; 