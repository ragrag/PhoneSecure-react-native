import React, {Component}  from 'react';
import {View,Text,StyleSheet,AsyncStorage,ActivityIndicator,PermissionsAndroid} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { Button} from './common';
import  firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
async function requestPermissions() {

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,PermissionsAndroid.PERMISSIONS.READ_SMS],
        {
          'title': 'Permissions required',
          'message': 'Applications needs to access device information such as IMEI and model/brand and Geolocation'
        }
      )
      console.log(granted);
      const result = !(Object.values(granted).some(value => value !== 'granted'));
      if (result) {
        Toast.show('Permissions Granted');
        console.log("granted");



  
      } else {
        Toast.show('state permission denied');
        RNExitApp.exitApp();
      }
    } catch (err) {
      console.warn(err)
    }
}
class Splash extends Component {


    componentDidMount() {
        requestPermissions();

        firebase.messaging().hasPermission()
        .then(enabled => {
          if (enabled) {

            console.log(" Firebase Permission granted");
        AsyncStorage.getItem('login_token').then((token)=>{
            if(token){
                console.log("Going Home");
                this.props.navigation.navigate('Home');
            }
            else {
                console.log("Going Login");
                this.props.navigation.navigate('Login');

            }
            
        });
            // user has permissions
          } else {
            // user doesn't have permission
            console.log("FIREBASE NO PERMISSION");
          } 
        });


    }

    render(){
        return (
        <View style={styles.container}>
            <ActivityIndicator size={"small"}/>
            <Text style={styles.loadingText} >Loading..</Text>
           
        </View>

        ); 
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(42, 55, 68)',
    },
    loadingText: {
      color: '#fff',
      fontSize: 20,
      paddingTop: 10
    },
    image: {
      width: 150,
      height: 150,
      marginBottom: 20
    }
  });
  
export default Splash;