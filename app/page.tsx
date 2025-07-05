'use client';

import React from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  Stack,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
  Badge,
  Tooltip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  TableChart as TableIcon,
  DataUsage as DataIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setManageColumnsModalOpen } from '@/lib/store/uiSlice';
import DataTable from '@/components/DataTable';
import ManageColumnsModal from '@/components/ManageColumnsModal';
import AddDataModal from '@/components/AddDataModal';
import ImportExportButtons from '@/components/ImportExportButtons';
import ThemeToggle from '@/components/ThemeToggle';
import TableToolbar from '@/components/TableToolbar';
import DataVisualization from '@/components/DataVisualization';

export default function HomePage() {
  const dispatch = useDispatch();
  const { rows, columns } = useSelector((state: RootState) => state.table);
  const [showStats, setShowStats] = React.useState(true);
  const [isAddDataModalOpen, setIsAddDataModalOpen] = React.useState(false);

  const handleManageColumns = () => {
    dispatch(setManageColumnsModalOpen(true));
  };

  const handleAddRow = () => {
    setIsAddDataModalOpen(true);
  };

  const visibleColumns = columns.filter(col => col.visible);
  const hiddenColumns = columns.filter(col => !col.visible);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Enhanced App Bar */}
      <AppBar position="static" elevation={2}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TableIcon sx={{ fontSize: 28 }} />
            <Typography variant="h6" component="div">
              Dynamic Data Table Manager
            </Typography>
            <Chip 
              label="v1.0" 
              size="small" 
              color="secondary" 
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Header Section with Enhanced Cards */}
          <Grid item xs={12}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Data Table Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Manage your data with powerful sorting, filtering, and editing capabilities
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <DataIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>

                {/* Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SettingsIcon />}
                    onClick={handleManageColumns}
                    size="large"
                  >
                    Manage Columns
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddRow}
                    size="large"
                  >
                    Add Row
                  </Button>
                </Stack>

                {/* Import/Export Buttons */}
                <ImportExportButtons />

                {/* Stats Cards */}
                {showStats && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Table Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="primary.main">
                            {rows.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Rows
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="success.main">
                            {visibleColumns.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Visible Columns
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="warning.main">
                            {hiddenColumns.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Hidden Columns
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                          <Typography variant="h4" color="info.main">
                            {columns.length}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Columns
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Data Visualization */}
          <Grid item xs={12}>
            <DataVisualization />
          </Grid>

          {/* Table Toolbar */}
          <Grid item xs={12}>
            <TableToolbar />
          </Grid>

          {/* Table Section */}
          <Grid item xs={12}>
            <Card elevation={2}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TableIcon color="primary" />
                      <Typography variant="h6">
                        Data Table
                      </Typography>
                      <Chip 
                        label={`${rows.length} rows`} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        icon={<VisibilityIcon />}
                        label={`${visibleColumns.length} visible`} 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Box>
                <DataTable />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddRow}
      >
        <AddIcon />
      </Fab>

      {/* Speed Dial for Quick Actions */}
      <SpeedDial
        ariaLabel="Quick actions"
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<SettingsIcon />}
          tooltipTitle="Manage Columns"
          onClick={handleManageColumns}
        />
        <SpeedDialAction
          icon={<UploadIcon />}
          tooltipTitle="Import CSV"
          onClick={() => {
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            fileInput?.click();
          }}
        />
        <SpeedDialAction
          icon={<DownloadIcon />}
          tooltipTitle="Export CSV"
          onClick={() => {/* Export functionality */}}
        />
      </SpeedDial>

      {/* Modals */}
      <ManageColumnsModal />
      <AddDataModal 
        open={isAddDataModalOpen}
        onClose={() => setIsAddDataModalOpen(false)}
      />
    </Box>
  );
} 