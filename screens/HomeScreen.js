import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { AuthContext } from '../components/context';
import logo from '../assets/logo.png'

function HomeScreen() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:8080/api/users/2')
    .then(r => r.json())
    .then(data => setUser(data))
  }, [])

  console.log(user)
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
          <Text style={styles.listText}> {item.name} hi this the item yea yea yea</Text>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>First</Text>
          <Image style={styles.logo} source={logo}/>
        <Text style={styles.headerText}>Ramen</Text>
      </View>
      { user === null ? (
        <View styles={storeList}>
          <Text> Loading </Text>
        </View>
      )
      :
      (
      <SafeAreaView style={styles.storeList}>
        <FlatList
          data={stores}
          renderItem={item => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      )}
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: 'black',
      fontFamily: 'courier'
    },
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#e64f4f'
    },
    headerText: {
      color: 'yellow',
      fontWeight: 'bold',
      fontSize: 30,
      paddingTop: 55,
    },
    listItems: {
      flexDirection: 'row',
      width: 380,
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 7,
      shadowColor: 'black',
      shadowOffset: {
        width: -10,
        height: 3
      },
      shadowOpacity: 20,
      padding: 7,
      borderColor: 'yellow',
      borderRadius: 2
      
    },
    listText: {
      paddingTop: 22,
      paddingHorizontal: 60,
      fontSize: 14,
      color: 'black',
      alignContent: 'center'

    },
    storeList: {
      flex: 5,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center'
    },
    thumbnail: {
      width: 65,
      height: 65
    },
    logo: {
      width: 70,
      height: 70,
      margin: 25,
      marginTop: 35,
      left: 8
    }
  })
