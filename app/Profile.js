import React, { Component } from 'react';
import {BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';


import Header from './template/Header';
import { Button} from './common/';



class Profile extends Component {
  
  _logout()
  {
    AsyncStorage.removeItem('login_token');
    this.props.navigation.navigate('Login');
  }
  render() {
    return (
      
    <View style={styles.container}>
      <Header title='Account'></Header>
      <Button onPress={this._logout.bind(this)}>Logout</Button>
       
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

export default Profile;