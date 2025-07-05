'use client';

import React, { useRef, useState } from 'react';
import {
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  CircularProgress,
  Snackbar,
  Fade,
  Slide,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setRows } from '@/lib/store/tableSlice';
import { setImportModalOpen, setLoading, setError } from '@/lib/store/uiSlice';
import { parseCSV, csvToTableRows, validateCSVData, exportToCSV } from '@/lib/utils/csvUtils';

export default function ImportExportButtons() {
  const dispatch = useDispatch();
  const { rows, columns, isImportModalOpen, isLoading, error } = useSelector((state: RootState) => ({
    rows: state.table.rows,
    columns: state.table.columns,
    isImportModalOpen: state.ui.isImportModalOpen,
    isLoading: state.ui.isLoading,
    error: state.ui.error,
  }));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      setImportProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setImportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Parse CSV file
      const csvData = await parseCSV(file);
      
      // Validate CSV data
      const validation = validateCSVData(csvData);
      if (!validation.isValid) {
        dispatch(setError(validation.errors.join('\n')));
        return;
      }

      // Convert to table rows
      const tableRows = csvToTableRows(csvData);
      
      // Update table data
      dispatch(setRows(tableRows));
      
      setImportProgress(100);
      setTimeout(() => {
        setImportProgress(0);
        dispatch(setLoading(false));
        setShowSuccessSnackbar(true);
      }, 500);
      
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to import CSV file'));
      setImportProgress(0);
    } finally {
      dispatch(setLoading(false));
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExport = () => {
    try {
      exportToCSV(rows, columns);
      setShowSuccessSnackbar(true);
    } catch (err) {
      dispatch(setError('Failed to export CSV file'));
    }
  };

  const handleCloseImportModal = () => {
    dispatch(setImportModalOpen(false));
  };

  const handleCloseSnackbar = () => {
    setShowSuccessSnackbar(false);
  };

  return (
    <Box>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Import/Export Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <FileUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Import CSV
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload a CSV file to import data into your table
            </Typography>
            <Button
              variant="contained"
              startIcon={<UploadIcon />}
              onClick={handleImportClick}
              disabled={isLoading}
              size="large"
              fullWidth
            >
              {isLoading ? 'Importing...' : 'Import CSV'}
            </Button>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ flex: 1 }}>
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <FileDownloadIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Export CSV
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Download current table data as a CSV file
            </Typography>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
              disabled={rows.length === 0}
              size="large"
              fullWidth
              color="success"
            >
              Export CSV
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Import Progress */}
      {isLoading && (
        <Fade in={true}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CircularProgress size={24} />
                <Typography variant="body2">
                  Importing CSV file...
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={importProgress} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Fade>
      )}

      {/* Error Alert */}
      {error && (
        <Slide direction="up" in={true}>
          <Alert
            severity="error"
            onClose={() => dispatch(setError(null))}
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => dispatch(setError(null))}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <Typography variant="body2">
              {error}
            </Typography>
          </Alert>
        </Slide>
      )}

      {/* Import Success Modal */}
      <Dialog 
        open={isImportModalOpen} 
        onClose={handleCloseImportModal}
        TransitionComponent={Slide}
        transitionDuration={300}
      >
        <DialogTitle sx={{ 
          bgcolor: 'success.main', 
          color: 'success.contrastText',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <CheckCircleIcon />
          Import Successful
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <CheckCircleIcon color="success" sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h6" gutterBottom>
                CSV Import Completed
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your CSV file has been successfully imported and the table has been updated.
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" color="text.secondary">
            <strong>Imported Data:</strong>
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="Rows imported" 
                secondary={`${rows.length} total rows`}
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Columns available" 
                secondary={`${columns.filter(c => c.visible).length} visible columns`}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseImportModal} variant="contained" color="success">
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Operation completed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
} 