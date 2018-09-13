import firebase from 'react-native-firebase';
import {  AsyncStorage, PermissionsAndroid} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const IMEI = require('react-native-imei');
const strings = require('./config/strings');
// import Geolocation from 'react-native-geolocation-service';

async function requestPermissions() {

}

export default async (message) => {
    // handle your message
    // axios.get(strings.url+'/api/test')
    // .then(function (response) {
    //   // handle success
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // requestPermissions();
  

  
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION],
        {
          'title': 'Permissions required',
          'message': 'Applications needs to access device information such as IMEI and model/brand and Geolocation'
        }
      )
      console.log(granted);
      const result = !(Object.values(granted).some(value => value !== 'granted'));
      if (result) {
        
        console.log("granted");
       navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Message : '+  JSON.stringify(message));
            DeviceInfo.getBatteryLevel().then(batteryLevel => {
              AsyncStorage.getItem('login_token').then( (token)=>{
                axios.post(strings.url+'/api/updatelocation',{
                imei:IMEI.getImei(),
                long:position.coords.longitude,
                lat:position.coords.latitude,
                battery:batteryLevel*100,
                phoneNumber:DeviceInfo.getPhoneNumber()
              }, { headers: {'Authorization': "bearer " + token}}).then( (res)=>{
        
                Toast.show('Received BG Message');
                console.log('called in bg');
        
               return Promise.resolve();
              }).catch( (err)=>{
        console.log(err); 
        return Promise.resolve();
              });
              
            });
      
            });
          
    
          },
          (error) => {
            // AsyncStorage.setItem('err',JSON.stringify(error));
            
            // axios.get(strings.url+'/api/test/')
            // .then(function (response) {
            //   // handle success
            //   console.log(response);
            // })
            // .catch(function (error) {
            //   // handle error
            //   console.log(error);
            // })
            
            console.log(JSON.stringify(error))
    
          },
         {enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 }
        );
       
      
      
  
  
  
      } else {
        Toast.show('state permission denied');
        RNExitApp.exitApp();
      }
    } catch (err) {
      console.warn(err)
    }
}