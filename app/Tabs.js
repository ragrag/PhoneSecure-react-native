import {createBottomTabNavigator , TabNavigator,TabBarBottom} from 'react-navigation';
import {Text} from 'react-native';
import Profile from './Profile'
import ThisDevice from './ThisDevice'
const Tabs = TabNavigator({

    ThisDevice: {
        screen: ThisDevice,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel:('This Device'),
          
        }),
        
    },

    

Profile: Profile,


},{tabBarOptions: {
    activeTintColor: '#FFFFFF',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: '#2a3744',
    },
    indicatorStyle: { backgroundColor: 'transparent', } 
  }

});

export default Tabs;