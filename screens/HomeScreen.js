import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthContext } from '../components/context';


function Item({ item }) {
  return (
    <View>
      <TouchableOpacity key={item.id} style={styles.listItems}>
        <Text style={styles.listText}> {item.name} </Text>
      </TouchableOpacity>
    </View>
  )
}

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
      <TouchableOpacity >
        <Text style={styles.listText}> {item.name} </Text>
      </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={stores}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#888'
    },
    listItems: {
      backgroundColor: 'black',
      
    },
    listText: {
      fontSize: 14,
      color: 'black'
    }
  })
