import React, { Component } from 'react';
import { Platform , StyleSheet, Text, View ,ToastAndroid} from 'react-native';


import Header from './template/Header'
import { Button} from './common/'


class Home extends Component {
  
_btnClick()
{
  ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  this.props.navigation.navigate('Login');
}

  render() {
    return (
      
    <View style={styles.container}>

      <Text style={styles.whiteText}>PhoneSecureApp2 </Text>
      <Header title='Header from props'></Header>
      <Button onPress={this._btnClick.bind(this)}>Click me</Button>

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

export default Home;