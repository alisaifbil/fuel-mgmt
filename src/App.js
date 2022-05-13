
import React from 'react';
import './App.css';
import { Container, Grid, Typography, Radio, RadioGroup,
   FormControl , FormControlLabel , FormLabel, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { MobileDatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App () 
 {

  const [currentDate, setDate] = React.useState(new Date());
  // const [vehicle, setVehicle] = React.useState();
  const [amount, setAmount] = React.useState("");
  const [mileage, setMileage] = React.useState("");
  const [fuel, setFuel] = React.useState("");
  const [car, setCar] = React.useState("");
  
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleAmountChange = (event) => {
    isNaN(Number(event.target.value)) === true ? setAmount(amount) : setAmount(event.target.value);
  }
  const handleMileageChange = (event) => {
    isNaN(Number(event.target.value)) === true ? setMileage(mileage) : setMileage(event.target.value);
  }
  const handleFuelChange = (event) => {
    isNaN(Number(event.target.value)) === true ? setFuel(fuel) : setFuel(event.target.value);
  }

  const handleClick = () => {
      console.log(currentDate.toISOString() + "--" + amount + "--" + mileage + "--" + fuel + "--" + car);
  }

  const handleCarChange = (event) => {
    setCar(event.target.value);
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
            <FormControl style={{minWidth: 150}} >  
              <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={car}
                label="Age"
                onChange={handleCarChange}
                variant='outlined'
              >
                <MenuItem value={'civic'}>Civic</MenuItem>
                <MenuItem value={'wagonr'}>Wagon-R</MenuItem>
                <MenuItem value={'ybr'}>YBR</MenuItem>
                <MenuItem value={'unique'}>Unique-70</MenuItem>
              </Select> 
            </FormControl>       
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <TextField id="outlined-basic" value={amount} inputProps={{ inputMode: 'numeric', pattern:'([0-9]+)?[,\\.]?[0-9]*'}}
            onChange={handleAmountChange} label="Total Amount" variant="outlined" />
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
