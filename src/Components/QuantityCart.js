import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const QuantityCart = props => {
  var {incrementQuantity, decrementQuantity} = props;

  return (
    <View style={styles.container}>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => decrementQuantity(item.id)} />
        <Text>{item.quantity}</Text>
        <Button title="+" onPress={() => incrementQuantity(item.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QuantityCart;
