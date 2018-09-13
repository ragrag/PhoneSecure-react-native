import React, { Component } from 'react';
import {  Alert,ScrollView,RefreshControl,PermissionsAndroid ,BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';
import axios from 'axios';
const IMEI = require('react-native-imei');
import Header from './template/Header';
import { Button, CardItem_blk,Spinner} from './common/';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const strings = require('./config/strings');
import RNSimData from 'react-native-sim-data';
import firebase from 'react-native-firebase';

const instance = axios.create();
instance.defaults.timeout = 2500;



class ThisDevice extends Component {
  

  constructor() {

    super(); 
    this.state = {
      manf:DeviceInfo.getBrand().toUpperCase(),
      model: DeviceInfo.getModel(),
      imei:IMEI.getImei(),
      loading:true,
      refreshing:false,
      success:false,
      owner:false,
    };  
  }
 
  componentDidMount(){
    this._checkDevice();
    console.log(RNSimData.getSimInfo());
    firebase.messaging().subscribeToTopic(IMEI.getImei());
    this.messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      Toast.show("Received Message");
    
  });
  AsyncStorage.getItem('err').then( (err)=>{

    console.log(err);
        });
  }
  componentWillUnmount() {
    this.messageListener();
}

_updateLocation()
{
  navigator.geolocation.getCurrentPosition(
    (position) => {
      
      DeviceInfo.getBatteryLevel().then(batteryLevel => {
        AsyncStorage.getItem('login_token').then( (token)=>{
          axios.post(strings.url+'/api/updatelocation',{
          imei:IMEI.getImei(),
          long:position.coords.longitude,
          lat:position.coords.latitude,
          battery:batteryLevel*100,
          phoneNumber:DeviceInfo.getPhoneNumber()
        }, { headers: {'Authorization': "bearer " + token}}).then( (res)=>{
  
          
          console.log('updating location');
  
    
        }).catch( (err)=>{
            console.log(err); 
        });
        
      });

      });
    


    },
    (error) => console.log(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
 
}

_checkDevice()
{

  this.setState({loading:true});
  AsyncStorage.getItem('login_token').then( (token)=>{

    instance.post(strings.url+'/api/checkdevice',{
    imei:this.state.imei,
      
  }, { headers: {'Authorization': "bearer " + token}}).then( (res)=>{
    
         this.setState({loading:false});
         this.setState({refreshing: false});
         this.setState({success:true});
         this.setState({owner:res.data.owner});

  }).catch( (err)=>{
      this.setState({loading:false});
      this.setState({refreshing: false});
      Toast.show('Error while getting device info');
  });
  
});
}


_addPhone(){
  AsyncStorage.getItem('login_token').then( (token)=>{
    
        instance.post('http://192.168.1.99:3000/api/addevice',{
        imei:this.state.imei,
        manf:this.state.manf,
        model:this.state.model
      }, { headers: {'Authorization': "bearer " + token}}).then( (res)=>{
        
         if(res.data.success)
         {
          Toast.show('Device Linked to your account')
          this._checkDevice();

        }
        else if(!res.data.success)
        {
          Toast.show(res.data.message);
        }
      }).catch( (err)=>{
        Toast.show('Failed to link device to your account');
        this._checkDevice();
      });
      
    });
}

_removePrompt(){
  Alert.alert(
    'Are you sure?',
    'You won\'t be able to track this device online and all location data will be lost',
    [
      
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => this._remmovePhone()},
    ],
    { cancelable: true }
  )
}


_remmovePhone(){
  console.log("res");
  AsyncStorage.getItem('login_token').then( (token)=>{
    
        instance.post('http://192.168.1.99:3000/api/removedevice',{
        imei:this.state.imei,
          
      }, { headers: {'Authorization': "bearer " + token}}).then( (res)=>{
        console.log(res.data);
         if(res.data.success)
         {
          Toast.show('Device removed from your account')
          this._checkDevice();
        }
        else if(!res.data.success)
        {
          Toast.show(res.data.message);
          this._checkDevice();
        }
      }).catch( (err)=>{
        Toast.show('Failed to remove device from your account');
        this._checkDevice();
        console.log(err);
      });
      
    });
}
  _renderButton() {
    if (this.state.loading) {
      return <Spinner/>;
    }
    if(this.state.success)
    {
      if(this.state.owner){
        return (
          <View>
            <Text style={styles.darkGreenText}>Phone linked to your account</Text>
            <CardItem_blk>
              <Button onPress={this._removePrompt.bind(this)}>Remove from account</Button>
            </CardItem_blk>
          </View>
        );
    }
    else {
      return (
        <View>
          <Text style={styles.darkRedText}>Phone not linked to your account</Text>
          <Text style={styles.darkRedTextSmall}>Device needs to be linked to an account to start online tracking</Text>
          <CardItem_blk>
            <Button onPress={this._addPhone.bind(this)}>Link to account</Button>
          </CardItem_blk>
        </View>
      );
    }
    }
    else {
      return (
        <View>
          <Text style={styles.redText}>Error retreiving data</Text>
          <CardItem_blk>
            <Button onPress={this._checkDevice.bind(this)}>Try Again</Button>
          </CardItem_blk>
        </View>
      );
    }
  }

  render() {
    return (
  
     <ScrollView style={styles.container}
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
            onRefresh={this._checkDevice.bind(this)}
          />
        }>
        <View>
         
        <View style={styles.padding7}>
          <Text style={styles.headerWhiteText}>{this.state.manf}</Text>
          <Text style={styles.headerWhiteText}>{this.state.model}</Text>
          <Text style={styles.headerWhiteText}>{this.state.imei}</Text>
       </View>
            { this._renderButton() }
      
        </View>
      </ScrollView>
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
  padding7: {
    paddingTop:7
  },
  headerWhiteText :{
    fontSize:16,
    color:'#FFFFFF',
    textAlign: 'center'
  },
  whiteText :{
    color:'#FFFFFF',
    textAlign: 'center'
  },
  darkGreenText :{
    paddingTop:2,
    fontSize:17,
    color:'#306844',
    textAlign: 'center'
  },
  darkRedText :{
    paddingTop:2,
    fontSize:17,
    color:'#8b0000',
    textAlign: 'center'
  },
  darkRedTextSmall :{
    paddingTop:1,
    fontSize:12,
    color:'#8b0000',
    textAlign: 'center'
  },
  input :{
    height:50,
    color:'#FFFFFF'
  },

});

export default ThisDevice;