'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  LinearProgress,
  CircularProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Divider,
  Grid,
  Paper,
  Alert,
  Skeleton,
  Tooltip,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Slider,
  Rating,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fade,
  Zoom,
  Grow,
  Slide,
  Collapse,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
  DataUsage as DataUsageIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';

export default function DataVisualization() {
  const { rows, columns } = useSelector((state: RootState) => state.table);
  const [viewMode, setViewMode] = useState<'chart' | 'table' | 'list'>('chart');
  const [showDetails, setShowDetails] = useState(false);
  const [rating, setRating] = useState<number | null>(3);
  const [sliderValue, setSliderValue] = useState<number>(50);

  // Calculate some statistics
  const totalRows = rows.length;
  const visibleColumns = columns.filter(col => col.visible).length;
  const avgAge = rows.length > 0 
    ? Math.round(rows.reduce((sum, row) => sum + (row.age || 0), 0) / rows.length)
    : 0;

  const roleStats = rows.reduce((acc, row) => {
    acc[row.role] = (acc[row.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topRoles = Object.entries(roleStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      {/* View Mode Toggle */}
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newValue) => newValue && setViewMode(newValue)}
          aria-label="view mode"
        >
          <ToggleButton value="chart" aria-label="chart view">
            <BarChartIcon sx={{ mr: 1 }} />
            Chart
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <AssessmentIcon sx={{ mr: 1 }} />
            Table
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <DataUsageIcon sx={{ mr: 1 }} />
            List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <DataUsageIcon />
              </Avatar>
              <Typography variant="h4" color="primary.main" gutterBottom>
                {totalRows}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Rows
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(totalRows / 10) * 100} 
                sx={{ mt: 2, height: 6, borderRadius: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <VisibilityIcon />
              </Avatar>
              <Typography variant="h4" color="success.main" gutterBottom>
                {visibleColumns}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visible Columns
              </Typography>
              <Chip 
                label={`${Math.round((visibleColumns / columns.length) * 100)}%`} 
                size="small" 
                color="success" 
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <AnalyticsIcon />
              </Avatar>
              <Typography variant="h4" color="warning.main" gutterBottom>
                {avgAge}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Age
              </Typography>
              <Rating 
                value={rating} 
                onChange={(e, newValue) => setRating(newValue)}
                size="small"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <TrendingUpIcon />
              </Avatar>
              <Typography variant="h4" color="info.main" gutterBottom>
                {Object.keys(roleStats).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Unique Roles
              </Typography>
              <CircularProgress 
                variant="determinate" 
                value={sliderValue} 
                size={40}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Main Visualization Area */}
      <Card elevation={3}>
        <CardHeader
          title="Data Analytics Dashboard"
          subheader="Interactive visualization of your table data"
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Refresh Data">
                <IconButton>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Export Report">
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        <CardContent>
          {viewMode === 'chart' && (
            <Fade in={true}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Role Distribution
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {topRoles.map(([role, count]) => (
                    <Box key={role} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ minWidth: 100 }}>
                        <Typography variant="body2">{role}</Typography>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(count / totalRows) * 100}
                          sx={{ height: 20, borderRadius: 10 }}
                        />
                      </Box>
                      <Box sx={{ minWidth: 50, textAlign: 'right' }}>
                        <Typography variant="body2" fontWeight="bold">
                          {count}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Fade>
          )}

          {viewMode === 'table' && (
            <Slide direction="up" in={true}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Data Summary Table
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Metric</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Percentage</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Rows</TableCell>
                        <TableCell>{totalRows}</TableCell>
                        <TableCell>100%</TableCell>
                        <TableCell>
                          <Chip label="Complete" color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Visible Columns</TableCell>
                        <TableCell>{visibleColumns}</TableCell>
                        <TableCell>{Math.round((visibleColumns / columns.length) * 100)}%</TableCell>
                        <TableCell>
                          <Chip label="Active" color="primary" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Age</TableCell>
                        <TableCell>{avgAge}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>
                          <Chip label="Calculated" color="info" size="small" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Slide>
          )}

          {viewMode === 'list' && (
            <Grow in={true}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Top Roles by Count
                </Typography>
                <List>
                  {topRoles.map(([role, count], index) => (
                    <React.Fragment key={role}>
                      <ListItem>
                        <ListItemAvatar>
                          <Badge badgeContent={index + 1} color="primary">
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {role.charAt(0).toUpperCase()}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={role}
                          secondary={`${count} employees (${Math.round((count / totalRows) * 100)}%)`}
                        />
                        <ListItemSecondaryAction>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating value={Math.min(5, count / 2)} readOnly size="small" />
                            <IconButton size="small">
                              <MoreVertIcon />
                            </IconButton>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < topRoles.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Grow>
          )}
        </CardContent>
      </Card>

      {/* Advanced Analytics Section */}
      <Accordion sx={{ mt: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Advanced Analytics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Data Quality Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <CircularProgress 
                  variant="determinate" 
                  value={85} 
                  size={60}
                  color="success"
                />
                <Box>
                  <Typography variant="h4">85%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Excellent data quality
                  </Typography>
                </Box>
              </Box>
              
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Auto-refresh analytics"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Performance Metrics
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Processing Speed: {sliderValue}%
                </Typography>
                <Slider
                  value={sliderValue}
                  onChange={(e, newValue) => setSliderValue(newValue as number)}
                  aria-label="Processing speed"
                  valueLabelDisplay="auto"
                />
              </Box>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <InfoIcon sx={{ mr: 1 }} />
                Analytics are updated in real-time
              </Alert>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Collapsible Details Section */}
      <Collapse in={showDetails}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Detailed Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  Data Completeness
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={92} 
                  sx={{ height: 8, borderRadius: 4, mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Data Accuracy
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={88} 
                  sx={{ height: 8, borderRadius: 4, mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Data Consistency
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={95} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip 
                    icon={<CheckCircleIcon />} 
                    label="Data validation passed" 
                    color="success" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<WarningIcon />} 
                    label="2 missing values detected" 
                    color="warning" 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<ErrorIcon />} 
                    label="1 duplicate entry found" 
                    color="error" 
                    variant="outlined"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Collapse>

      {/* Show Details Button */}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => setShowDetails(!showDetails)}
          startIcon={showDetails ? <VisibilityOffIcon /> : <VisibilityIcon />}
        >
          {showDetails ? 'Hide' : 'Show'} Detailed Statistics
        </Button>
      </Box>
    </Box>
  );
} 