import React, {Component}  from 'react';
import {View,Text,StyleSheet,AsyncStorage,ActivityIndicator} from 'react-native';


class Splash extends Component {


    componentDidMount() {
        
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