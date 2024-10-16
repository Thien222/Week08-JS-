import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';


const getImageSource = (name) => {
  switch (name) {
    case 'Tasty Donut':
      return require('../assets/green_donut 1.png'); 
    case 'Pink Donut':
      return require('../assets/donut_yellow 1.png'); 
    case 'Floating Donut':
      return require('../assets/tasty_donut 1.png'); 
    default:
      return require('../assets/pink_donut 1.png'); 
  }
};

const HomeScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);


  useEffect(() => {
    axios.get('https://66fdf3c16993693089569d51.mockapi.io/Donuts')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      });
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={getImageSource(item.name)} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description}>{item.descript}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('Details', { itemId: item.id })} 
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#ffcc00',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
