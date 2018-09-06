import React from 'react';
import { Platform , StyleSheet, Text, View ,AppRegistry} from 'react-native';

import Button from './app/common/button';


export default class App extends React.Component {
 
  render() {
    return (
      
    <View style={styles.container}>
      <Button/>
       <Text style={styles.whiteText}>PhoneSecureApp2 </Text>
     
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
