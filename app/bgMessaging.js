import firebase from 'react-native-firebase';
import {  AsyncStorage, PermissionsAndroid} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const IMEI = require('react-native-imei');
const strings = require('./config/strings');
let Sound = require('react-native-sound');
let SmsAndroid = require('react-native-sms-android');
 

async function getCoordinates() {
      console.log("Getting current location");
     navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log('Message : '+  JSON.stringify(message));
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
          console.log(JSON.stringify(error))
        }
      );
    
}

async function ring() {

  Sound.setCategory('Playback',false);
  console.log("Ringing device...");
  
  let whoosh = new Sound('tone.ogg', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log("sound loaded");
    
    whoosh.setSystemVolume(1);
    whoosh.setNumberOfLoops(0);
  

    whoosh.play((success) => {
      if (success) {
        console.log('successfully ringed');
        
        Promise.resolve();
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        whoosh.reset();
        Promise.resolve();
      }
    });
  });
}



async function sms(number) {



  console.log("Sending SMS");
     navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log('Message : '+  JSON.stringify(message));
          DeviceInfo.getBatteryLevel().then(batteryLevel => {
    
            SmsAndroid.sms(
              number, // phone number to send sms to
              //'https://maps.google.com/?q='+position.coords.latitude+","+location.coords.longitude+
              'Latitude: '+position.coords.latitude+
              '\nLongitude: '+position.coords.longitude+
              '\nBattery level: '+parseInt(batteryLevel*100)+'%', // sms body
              'sendDirect', // sendDirect or sendIndirect
              (err, message) => {
                if (err){
                  console.log(JSON.stringify(err));
                  Promise.resolve();
                } else {
                  console.log(message); // callback message
                  Promise.resolve();
                }
              }
            );


          }).catch((err)=>{
            console.log(JSON.stringify(err));
            Promise.resolve();
           });
        
  
        },
        (error) => {
          console.log(JSON.stringify(error))
          Promise.resolve();
        }
      );


  


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
    if(message.data.request ==='location')
    {
      getCoordinates();
    }

   else if(message.data.request ==='ring'){
      ring();
    }
    else if(message.data.request === 'sms')
    {
      sms(message.data.number);
    }

  

}