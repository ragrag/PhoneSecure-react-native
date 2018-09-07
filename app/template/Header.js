import React , {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

class Header extends Component {
   
   constructor(){
       super();
       this.state = {
        title: 'Header from state',
      };
   }
   
    render()
    {
        return (
            <View>
                <Text style={styles.whiteText}>{this.props.title}</Text>
                <Text style={styles.whiteText}>{this.state.title}</Text>
            </View>
        );
    }

}


const styles = StyleSheet.create({


    whiteText :{
      color:'#FFFFFF',
      textAlign: 'center'
    }

  });
  
export default Header;