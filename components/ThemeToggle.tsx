'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { toggleTheme } from '@/lib/store/uiSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={handleToggle} color="inherit">
        {theme === 'light' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Tooltip>
  );
} 