
import React from 'react';
import './App.css';
import { Container, Grid, Typography, Radio, RadioGroup,
   FormControl , FormControlLabel , FormLabel, TextField, Button   } from '@mui/material';
import { MobileDatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App () 
 {

  const [value, setValue] = React.useState(new Date());
  
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  
  return (
    <div >
      <Container  >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography align="center" variant='h3'>Vehicle's Fuel Management</Typography>
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <FormControl >
              <FormLabel style={{alignSelf: 'center'}}>Vehicle</FormLabel>
                <RadioGroup row>
                  <FormControlLabel value="civic" control={<Radio />} label="Civic" />
                  <FormControlLabel value="wagonr" control={<Radio />} label="Wagon R" />
                  <FormControlLabel value="ybr" control={<Radio />} label="YBR" />
                  <FormControlLabel value="unique" control={<Radio />} label="Unique-70" />
                </RadioGroup>  
            </FormControl>       
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <TextField id="outlined-basic" label="Total Amount" variant="outlined" />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <TextField id="kms" label="Mileage" variant="outlined" />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <TextField id="litres" label="Fuel (Litres)" variant="outlined" />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <Button variant="contained">SUBMIT</Button>
          </Grid>
          
        </Grid>
      </Container>
    </div>
  );
 }

export default App;
