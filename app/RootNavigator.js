import { StackNavigator } from 'react-navigation';

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
        navigationOptions: {
            title: 'Home',
            header:null,
            headerLeft:null,
        }
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