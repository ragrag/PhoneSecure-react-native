import React from 'react';
import { View, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  cardItem: {
    padding: 5,
    backgroundColor: '#212121',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
});

const CardItem_blk = (props) => {
  return(
    <View style={styles.cardItem}>
      { props.children }
    </View>
  );
};


export  {CardItem_blk};
