import React, { useEffect } from 'react';
import React, {useEffect} from 'react';
import { Container, Grid, Typography, Radio, RadioGroup,
    FormControl , FormControlLabel , FormLabel, 
    TextField, Button, InputLabel, Select, MenuItem, 
  Alert, Paper, Stack, Divider, Chip, IconButton, Card,
  CardHeader, Avatar, CardMedia, CardContent,CardActions,
  Collapse, Fab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigationIcon from '@mui/icons-material/Navigation';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
  const [monthlyCount, setMonthlyCount] = React.useState([]);
  const [monthlyDiff, setMonthlyDiff] = React.useState([]);
  
  useEffect(() => {

    // db.collection("fillingRecord")
    // .doc('9sM717XzHyA8J38NW7qE')
    // .delete()
    // .then(() => {
    //   console.log("deleted");
    // })
    // .catch((error) => {
    //   console.log("not deleted====",error);
    // })

    let countArr = [];
    let prevMonth = [];
    let diffMoM = [];
    db.collection("fillingRecord").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(new Date(doc.data().date.seconds * 1000).getMonth(), "---", doc.data());
          
          if(countArr.length < 1 && new Date(doc.data().date.seconds * 1000).getMonth() === 5 && new Date(doc.data().date.seconds * 1000).getFullYear() === 2022) {
            countArr.push({car: doc.data().car, 
              count: 1, 
              amount: Number(doc.data().amount),
              fuelLitres: Number(doc.data().fuelLitres),
              mileage: Number(doc.data().mileage)
            });
          }
          else {
            countArr.forEach(val => {
              if(val.car === doc.data().car && new Date(doc.data().date.seconds * 1000).getMonth() === 5 && new Date(doc.data().date.seconds * 1000).getFullYear() === 2022){
                val.count++;
                val.amount += Number(doc.data().amount);
                val.fuelLitres += Number(doc.data().fuelLitres);
                val.mileage <= Number(doc.data().mileage) ? val.mileage = Number(doc.data().mileage) : val.mileage = val.mileage;
                }
              else {
                if(countArr.findIndex(val => val.car === doc.data().car) === -1 && new Date(doc.data().date.seconds * 1000).getMonth() === 5 && new Date(doc.data().date.seconds * 1000).getFullYear() === 2022){
                  countArr.push({car: doc.data().car, 
                    count: 1, 
                    amount: Number(doc.data().amount),
                    fuelLitres: Number(doc.data().fuelLitres),
                    mileage: Number(doc.data().mileage)
                  });
                }
              }
            });
          }

          if(prevMonth.length < 1 && new Date(doc.data().date.seconds * 1000).getMonth() === 4 && new Date(doc.data().date.seconds * 1000).getFullYear() === 2022) {
            prevMonth.push({car: doc.data().car, 
              fuelLitres: Number(doc.data().fuelLitres),
            });
          }
          else {
            prevMonth.forEach(val => {
              if(val.car === doc.data().car && new Date(doc.data().date.seconds * 1000).getMonth() === 4 && new Date(doc.data().date.seconds * 1000).getFullYear() === 2022){
                val.fuelLitres += Number(doc.data().fuelLitres);
                }
              else {
                if(prevMonth.findIndex(val => val.car === doc.data().car) === -1 && new Date(doc.data().date.seconds * 1000).getMonth() === 4 && new Date(doc.data().date.seconds * 1000).getFullYear() === 2022){
                  prevMonth.push({car: doc.data().car, 
                    fuelLitres: Number(doc.data().fuelLitres),
                  });
                }
              }
            });
          }
        });
        countArr.map(stat => {
          prevMonth.map(pStat => {
            if(stat.car === pStat.car){
              diffMoM.push({
                car: stat.car,
                pcDiff: ((stat.fuelLitres/pStat.fuelLitres)*100)-100
              });
            }
          });
        });
        
        console.log(countArr);
        console.log('prev month',prevMonth);
        console.log('pc',diffMoM);
        setMonthlyDiff(diffMoM);
        setMonthlyCount(countArr);
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
        <Grid container item xs={12} direction='row' justifyContent="center" alignItems="center">
          
          {monthlyCount.map((val, index) => (
            <Card raised sx={{ maxWidth: 345 }} style={{margin: '10px'}}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {val.car.substring(0,1).toUpperCase()}
                </Avatar>
              }
              title={val.car === 'wagonr'? "Suzuki Wagon-R": val.car === 'civic'? 'Honda Civic':
              val.car === 'ybr'? 'YBR-G':'Unique CD-70'}
              subheader= {val.count + ' Monthly Refills'} 
            />
            <CardActions disableSpacing>
              
              {monthlyDiff[monthlyDiff.findIndex(mdg => mdg.car === val.car)].pcDiff > 0?
              (<Fab variant="extended" disabled size='medium' style={{color: 'black' , backgroundColor: 'white'}}>
                <ArrowUpwardIcon color='error' sx={{ mr: 1 }} />
                {Math.abs(monthlyDiff[monthlyDiff.findIndex(mdg => mdg.car === val.car)].pcDiff).toFixed(2)} %
              </Fab>):
              (
              <Fab variant="extended" disabled size='medium' style={{color: 'black' , backgroundColor: 'white'}}>
                <ArrowDownwardIcon color='success' sx={{ mr: 1 }} />
                {Math.abs(monthlyDiff[monthlyDiff.findIndex(mdg => mdg.car === val.car)].pcDiff).toFixed(2)} %
              </Fab>)  
            }
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant='subtitle1'>
                  Rs. {val.amount}
                </Typography>
                <Typography variant='subtitle1'>
                  {val.fuelLitres.toFixed(2)} Litres
                </Typography>
                <Typography variant='subtitle1'>
                  Mileage: {val.mileage} KMs
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
           
          ))}
       
          </Grid>
          
        </Grid>
      </Container>
    </div>
  );
 }

 export default Statistics;