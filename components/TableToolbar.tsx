'use client';

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Rating,
  Slider,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Avatar,
  Badge,
  Tooltip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Divider,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Collapse,
  Alert,
  Skeleton,
  LinearProgress,
  CircularProgress,
  Backdrop,
  Modal,
  Fade,
  Zoom,
  Grow,
  Slide,
  Paper,
} from '@mui/material';
import {
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewComfy as ViewComfyIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function TableToolbar() {
  const dispatch = useDispatch();
  const { rows, columns } = useSelector((state: RootState) => state.table);
  
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [rating, setRating] = useState<number | null>(2);
  const [sliderValue, setSliderValue] = useState<number>(30);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'comfortable'>('list');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const steps = [
    {
      label: 'Select data source',
      description: `Choose where to import your data from. You can import from CSV files, databases, or APIs.`,
    },
    {
      label: 'Configure columns',
      description: 'Set up your table columns, their types, and visibility settings.',
    },
    {
      label: 'Apply filters',
      description: `Configure any filters or search criteria for your data.`,
    },
    {
      label: 'Review and import',
      description: `Review your configuration and import the data into your table.`,
    },
  ];

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      {/* Advanced Toolbar with Tabs */}
      <Card elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="table toolbar tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ViewListIcon />
                  Table View
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterIcon />
                  Filters
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SortIcon />
                  Sort & Group
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SettingsIcon />
                  Advanced
                </Box>
              } 
            />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="h6">View Options</Typography>
            <Chip label={`${rows.length} rows`} color="primary" size="small" />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              startIcon={<ViewListIcon />}
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              startIcon={<ViewModuleIcon />}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'comfortable' ? 'contained' : 'outlined'}
              startIcon={<ViewComfyIcon />}
              onClick={() => setViewMode('comfortable')}
            >
              Comfortable
            </Button>
          </Box>

          {/* Rating Component */}
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Table Quality Rating</Typography>
            <Rating
              name="table-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={0.5}
            />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Filter Options</Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Rows per page: {sliderValue}</Typography>
            <Slider
              value={sliderValue}
              onChange={(event, newValue) => setSliderValue(newValue as number)}
              min={5}
              max={100}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <FormControlLabel
            control={
              <Switch 
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
              />
            }
            label="Show advanced filters"
          />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>Sort & Group Options</Typography>
          
          <RadioGroup defaultValue="name" name="sort-by">
            <FormControlLabel value="name" control={<Radio />} label="Sort by Name" />
            <FormControlLabel value="email" control={<Radio />} label="Sort by Email" />
            <FormControlLabel value="age" control={<Radio />} label="Sort by Age" />
            <FormControlLabel value="role" control={<Radio />} label="Sort by Role" />
          </RadioGroup>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>Advanced Settings</Typography>
          
          {/* Stepper Component */}
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Optional</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </TabPanel>
      </Card>

      {/* Action Buttons with Menu */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Add Row
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => setLoading(true)}
        >
          Refresh
        </Button>

        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export Data</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <UploadIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Import Data</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* Drawer for Additional Options */}
      <Button
        variant="outlined"
        onClick={() => setDrawerOpen(true)}
        startIcon={<InfoIcon />}
        sx={{ mt: 2 }}
      >
        Show Info Panel
      </Button>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Information Panel
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <InfoIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="Table Statistics" 
                secondary={`${rows.length} rows, ${columns.length} columns`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Badge badgeContent={4} color="primary">
                  <Avatar>
                    <StarIcon />
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText 
                primary="Favorites" 
                secondary="4 items favorited"
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Modal for Add Row */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="add-row-modal"
      >
        <Fade in={modalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Add New Row
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This feature is coming soon. You can use the inline editing feature to add data.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={() => setModalOpen(false)}>
                Add Row
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Collapsible Advanced Section */}
      <Collapse in={showAdvanced}>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Advanced Options
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Auto-save changes"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Show row numbers"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Enable keyboard shortcuts"
              />
            </Box>
          </CardContent>
        </Card>
      </Collapse>
    </Box>
  );
} 