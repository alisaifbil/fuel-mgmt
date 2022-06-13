
import React from 'react';
import './App.css';
import Add from './components/Add.js';
import { useGetData } from './hooks/useGetData';
import FireStoreData from './components/FireStoreData';
import AddFuel from './components/AddFuel';
import { Container, Grid, Typography, Radio, RadioGroup,
   FormControl , FormControlLabel , FormLabel, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { MobileDatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return(
    <div>
      {/* <Add />
      <FireStoreData /> */}
      <AddFuel />
    </div>
    
  )
}

export default App;
