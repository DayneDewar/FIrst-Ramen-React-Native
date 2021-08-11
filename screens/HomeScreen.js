import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

function HomeScreen() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/users/2')
    .then(r => r.json())
    .then(data => setUser(data))
  }, [])

  function item({ item }) {
    return (
      <TouchableOpacity key={item.id} style={styles.listItems}>
        <Text style={styles.listText}> {item.name} </Text>
      </TouchableOpacity>
    )
  }

    return(
        <View style={styles.container}>
            {/* <FlatList
              data={user.stores} 
              renderItem={item}
            /> */}
        </View>
    )
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
      color: 'white'
    }
  })
