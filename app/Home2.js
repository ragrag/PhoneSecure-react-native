import React, { Component } from 'react';
import {BackHandler, Platform , StyleSheet, Text, View ,ToastAndroid, TouchableOpacity,AsyncStorage} from 'react-native';


import Header from './template/Header';
import { Button} from './common/';



class Home extends Component {
  


    static navigationOptions = ({ navigation }) => {

       
        
        const logoutBtnStyle = { paddingRight: 20 };
        const { params = {} } = navigation.state;
  
        const headerRight = (
          <TouchableOpacity style={logoutBtnStyle} onPress={params.logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        );
  
        return {  headerRight };
      };

    _logout(){
        console.log('log out');
        AsyncStorage.removeItem('login_token');
        this.props.navigation.navigate('Login');
    }

   
  componentDidMount() {
    this.props.navigation.setParams({ logout: this._logout.bind(this) });
    
  }

  render() {
    return (
      
    <View style={styles.container}>
      <Header title='Home Screen'></Header>
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