import firebase from 'react-native-firebase';
import {  AsyncStorage} from 'react-native';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const IMEI = require('react-native-imei');
const strings = require('./config/strings');

const testTask = async () => {
    await console.log('Headless JS task was fired!'); // eslint-disable-line no-console
  };
  
  export default testTask;