'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Stepper,
  Step,
  StepLabel,
  StepContent,
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
  Divider,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Fab,
  Drawer,
  AppBar,
  Toolbar,
  Icon,
  InputAdornment,
  OutlinedInput,
  Input,
  FormHelperText,
  Autocomplete,
  Switch as MuiSwitch,
  Checkbox as MuiCheckbox,
  Radio as MuiRadio,
  Slider as MuiSlider,
  Rating as MuiRating,
  Stack,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
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
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Print as PrintIcon,
  Send as SendIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  VerifiedUser as VerifiedUserIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Note as NoteIcon,
  Comment as CommentIcon,
  RateReview as RateReviewIcon,
  Assessment as AssessmentIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Speed as SpeedIcon,
  Timer as TimerIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  Today as TodayIcon,
  AccessTime as AccessTimeIcon,
  Update as UpdateIcon,
  Sync as SyncIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  DeleteForever as DeleteForeverIcon,
  RestoreFromTrash as RestoreFromTrashIcon,
  ContentCopy as ContentCopyIcon,
  ContentCut as ContentCutIcon,
  ContentPaste as ContentPasteIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  FindInPage as FindInPageIcon,
  FindReplace as FindReplaceIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewComfy as ViewComfyIcon,
  ViewHeadline as ViewHeadlineIcon,
  ViewStream as ViewStreamIcon,
  ViewWeek as ViewWeekIcon,
  ViewDay as ViewDayIcon,
  ViewAgenda as ViewAgendaIcon,
  ViewCarousel as ViewCarouselIcon,
  ViewColumn as ViewColumnIcon,
  ViewQuilt as ViewQuiltIcon,
  ViewTimeline as ViewTimelineIcon,
  ViewSidebar as ViewSidebarIcon,
  ViewCompact as ViewCompactIcon,
  ViewCompactAlt as ViewCompactAltIcon,
  ViewCozy as ViewCozyIcon,
  ViewComfyAlt as ViewComfyAltIcon,
  ViewKanban as ViewKanbanIcon,
} from '@mui/icons-material';

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
      id={`data-entry-tabpanel-${index}`}
      aria-labelledby={`data-entry-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DataEntryForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    
    // Professional Information
    jobTitle: '',
    department: '',
    company: '',
    employeeId: '',
    startDate: '',
    salary: '',
    experience: '',
    skills: [] as string[],
    
    // Additional Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Preferences
    workSchedule: '',
    remoteWork: false,
    notifications: true,
    theme: 'light',
    language: 'en',
    
    // Performance
    rating: 0,
    performance: 50,
    satisfaction: 3,
    goals: '',
    notes: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      label: 'Personal Information',
      description: 'Enter basic personal details',
    },
    {
      label: 'Professional Details',
      description: 'Add work-related information',
    },
    {
      label: 'Additional Information',
      description: 'Include address and preferences',
    },
    {
      label: 'Review & Submit',
      description: 'Review all information and submit',
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
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      maritalStatus: '',
      jobTitle: '',
      department: '',
      company: '',
      employeeId: '',
      startDate: '',
      salary: '',
      experience: '',
      skills: [],
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      workSchedule: '',
      remoteWork: false,
      notifications: true,
      theme: 'light',
      language: 'en',
      rating: 0,
      performance: 50,
      satisfaction: 3,
      goals: '',
      notes: '',
    });
    setValidationErrors({});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillsChange = (event: React.SyntheticEvent, value: string[]) => {
    setFormData(prev => ({ ...prev, skills: value }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        handleReset();
        // Handle form submission
      }, 2000);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const skillOptions = [
    'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'Java', 'C++',
    'HTML', 'CSS', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git', 'Agile'
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <PersonIcon />
            </Avatar>
          }
          title="Comprehensive Data Entry Form"
          subheader="Enter detailed information with advanced validation and preview"
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={() => setShowPreview(!showPreview)}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          }
        />
      </Card>

      {/* Stepper */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Grid container spacing={3}>
        {/* Left Panel - Form Tabs */}
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="data entry tabs">
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon />
                      Personal
                    </Box>
                  } 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkIcon />
                      Professional
                    </Box>
                  } 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationIcon />
                      Address
                    </Box>
                  } 
                />
                <Tab 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SettingsIcon />
                      Preferences
                    </Box>
                  } 
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {/* Personal Information */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={!!validationErrors.firstName}
                    helperText={validationErrors.firstName}
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={!!validationErrors.lastName}
                    helperText={validationErrors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    InputProps={{
                      startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CakeIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                      <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Marital Status</InputLabel>
                    <Select
                      value={formData.maritalStatus}
                      onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                      label="Marital Status"
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="married">Married</MenuItem>
                      <MenuItem value="divorced">Divorced</MenuItem>
                      <MenuItem value="widowed">Widowed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {/* Professional Information */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    error={!!validationErrors.jobTitle}
                    helperText={validationErrors.jobTitle}
                    InputProps={{
                      startAdornment: <WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    InputProps={{
                      startAdornment: <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <CalendarIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    InputProps={{
                      startAdornment: <MoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    InputProps={{
                      startAdornment: <SchoolIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={skillOptions}
                    value={formData.skills}
                    onChange={handleSkillsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills"
                        placeholder="Select skills..."
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                          color="primary"
                          variant="outlined"
                        />
                      ))
                    }
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {/* Address Information */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={2}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP/Postal Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              {/* Preferences */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Work Schedule</InputLabel>
                    <Select
                      value={formData.workSchedule}
                      onChange={(e) => handleInputChange('workSchedule', e.target.value)}
                      label="Work Schedule"
                    >
                      <MenuItem value="full-time">Full Time</MenuItem>
                      <MenuItem value="part-time">Part Time</MenuItem>
                      <MenuItem value="flexible">Flexible</MenuItem>
                      <MenuItem value="remote">Remote</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.remoteWork}
                        onChange={(e) => handleInputChange('remoteWork', e.target.checked)}
                      />
                    }
                    label="Remote Work Available"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.notifications}
                        onChange={(e) => handleInputChange('notifications', e.target.checked)}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Theme Preference</InputLabel>
                    <Select
                      value={formData.theme}
                      onChange={(e) => handleInputChange('theme', e.target.value)}
                      label="Theme Preference"
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="legend">Performance Rating</Typography>
                  <Rating
                    value={formData.rating}
                    onChange={(e, newValue) => handleInputChange('rating', newValue)}
                    precision={0.5}
                    size="large"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="legend">Performance Level</Typography>
                  <Slider
                    value={formData.performance}
                    onChange={(e, newValue) => handleInputChange('performance', newValue)}
                    aria-label="Performance"
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0, label: 'Poor' },
                      { value: 25, label: 'Fair' },
                      { value: 50, label: 'Good' },
                      { value: 75, label: 'Very Good' },
                      { value: 100, label: 'Excellent' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography component="legend">Job Satisfaction</Typography>
                  <RadioGroup
                    row
                    value={formData.satisfaction}
                    onChange={(e) => handleInputChange('satisfaction', Number(e.target.value))}
                  >
                    <FormControlLabel value={1} control={<Radio />} label="Very Dissatisfied" />
                    <FormControlLabel value={2} control={<Radio />} label="Dissatisfied" />
                    <FormControlLabel value={3} control={<Radio />} label="Neutral" />
                    <FormControlLabel value={4} control={<Radio />} label="Satisfied" />
                    <FormControlLabel value={5} control={<Radio />} label="Very Satisfied" />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Career Goals"
                    multiline
                    rows={3}
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="Describe your career goals and aspirations..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    multiline
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any additional information or notes..."
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </Card>
        </Grid>

        {/* Right Panel - Summary & Actions */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Progress Card */}
            <Card elevation={2}>
              <CardHeader
                title="Form Progress"
                avatar={<CircularProgress variant="determinate" value={((activeStep + 1) / steps.length) * 100} />}
              />
              <CardContent>
                <LinearProgress 
                  variant="determinate" 
                  value={((activeStep + 1) / steps.length) * 100} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Step {activeStep + 1} of {steps.length}
                </Typography>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card elevation={2}>
              <CardHeader title="Quick Actions" />
              <CardContent>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    startIcon={<PreviewIcon />}
                    onClick={() => setShowPreview(!showPreview)}
                    fullWidth
                  >
                    Preview Data
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    disabled={loading}
                    fullWidth
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleReset}
                    fullWidth
                  >
                    Reset Form
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Validation Status */}
            <Card elevation={2}>
              <CardHeader title="Validation Status" />
              <CardContent>
                {Object.keys(validationErrors).length === 0 ? (
                  <Alert severity="success" icon={<CheckIcon />}>
                    All fields are valid
                  </Alert>
                ) : (
                  <Alert severity="error" icon={<ErrorIcon />}>
                    {Object.keys(validationErrors).length} validation errors
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Preview Section */}
      <Collapse in={showPreview}>
        <Card elevation={2} sx={{ mt: 3 }}>
          <CardHeader title="Data Preview" />
          <CardContent>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
              <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                {JSON.stringify(formData, null, 2)}
              </pre>
            </Paper>
          </CardContent>
        </Card>
      </Collapse>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress color="inherit" />
          <Typography>Saving data...</Typography>
        </Box>
      </Backdrop>
    </Box>
  );
} 
