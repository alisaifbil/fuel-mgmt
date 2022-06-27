import React, { useEffect } from 'react';
import { Container, Grid, Typography, Radio, RadioGroup,
    FormControl , FormControlLabel , FormLabel, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import { MobileDatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Statistics () 
 {
  const db = firebase.firestore();
  const [currentDate, setDate] = React.useState(new Date());
  // const [vehicle, setVehicle] = React.useState();
  const [amount, setAmount] = React.useState("");
  const [mileage, setMileage] = React.useState("");
  const [fuelLitres, setFuel] = React.useState("");
  const [car, setCar] = React.useState("");
  const [carRefills, setCarRefills] = React.useState([]);
  
  useEffect(() => {
    // fuelLitres: '2719', car: 'wagonr'
    // car: 'wagonr', fuelLitres: '18545',

    // db.collection("fillingRecord")
    // .doc('FJABCeV9nZfSavvNTod1')
    // .delete()
    // .then(() => {
    //   console.log("deleted");
    // })
    // .catch((error) => {
    //   console.log("not deleted====",error);
    // })
    let countArr = [];
    db.collection("fillingRecord").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            console.log(Number(doc.data().mileage) == 16608? doc.data() : "not found");
        })
    })

  }, []);

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
    isNaN(Number(event.target.value)) === true ? setFuel(fuelLitres) : setFuel(event.target.value);
  }

  const handleClick = () => {
    db.collection("fillingRecord")
      .doc()
      .set({
        car: car,
        amount: amount,
        fuelLitres: fuelLitres,
        mileage: mileage,
        date: currentDate
      })
      .then(() => {
        console.log("Value successfully written!");
      })
      .catch((error) => {
        console.error("Error writing Value: ", error);
      });  
    
    // console.log(currentDate.toISOString() + "--" + amount + "--" + mileage + "--" + fuelLitres + "--" + car);
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
            <TextField id="litres" label="Fuel (Litres)" variant="outlined" value={fuelLitres} onChange={handleFuelChange} />
          </Grid>
          <Grid container item xs={12} justifyContent='center'>
            <Button onClick={handleClick} variant="contained">SUBMIT</Button>
          </Grid>
          
        </Grid>
      </Container>
    </div>
  );
 }

 export default Statistics;