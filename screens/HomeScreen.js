import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { AuthContext } from '../components/context';


function HomeScreen() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:8080/api/users/2')
    .then(r => r.json())
    .then(data => setUser(data))
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/api/stores',{
        method: "GET",
        headers: {
            'Accept': 'application/json, text/plain, */*',
        }
    })
    .then(r => r.json())
    .then(data => setStores(data))
  },[])

  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.listItems} >
        <Image style={styles.thumbnail} source={{uri: item.image}}/>
        <Text style={styles.listText}> {item.name} </Text>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}> Hello {user.firstname}</Text>
      </View>
      <SafeAreaView style={styles.storeList}>
        <FlatList
          data={stores}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: 'black'
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'green'
    },
    listItems: {
      flexDirection: 'row',
      backgroundColor: 'white',
      marginBottom: 20,
      borderColor: 'yellow',
      borderRadius: 2
      
    },
    listText: {
      fontSize: 14,
      color: 'black'
    },
    storeList: {
      flex: 5,
      backgroundColor: 'blue'
    },
    thumbnail: {
      width: 65,
      height: 65
    }
  })
