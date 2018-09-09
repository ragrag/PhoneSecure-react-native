import React, { Component } from 'react';
import {  ScrollView,RefreshControl,PermissionsAndroid ,BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';
import axios from 'axios';
const IMEI = require('react-native-imei');
import Header from './template/Header';
import { Button, CardItem,Spinner} from './common/';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
const strings = require('./config/strings')

const instance = axios.create();
instance.defaults.timeout = 2500;

class ThisDevice extends Component {
  

  constructor() {

    super(); 
    this.state = {
      manf:DeviceInfo.getBrand(),
      model: DeviceInfo.getModel(),
      imei:'IMEI : ' + IMEI.getImei(),
      loading:true,
      refreshing:false,
      success:false,
      owner:false,
    };  
  }
 
  componentDidMount(){
    this._checkDevice();
  }

_checkDevice()
{

  this.setState({loading:true});
  AsyncStorage.getItem('login_token').then( (token)=>{

    instance.post('http://192.168.1.99:3000/api/checkdevice',{
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
            <Text>Phone linked to your account</Text>
            <CardItem>
              <Button onPress={this._remmovePhone.bind(this)}>Remove from account</Button>
            </CardItem>
          </View>
        );
    }
    else {
      return (
        <View>
          <Text>Phone not linked to your account</Text>
          <CardItem>
            <Button onPress={this._addPhone.bind(this)}>Add to account</Button>
          </CardItem>
        </View>
      );
    }
    }
    else {
      return (
        <View>
          <Text>Error retreiving data</Text>
          <CardItem>
          <Button onPress={this._checkDevice.bind(this)}>Try Again</Button>
          </CardItem>
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
         
      <Text style={styles.whiteText}>Devoce Info</Text>
      <Text style={styles.whiteText}>{this.state.manf}</Text>
      <Text style={styles.whiteText}>{this.state.model}</Text>
      <Text style={styles.whiteText}>{this.state.imei}</Text>
      <CardItem>
            { this._renderButton() }
        </CardItem>
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