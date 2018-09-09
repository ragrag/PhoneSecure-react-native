import React, { Component } from 'react';
import { PermissionsAndroid ,BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';

const IMEI = require('react-native-imei');
import Header from './template/Header';
import { Button} from './common/';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';


class ThisDevice extends Component {
  

  constructor() {

    super(); 
    this.state = {
      manf:DeviceInfo.getBrand(),
      model: DeviceInfo.getModel(),
      imei:'IMEI : ' + IMEI.getImei(),
      loading:false
    };
    
  
  }



  render() {
    return (
    <View style={styles.container}>
      <Text style={styles.whiteText}>Devoce Info</Text>
      <Text style={styles.whiteText}>{this.state.manf}</Text>
      <Text style={styles.whiteText}>{this.state.model}</Text>
      <Text style={styles.whiteText}>{this.state.imei}</Text>
    </View>
    );
  } 
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor:'#212121'
  },
  
  appCol: {
    flexDirection:'row', 
    height:50
  },
  whiteText :{
    color:'#FFFFFF',
    textAlign: 'center'
  },
  input :{
    height:50,
    color:'#FFFFFF'
  }
});

export default ThisDevice;