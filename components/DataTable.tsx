'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Skeleton,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {
  setSortConfig,
  setSearchTerm,
  setCurrentPage,
  setEditingCell,
  updateRow,
  deleteRow,
  clearPendingChanges,
  setPendingChanges,
} from '@/lib/store/tableSlice';
import { TableRow as TableRowType, Column, SortConfig } from '@/lib/store/tableSlice';
import Pagination from './Pagination';

interface DataTableProps {
  onEditRow?: (row: TableRowType) => void;
  onDeleteRow?: (rowId: string) => void;
}

export default function DataTable({ onEditRow, onDeleteRow }: DataTableProps) {
  const dispatch = useDispatch();
  const {
    rows,
    columns,
    sortConfig,
    searchTerm,
    currentPage,
    rowsPerPage,
    editingCell,
    pendingChanges,
  } = useSelector((state: RootState) => state.table);

  const [editValue, setEditValue] = useState<string>('');

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = rows;

    // Apply search filter
    if (searchTerm) {
      filtered = rows.filter(row =>
        Object.values(row).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [rows, searchTerm, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);

  // Handle sorting
  const handleSort = (columnKey: string) => {
    const isAsc = sortConfig?.key === columnKey && sortConfig.direction === 'asc';
    dispatch(setSortConfig({
      key: columnKey,
      direction: isAsc ? 'desc' : 'asc',
    }));
  };

  // Handle inline editing
  const handleCellDoubleClick = (rowId: string, columnKey: string, value: any) => {
    dispatch(setEditingCell({ rowId, columnKey }));
    setEditValue(value?.toString() || '');
  };

  const handleEditSave = (rowId: string, columnKey: string) => {
    dispatch(updateRow({ id: rowId, data: { [columnKey]: editValue } }));
    dispatch(setEditingCell(null));
    setEditValue('');
  };

  const handleEditCancel = () => {
    dispatch(setEditingCell(null));
    setEditValue('');
  };

  // Handle row actions
  const handleDeleteRow = (rowId: string) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      dispatch(deleteRow(rowId));
      if (onDeleteRow) onDeleteRow(rowId);
    }
  };

  const visibleColumns = columns.filter(col => col.visible);

  return (
    <Card elevation={2} sx={{ overflow: 'hidden' }}>
      <CardContent sx={{ p: 0 }}>
        {/* Search Bar with Enhanced Styling */}
        <Box sx={{ p: 3, pb: 2, bgcolor: 'background.paper' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search across all fields..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            size="medium"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              sx: { borderRadius: 2 }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          
          {/* Search Results Info */}
          {searchTerm && (
            <Fade in={true}>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Found {filteredAndSortedData.length} result{filteredAndSortedData.length !== 1 ? 's' : ''}
                </Typography>
                <Chip 
                  label={`${paginatedData.length} shown`} 
                  size="small" 
                  variant="outlined" 
                  color="primary"
                />
              </Box>
            </Fade>
          )}
        </Box>

        {/* Loading Progress */}
        {rows.length === 0 && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}

        {/* Table */}
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                {visibleColumns.map((column) => (
                  <TableCell 
                    key={column.key}
                    sx={{ 
                      fontWeight: 600,
                      borderBottom: '2px solid',
                      borderColor: 'divider'
                    }}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={sortConfig?.key === column.key}
                        direction={sortConfig?.key === column.key ? sortConfig.direction : 'asc'}
                        onClick={() => handleSort(column.key)}
                        sx={{ '&:hover': { color: 'primary.main' } }}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                <TableCell 
                  sx={{ 
                    fontWeight: 600,
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                    width: 120
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h6" color="text.secondary">
                        {searchTerm ? 'No results found' : 'No data available'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchTerm ? 'Try adjusting your search terms' : 'Add some data to get started'}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    hover
                    sx={{ 
                      '&:hover': { bgcolor: 'action.hover' },
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {visibleColumns.map((column) => (
                      <TableCell key={column.key}>
                        {editingCell?.rowId === row.id && editingCell?.columnKey === column.key ? (
                          <Zoom in={true}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <TextField
                                size="small"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                autoFocus
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleEditSave(row.id, column.key);
                                  } else if (e.key === 'Escape') {
                                    handleEditCancel();
                                  }
                                }}
                                sx={{ minWidth: 120 }}
                              />
                              <Tooltip title="Save">
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditSave(row.id, column.key)}
                                  color="primary"
                                >
                                  <SaveIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel">
                                <IconButton
                                  size="small"
                                  onClick={handleEditCancel}
                                  color="error"
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Zoom>
                        ) : (
                          <Box
                            onDoubleClick={() => handleCellDoubleClick(row.id, column.key, row[column.key])}
                            sx={{ 
                              cursor: 'pointer', 
                              minHeight: '20px',
                              '&:hover': { bgcolor: 'action.hover', borderRadius: 1, px: 1 }
                            }}
                          >
                            {row[column.key]?.toString() || ''}
                          </Box>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit Row" arrow>
                          <IconButton
                            size="small"
                            onClick={() => onEditRow?.(row)}
                            color="primary"
                            sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Row" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteRow(row.id)}
                            color="error"
                            sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Enhanced Pagination */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Pagination />
        </Box>
      </CardContent>
    </Card>
  );
} 