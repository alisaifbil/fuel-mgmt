import React, {useEffect} from 'react';
import { Container, Grid, Typography, Radio, RadioGroup,
    FormControl , FormControlLabel , FormLabel, 
    TextField, Button, InputLabel, Select, MenuItem, 
  Alert, Paper, Stack, Divider, Chip, IconButton, Card,
  CardHeader, Avatar, CardMedia, CardContent,CardActions,
  Collapse, Fab, Dialog,Box, DialogContent, DialogTitle, 
  DialogActions, CircularProgress  } from '@mui/material';
import { styled } from '@mui/material/styles';

import { MobileDatePicker, LocalizationProvider  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { borderColor } from '@mui/system';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function AddFuel () 
 {
  const db = firebase.firestore();
  const [currentDate, setDate] = React.useState(new Date());
  // const [vehicle, setVehicle] = React.useState();
  const [amount, setAmount] = React.useState("");
  const [mileage, setMileage] = React.useState("");
  const [fuelLitres, setFuel] = React.useState("");
  const [car, setCar] = React.useState("");
  // const [showAlert, setAlert] = React.useState(false);
  // const [monthlyCount, setMonthlyCount] = React.useState([]);
  // const [monthlyDiff, setMonthlyDiff] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(false);
  const [awaiting, setAwaiting] = React.useState(false);
  const [responseText , setResponseText] = React.useState('');

  useEffect(() => {

    // db.collection("fillingRecord")
    // .doc('PfAcPZokwcm2CEgQH4Kq')
    // .delete()
    // .then(() => {
    //   console.log("deleted");
    // })
    // .catch((error) => {
    //   console.log("not deleted====",error);
    // })

    // db.collection("fillingRecord").get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     if(doc.data().car === 'wagonr' && doc.data().fuelLitres === '500'){
    //       console.log(doc.id, doc.data())
    //     }
    //   })})

  }, []);

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    setOpen(true);
  }

  const handleCarChange = (event) => {
    setCar(event.target.value);
  }

  const submitRecord = () => {
    setAwaiting(true);
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
        setResponseText("Record has been successfully posted.");
        // setAlert(true);
        setAwaiting(false);
        setResponseMessage(true);
      })
      .catch((error) => {
        console.error("Error writing Value: ", error);
        setResponseText("Due to some error record couldn't be posted.");
        setAwaiting(false);
        setResponseMessage(true);
      }); 
  }

  const handleDialogClose = () => {
    setAmount('');
    setMileage('');
    setFuel('');
    setCar('');
    setOpen(false);
    setResponseMessage(false);
    setAwaiting(false);
    setDate(new Date());
  }

  const allowEdit = () => {
    setOpen(false);
  }
  
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Dialog
            open={open}
            onClose={handleDialogClose}
            PaperProps={{
              style: {
                borderRadius: "0.75em",
              },
            }}
            // onClose={handleModalClose}
          >
            {open && !awaiting && !responseMessage ? (
              <div>
                <DialogTitle style={{ textAlign: "center" }}>
                  <strong>CONFIRM</strong>
                </DialogTitle>
                <DialogContent>
                  Are you sure you want to submit the record?
                </DialogContent>
                <DialogActions>
                  <Button onClick={allowEdit}>edit</Button>
                  <Button variant="contained" onClick={submitRecord}>
                    submit
                  </Button>
                </DialogActions>
              </div>
            ) : open && awaiting && !responseMessage ? (
              <div>
                <DialogTitle style={{ textAlign: "center" }}>
                  <strong>PROCESSING...</strong>
                </DialogTitle>
                <DialogContent style={{display: 'flex', justifyContent: 'center'}}>
                  <CircularProgress />
                </DialogContent>
              </div>
            ) : open && !awaiting && responseMessage ? (
              <div>
                <DialogTitle style={{ textAlign: "center" }}>
                  <strong>SUCCESS</strong>
                </DialogTitle>
                <DialogContent>{responseText}</DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={handleDialogClose}>
                    ok
                  </Button>
                </DialogActions>
              </div>
            ) : (
              ""
            )}
          </Dialog>

          {/* {showAlert ? (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          ) : (
            ""
          )} */}

          <Grid item xs={12}>
            <Typography align="center" variant="h3">
              Vehicle's Fuel Management
            </Typography>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
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
          <Grid container item xs={12} justifyContent="center">
            <FormControl style={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-label">Vehicle</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={car}
                label="Age"
                onChange={handleCarChange}
                variant="outlined"
              >
                <MenuItem value={"civic"}>Civic</MenuItem>
                <MenuItem value={"wagonr"}>Wagon-R</MenuItem>
                <MenuItem value={"ybr"}>YBR</MenuItem>
                <MenuItem value={"unique"}>Unique-70</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <TextField
              id="outlined-basic"
              value={amount}
              inputProps={{
                inputMode: "numeric",
                pattern: "([0-9]+)?[,\\.]?[0-9]*",
              }}
              onChange={handleAmountChange}
              label="Total Amount"
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <TextField
              id="kms"
              label="Mileage"
              variant="outlined"
              value={mileage}
              onChange={handleMileageChange}
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <TextField
              id="litres"
              label="Fuel (Litres)"
              variant="outlined"
              value={fuelLitres}
              onChange={handleFuelChange}
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Button onClick={handleClick} variant="contained">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
 }

 export default AddFuel;