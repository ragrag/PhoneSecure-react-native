import { StackNavigator } from 'react-navigation';
import {TouchableOpacity,Text} from 'react-native';
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
            headerRight:  <TouchableOpacity style={logoutBtnStyle} >
                            <Text>Logout</Text>
                         </TouchableOpacity>
        })
    },
    Login: {
        screen: Login,
        navigationOptions: {
        title: 'Login',
        headerLeft: null,
        }
    },


});

export default RootNavigator;