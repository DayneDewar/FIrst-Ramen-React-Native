import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { AuthContext } from '../components/context';
import logo from '../assets/logo.png'

function HomeScreen() {
  const [user, setUser] = useState(null);
  const [stores, setStores] = useState([]);
  const [isBusy, setIsBusy] = useState(true)
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:8080/api/users/2')
    .then(r => r.json())
    .then(data => setUser(data))
    setIsBusy(false)
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
          <View style={styles.itemContent}>
            <Text style={styles.listName}> {item.name}</Text>
            <Text style={styles.listText}> Rating: {item.rating}</Text>
          </View>
      </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>First</Text>
          <Image style={styles.logo} source={logo}/>
        <Text style={styles.headerText}>Ramen</Text>
      </View>
      { isBusy ? (
        <View styles={styles.storeList}>
          <Text> Loading </Text>
        </View>
      )
      :
      (
      <SafeAreaView style={styles.storeList}>
        <View style={styles.profile}>
          {/* <Text>{user.firstname} {user.lastname}</Text> */}
          <Text style={styles.text}> FAVORITE RESTAURANTS </Text>
        </View>
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
      fontFamily: 'courier',
      fontSize: 28,
      paddingTop: 55,
    },
    listItems: {
      flexDirection: 'row',
      width: 375,
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 7,
      marginLeft: 4,
      marginRight: 4,
      shadowColor: 'grey',
      shadowOffset: {
        width: -1,
        height: 1
      },
      shadowOpacity: 2,
      padding: 7,
      borderRadius: 4
    },
    itemContent: {
      paddingHorizontal: 10,
      flexDirection: 'column'
    },
    listName: {
      fontWeight: 'bold',
      fontSize: 18,
    },
    listText: {
      fontSize: 11,
      color: 'grey',
    },
    storeList: {
      flex: 5,
      backgroundColor: '#eee',
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
      marginTop: 35
    },
    profile: {
      flex: 1,
      width: 380,
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 7,
      borderTopWidth: 30,
      borderRadius: 15,
      borderColor: '#e64f4f',
      alignItems: 'center',
      shadowColor: 'grey',
      shadowOffset: {
        width: -1,
        height: 1
      },
      shadowOpacity: 2,
    }
  })
