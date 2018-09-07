import { StackNavigator } from 'react-navigation';

import Home from './Home';
import Login from './Login';

const RootNavigator = StackNavigator({


 


    Home: {
        screen: Home,
        navigationOptions: {
            title: 'Home',
            headerLeft:false,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
        title: 'Login',
        headerLeft: false
        }
    },


});

export default RootNavigator;