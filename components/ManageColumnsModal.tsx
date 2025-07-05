'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  TextField,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Alert,
  Fade,
  Slide,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  DragIndicator as DragIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {
  addColumn,
  toggleColumnVisibility,
  reorderColumns,
} from '@/lib/store/tableSlice';
import { setManageColumnsModalOpen } from '@/lib/store/uiSlice';
import { Column } from '@/lib/store/tableSlice';

export default function ManageColumnsModal() {
  const dispatch = useDispatch();
  const { columns, isManageColumnsModalOpen } = useSelector((state: RootState) => ({
    columns: state.table.columns,
    isManageColumnsModalOpen: state.ui.isManageColumnsModalOpen,
  }));

  const [newColumnKey, setNewColumnKey] = useState('');
  const [newColumnLabel, setNewColumnLabel] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number' | 'email'>('string');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleClose = () => {
    dispatch(setManageColumnsModalOpen(false));
    setNewColumnKey('');
    setNewColumnLabel('');
    setNewColumnType('string');
    setShowAddForm(false);
  };

  const handleAddColumn = () => {
    if (newColumnKey && newColumnLabel) {
      dispatch(addColumn({
        key: newColumnKey.toLowerCase().replace(/\s+/g, '_'),
        label: newColumnLabel,
        sortable: true,
        type: newColumnType,
      }));
      setNewColumnKey('');
      setNewColumnLabel('');
      setNewColumnType('string');
      setShowAddForm(false);
    }
  };

  const handleToggleColumn = (columnKey: string) => {
    dispatch(toggleColumnVisibility(columnKey));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    dispatch(reorderColumns({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    }));
  };

  const visibleColumns = columns.filter(col => col.visible);
  const hiddenColumns = columns.filter(col => !col.visible);

  return (
    <Dialog
      open={isManageColumnsModalOpen}
      onClose={handleClose}
      maxWidth="md"
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
        <SettingsIcon />
        Manage Columns
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        {/* Add New Column Section */}
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2">
                Add New Column
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowAddForm(!showAddForm)}
                size="small"
              >
                {showAddForm ? 'Cancel' : 'Add Column'}
              </Button>
            </Box>

            <Fade in={showAddForm}>
              <Box sx={{ display: showAddForm ? 'block' : 'none' }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <InfoIcon sx={{ mr: 1 }} />
                  Add a new column to your table. The column key will be automatically formatted.
                </Alert>
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <TextField
                    label="Column Key"
                    value={newColumnKey}
                    onChange={(e) => setNewColumnKey(e.target.value)}
                    placeholder="e.g., department"
                    size="small"
                    sx={{ flex: 1, minWidth: 150 }}
                    helperText={`Will be formatted as: ${newColumnKey ? newColumnKey.toLowerCase().replace(/\s+/g, '_') : ''}`}
                  />
                  <TextField
                    label="Column Label"
                    value={newColumnLabel}
                    onChange={(e) => setNewColumnLabel(e.target.value)}
                    placeholder="e.g., Department"
                    size="small"
                    sx={{ flex: 1, minWidth: 150 }}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      value={newColumnType}
                      onChange={(e) => setNewColumnType(e.target.value as 'string' | 'number' | 'email')}
                      label="Type"
                    >
                      <MenuItem value="string">String</MenuItem>
                      <MenuItem value="number">Number</MenuItem>
                      <MenuItem value="email">Email</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    onClick={handleAddColumn}
                    disabled={!newColumnKey || !newColumnLabel}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
              </Box>
            </Fade>
          </CardContent>
        </Card>

        <Divider sx={{ mb: 3 }} />

        {/* Existing Columns Section */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              Existing Columns ({columns.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="columns">
                {(provided) => (
                  <List
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    {columns.map((column, index) => (
                      <Draggable key={column.key} draggableId={column.key} index={index}>
                        {(provided, snapshot) => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              mb: 1,
                              bgcolor: snapshot.isDragging ? 'action.hover' : 'background.paper',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                boxShadow: 2,
                                transform: 'translateY(-1px)',
                              },
                            }}
                          >
                            <Box {...provided.dragHandleProps} sx={{ mr: 1 }}>
                              <DragIcon color="action" />
                            </Box>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {column.label}
                                  <Chip 
                                    label={column.type} 
                                    size="small" 
                                    variant="outlined" 
                                    color="primary"
                                  />
                                  {column.visible ? (
                                    <VisibilityIcon color="success" fontSize="small" />
                                  ) : (
                                    <VisibilityOffIcon color="disabled" fontSize="small" />
                                  )}
                                </Box>
                              }
                              secondary={`Key: ${column.key} | Sortable: ${column.sortable ? 'Yes' : 'No'}`}
                            />
                            <ListItemSecondaryAction>
                              <Checkbox
                                edge="end"
                                checked={column.visible}
                                onChange={() => handleToggleColumn(column.key)}
                                inputProps={{ 'aria-label': `Toggle ${column.label} visibility` }}
                                color="primary"
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </AccordionDetails>
        </Accordion>

        {/* Summary Section */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Summary:</strong> {visibleColumns.length} visible columns, {hiddenColumns.length} hidden columns
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
} 