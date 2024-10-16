import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);

  useEffect(() => {
   
    axios.get(`https://66fdf3c16993693089569d51.mockapi.io/Donuts/${itemId}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
      });
  }, [itemId]);

  if (!item) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/pink_donut 1.png')} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description}>{item.descript}</Text>
      <Text style={styles.deliveryTime}>Delivery Time: {item.deliveryTime} minutes</Text>
      <Button title="Add to Cart" onPress={() => alert(`${item.name} added to cart`)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  deliveryTime: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default DetailScreen;
