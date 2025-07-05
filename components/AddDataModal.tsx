'use client';

import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  LinearProgress,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Checkbox,
  RadioGroup,
  Radio,
  Slider,
  Rating,
  Divider,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  Slide,
  Collapse,
  Backdrop,
  Modal,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Cake as CakeIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  DataUsage as DataUsageIcon,
  TableChart as TableChartIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { addRow } from '@/lib/store/tableSlice';

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
      id={`add-data-tabpanel-${index}`}
      aria-labelledby={`add-data-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface AddDataModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddDataModal({ open, onClose }: AddDataModalProps) {
  const dispatch = useDispatch();
  const { columns } = useSelector((state: RootState) => state.table);
  
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    role: '',
    department: '',
    salary: '',
    startDate: '',
    rating: 0,
    isActive: true,
    notes: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    {
      label: 'Choose Input Method',
      description: 'Select how you want to add data - manual entry or file upload',
    },
    {
      label: 'Enter Data',
      description: 'Fill in the required information for the new record',
    },
    {
      label: 'Review & Validate',
      description: 'Review your data and make any necessary corrections',
    },
    {
      label: 'Confirm & Save',
      description: 'Confirm the data and save it to the table',
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      name: '',
      email: '',
      age: '',
      role: '',
      department: '',
      salary: '',
      startDate: '',
      rating: 0,
      isActive: true,
      notes: '',
    });
    setValidationErrors({});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.age) errors.age = 'Age is required';
    else if (isNaN(Number(formData.age)) || Number(formData.age) < 0) {
      errors.age = 'Please enter a valid age';
    }
    if (!formData.role.trim()) errors.role = 'Role is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const newRow = {
          id: `row-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          age: Number(formData.age),
          role: formData.role,
          department: formData.department,
          salary: formData.salary,
          startDate: formData.startDate,
          rating: formData.rating,
          isActive: formData.isActive,
          notes: formData.notes,
        };

        dispatch(addRow(newRow));
        setLoading(false);
        handleReset();
        onClose();
      }, 1500);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      setUploadProgress(0);
      
      // Simulate file upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      setTimeout(() => {
        setUploadProgress(100);
        setLoading(false);
        // Handle file processing here
      }, 2000);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Slide}
      transitionDuration={300}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <AddIcon />
        Add New Data
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        {/* Stepper */}
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: 'flex', minHeight: 400 }}>
          {/* Left Panel - Input Method */}
          <Box sx={{ width: '30%', borderRight: '1px solid', borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              orientation="vertical"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    Manual Entry
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <UploadIcon />
                    File Upload
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DataUsageIcon />
                    Template
                  </Box>
                } 
              />
            </Tabs>
          </Box>

          {/* Right Panel - Content */}
          <Box sx={{ flex: 1 }}>
            <TabPanel value={tabValue} index={0}>
              {/* Manual Entry Form */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Basic Information
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    error={!!validationErrors.age}
                    helperText={validationErrors.age}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: <CakeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                  
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      label="Role"
                      error={!!validationErrors.role}
                    >
                      <MenuItem value="Developer">Developer</MenuItem>
                      <MenuItem value="Designer">Designer</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Analyst">Analyst</MenuItem>
                      <MenuItem value="Tester">Tester</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Additional Details
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 2 }}
                  />
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography component="legend">Performance Rating</Typography>
                    <Rating
                      value={formData.rating}
                      onChange={(e, newValue) => handleInputChange('rating', newValue)}
                      precision={0.5}
                    />
                  </Box>
                  
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.isActive}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      />
                    }
                    label="Active Employee"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Additional notes about this employee..."
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {/* File Upload */}
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                
                <Card variant="outlined" sx={{ p: 4, mb: 3 }}>
                  <UploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Upload Data File
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Drag and drop your file here, or click to browse
                  </Typography>
                  
                  <Button
                    variant="contained"
                    onClick={() => fileInputRef.current?.click()}
                    startIcon={<UploadIcon />}
                    disabled={loading}
                  >
                    Choose File
                  </Button>
                  
                  {loading && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={uploadProgress} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Uploading... {uploadProgress}%
                      </Typography>
                    </Box>
                  )}
                </Card>

                <Alert severity="info">
                  <InfoIcon sx={{ mr: 1 }} />
                  Supported formats: CSV, Excel (.xlsx), JSON
                </Alert>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {/* Template Selection */}
              <Typography variant="h6" gutterBottom>
                Choose a Template
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <PersonIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6">Employee</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Basic employee information
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <WorkIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                      <Typography variant="h6">Project</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Project management data
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <DataUsageIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                      <Typography variant="h6">Custom</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create your own template
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Box>

        {/* Preview Section */}
        <Collapse in={showPreview}>
          <Box sx={{ p: 3, bgcolor: 'background.default' }}>
            <Typography variant="h6" gutterBottom>
              Data Preview
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </Paper>
          </Box>
        </Collapse>
      </DialogContent>
      
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button 
          onClick={() => setShowPreview(!showPreview)} 
          variant="outlined"
          startIcon={<PreviewIcon />}
        >
          Preview
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          startIcon={<SaveIcon />}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Data'}
        </Button>
      </DialogActions>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress color="inherit" />
          <Typography>Processing data...</Typography>
        </Box>
      </Backdrop>
    </Dialog>
  );
} 