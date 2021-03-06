import React,{useState,useEffect} from 'react'
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home,Person,List,PhotoCamera,PlayCircleOutline} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import PeopleIcon from '@material-ui/icons/People';
import MovieIcon from '@material-ui/icons/Movie';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';
import {host} from '../host';
const useStyles = makeStyles((theme) =>({
          container:{
             position:"sticky",
             top:0,
             height:"100vh",
             color:"white",
             paddingTop:theme.spacing(10),
             backgroundColor: theme.palette.primary.main,
             [theme.breakpoints.up("sm")]:{
                backgroundColor:"white",
                color:"#555",
                border:"1px solid #ece7e7"
            }
          },
          item:{
             display:"flex",
             alignItems:"center",
             marginBottom:theme.spacing(3),
             [theme.breakpoints.up("sm")]:{
                marginBottom:theme.spacing(3),
                cursor:"pointer"
             }
          },
          text:{
            fontWeight:500,
             [theme.breakpoints.down("sm")]:{
                display:"none",
             }
          },
          icon:{
             fontWeight:500,
             marginRight:theme.spacing(1),
             [theme.breakpoints.up("sm")]:{
                fontSize:"18px"
             }
          }
}))
const Leftbar = () => {
   const classes = useStyles();
   const history = useHistory();
   const [id, setId] = useState(false);

   const handleRoute = (result) =>{
      
        history.push('/'+result)
   }
      const homeRoute = () =>{
      
        history.push('/')
   }

  useEffect(async(e) => {
     
    let config = {
        headers:{
            "content-Type":"application/json"
        }
    }
    try {
        config = {
            headers:{
                "content-Type":"application/json",
                "x-auth-token": localStorage.getItem("authToken")
            }
        }
       
        const auth = await axios.get(host+"/api/auth",config);
        console.log(auth)

            if(auth.data.email == "admin@gmail.com"){
               
                setId(true);

            }
    }   catch (error) {
     
        history.push('/login')
    }
  
   },[])

   const adminPanel = (
       (id == true)?

          (<div className={classes.item}>
             <PermDeviceInformationIcon className={classes.icon}/>
             <Typography className={classes.text} onClick={()=> handleRoute("adminpanel")}>Admin Panel</Typography>            
          </div>):

        (<h1></h1>)
    )
   return (
       <Container className={classes.container}>
          
          <div className={classes.item}>

             
             <Home className={classes.icon} onClick={()=> homeRoute("/")}/>
             <Typography className={classes.text} onClick={()=> homeRoute("/")}>Homepage</Typography>
                       
          </div>
          <div className={classes.item}>
             <MovieIcon className={classes.icon} onClick={()=> handleRoute("trending")} />
             <Typography className={classes.text} onClick={()=> handleRoute("trending")}>Latest Movies & TV Shows</Typography>            
          </div>

          <div className={classes.item}>
             <PlayCircleOutline className={classes.icon} onClick={()=> handleRoute("database")}/>
             <Typography className={classes.text} onClick={()=> handleRoute("database")}>Search Movies & TV Shows</Typography>            
          </div>
          <div className={classes.item}>
             <PeopleIcon className={classes.icon} onClick={()=> handleRoute("search")}/>
             <Typography className={classes.text} onClick={()=> handleRoute("search")}>Friends</Typography>            
          </div>
           
          {adminPanel}
       </Container>
   )
};

export default Leftbar;