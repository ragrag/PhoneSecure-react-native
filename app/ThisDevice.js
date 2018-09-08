import React, { Component } from 'react';
import {BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';

const IMEI = require('react-native-imei');
import Header from './template/Header';
import { Button} from './common/';

const imei = IMEI.getImei();
class ThisDevice extends Component {
  

  constructor() {

    super(); 
    this.state = {
      manf:'brand',
      model: 'model',
      imei:imei ,
      loading:false
    };
    
  }

 

  render() {
    return (
      
    <View style={styles.container}>
      <Header title='This Device'></Header>
      <Text style={styles.whiteText}>{this.state.model}</Text>
      <Text style={styles.whiteText}>{this.state.manf}</Text>
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