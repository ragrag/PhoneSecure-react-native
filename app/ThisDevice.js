import React, { Component } from 'react';
import {BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';


import Header from './template/Header';
import { Button} from './common/';

import DeviceInfo from 'react-native-device-info';

import Toast from 'react-native-simple-toast';
const test= DeviceInfo.getBrand();
class ThisDevice extends Component {
  

  // constructor() {
  //   super(); 
  //   this.state = {
  //     manf: '',
  //     model: '',
  //     loading:false
  //   };
  // }

//   componentDidMount() {

// }


  render() {
    return (
      
    <View style={styles.container}>
      <Header title='This Device'></Header>
      <Text style={styles.whiteText}>{test}</Text>
    </View>
     
    );
  } 
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
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