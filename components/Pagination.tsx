'use client';

import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setCurrentPage, setRowsPerPage } from '@/lib/store/tableSlice';

export default function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, rowsPerPage, rows, searchTerm, sortConfig } = useSelector((state: RootState) => state.table);

  // Calculate filtered data length for pagination
  const filteredDataLength = React.useMemo(() => {
    let filtered = rows;

    if (searchTerm) {
      filtered = rows.filter(row =>
        Object.values(row).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered.length;
  }, [rows, searchTerm]);

  const totalPages = Math.ceil(filteredDataLength / rowsPerPage);
  const startRow = currentPage * rowsPerPage + 1;
  const endRow = Math.min((currentPage + 1) * rowsPerPage, filteredDataLength);

  const handleFirstPage = () => {
    dispatch(setCurrentPage(0));
  };

  const handlePreviousPage = () => {
    dispatch(setCurrentPage(Math.max(0, currentPage - 1)));
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(Math.min(totalPages - 1, currentPage + 1)));
  };

  const handleLastPage = () => {
    dispatch(setCurrentPage(totalPages - 1));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setRowsPerPage(Number(event.target.value)));
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
      {/* Rows per page selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Rows per page:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            displayEmpty
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Page info */}
      <Typography variant="body2" color="text.secondary">
        {startRow}-{endRow} of {filteredDataLength}
      </Typography>

      {/* Navigation buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          onClick={handleFirstPage}
          disabled={currentPage === 0}
          size="small"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          size="small"
        >
          <NavigateBeforeIcon />
        </IconButton>
        
        {/* Page numbers */}
        <Box sx={{ display: 'flex', gap: 1, mx: 1 }}>
          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = index;
            } else if (currentPage < 3) {
              pageNumber = index;
            } else if (currentPage >= totalPages - 3) {
              pageNumber = totalPages - 5 + index;
            } else {
              pageNumber = currentPage - 2 + index;
            }

            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? 'contained' : 'outlined'}
                size="small"
                onClick={() => dispatch(setCurrentPage(pageNumber))}
                sx={{ minWidth: 32 }}
              >
                {pageNumber + 1}
              </Button>
            );
          })}
        </Box>

        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          size="small"
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          onClick={handleLastPage}
          disabled={currentPage === totalPages - 1}
          size="small"
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    </Box>
  );
} 