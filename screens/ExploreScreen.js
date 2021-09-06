import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


function ExploreScreen() {

  const [stores, setStores] = useState([]);
  let mapAnimation = new Animated.Value(0)

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

  function addFavorite(store) {
      const newFav = {
          user_id: 2,
          store_id: store.id
      }

      console.log(newFav)
      fetch('http://localhost:8080/api/users/favoriteStore',{
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*'
          },
          body: JSON.stringify(newFav)
      })
      .then(r => r.json())
      .then()

  }

  const markers = stores.map((ramenPlace) => {
      const location = {
          latitude: ramenPlace.lat,
          longitude: ramenPlace.long
      };

      return (
          <Marker key={ramenPlace.id} coordinate={location} title={ramenPlace.name}/>
      )
  })

  const cardMarkers = stores.map((store) => {
    return (
        <View style={styles.card} key={store.id}>
            <Image
                source={{uri: store.image}}
                style={styles.cardImage}
                resizeMode='cover'
            />
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{store.name}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{store.address}</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(store.website)}
                        style={[styles.signIn, {
                            borderColor: '#FF6347',
                            borderWidth: 1
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#FF6347'
                        }]}>Order From Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addFavorite(store)}>
                        <Text>Fav</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})
    return(
        <View styles={styles.container}>
            <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 40.7412199,
                longitude: -73.9665138,
                latitudeDelta: 0.09,
                longitudeDelta: 0.07,
            }}
            >
                {markers}
            </MapView>
            <Animated.ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                pagingEnabled
                snapToInterval={100}
                snapToAlignment='center'
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation
                                }
                            },
                        },
                    ],
                    {useNativeDriver: true}
                )}
            >
                {cardMarkers}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height
        height: '100%'
    },
    markerWrapper: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
    },
    markers: {
        width: 30,
        height: 30,
    },
    searchBox: {
        position:'absolute', 
        marginTop: Platform.OS === 'ios' ? 40 : 20, 
        flexDirection:"row",
        backgroundColor: '#fff',
        width: '90%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipStyle: {
        position: 'absolute',
        top:Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10
    },
    chipsItem: {
        flexDirection:"row",
        backgroundColor:'#fff', 
        borderRadius:20,
        padding:8,
        paddingHorizontal:20, 
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 220,
        width: 300,
        overflow: "hidden",
      },
      cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
      },
      textContent: {
        flex: 2,
        padding: 10,
      },
      cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
      },
      cardDescription: {
        fontSize: 12,
        color: "#444",
      },
      button: {
        alignItems: 'center',
        marginTop: 5
      },
      signIn: {
          width: '100%',
          padding:5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 3
      },
      textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
export default ExploreScreen;