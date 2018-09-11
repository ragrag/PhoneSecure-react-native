import firebase from 'react-native-firebase';
import {  AsyncStorage} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const IMEI = require('react-native-imei');



export default async (message) => {
    // handle your message
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        DeviceInfo.getBatteryLevel().then(batteryLevel => {
          AsyncStorage.getItem('login_token').then( (token)=>{
            axios.put('http://192.168.1.99:3000/api/updatelocation',{
            imei:IMEI.getImei(),
            long:position.coords.longitude,
            lat:position.coords.latitude,
            battery:batteryLevel*100,
          }, { headers: {'Authorization': "bearer " + token}}).then( (res)=>{
    
            Toast.show('aaa');
            console.log('called in bg');
    
           return Promise.resolve();
          }).catch( (err)=>{
    console.log(err); 
    return Promise.resolve();
          });
          
        });
  
        });
      


      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
   

  
}