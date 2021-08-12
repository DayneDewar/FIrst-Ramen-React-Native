import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../components/context';

function HomeScreen() {
  const [user, setUser] = useState(null)
  const { signOut } = useContext(AuthContext);

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
          <TouchableOpacity onPress={() => signOut()}>
            <Text style={styles.listText}> Sign Out</Text>
          </TouchableOpacity>
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
