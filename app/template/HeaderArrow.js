import React from 'react';
import {Text,StyleSheet} from 'react-native';


const HeaderArrow = () => {
        return (
            <Text style={styles.whiteText}>Header Arrow</Text>
        );    
}


const styles = StyleSheet.create({


    whiteText :{
      color:'#FFFFFF',
      textAlign: 'center'
    }

  });
  
export default HeaderArrow;