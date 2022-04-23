
import React from 'react';
import './App.css';
import { Container, Grid, Typography, Radio, RadioGroup,
   FormControl , FormControlLabel , FormLabel, TextField, Button   } from '@mui/material';
import { MobileDatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App () 
 {

  const [currentDate, setDate] = React.useState(new Date());
  // const [vehicle, setVehicle] = React.useState();
  const [amount, setAmount] = React.useState("");
  const [mileage, setMileage] = React.useState("");
  const [fuel, setFuel] = React.useState("");
  
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }
  const handleMileageChange = (event) => {
    setMileage(event.target.value);
  }
  const handleFuelChange = (event) => {
    setFuel(event.target.value);
  }

  const handleClick = () => {
    console.log(currentDate.toISOString() + "--" + amount + "--" + mileage + "--" + fuel);
  }
  
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
              value={currentDate}
              onChange={handleDateChange}
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
            <TextField id="outlined-basic" value={amount} onChange={handleAmountChange} label="Total Amount" variant="outlined" />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <TextField id="kms" label="Mileage" variant="outlined" value={mileage} onChange={handleMileageChange} />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <TextField id="litres" label="Fuel (Litres)" variant="outlined" value={fuel} onChange={handleFuelChange} />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <Button onClick={handleClick} variant="contained">SUBMIT</Button>
          </Grid>
          
        </Grid>
      </Container>
    </div>
  );
 }

export default App;
