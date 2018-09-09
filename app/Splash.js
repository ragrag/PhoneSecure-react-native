import React, {Component}  from 'react';
import {View,Text,StyleSheet,AsyncStorage,ActivityIndicator,PermissionsAndroid} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import { Button} from './common';
import Toast from 'react-native-simple-toast';
async function requestPhoneState() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          'title': 'Access device info ',
          'message': 'Applications needs to access device information such as IMEI and model/brand'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show('state permission Granted');
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
        requestPhoneState();
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