import { StackNavigator } from 'react-navigation';
import {TouchableOpacity,Text,View} from 'react-native';
import Tabs from './Tabs';
import Login from './Login';
import Splash from './Splash';

const RootNavigator = StackNavigator({


    Splash: {
        screen: Splash,
        navigationOptions:{
            header: null ,
        }
    },


    Home: {
        screen: Tabs,
        navigationOptions: ({ navigation }) => ({
        title: 'PhoneSecure',
        headerLeft:null,
          headerStyle: {
        
           backgroundColor:'#242f3a',
            /* this will style the header, but does NOT change the text */
           },
        headerTitleStyle: { color:'#FFFFFF', fontFamily: "Montserrat-Regular", fontSize: 16, fontWeight: "normal", justifyContent: "center", alignSelf: "center", width: "35%" },
        })
    },

    Login: {
        screen: Login,
        navigationOptions: {
        title: 'Login',
        headerLeft: null,
        headerTitleStyle: { fontFamily: "Montserrat-Regular", fontSize: 16, fontWeight: "normal", justifyContent: "center", alignSelf: "center", width: "35%" },
        }
    },


});

export default RootNavigator;