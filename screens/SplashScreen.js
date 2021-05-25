import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function SplashScreen({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image animation='fadeInDownBig' iterationDelay={10} source={logo} style={styles.logo} resizeMode='stretch' />
                <Animatable.Text animation='fadeIn' style={styles.text}>And First...Ramen</Animatable.Text>
            </View>
            <Animatable.View animation='fadeInUp' style={styles.footer}>
                <Text style={styles.text}> Log In or Sign Up</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')} style={styles.button}>
                    <LinearGradient colors={['#f4bc57', '#e64f4f']} style={styles.signIn}>
                        <Text style={styles.textSign}> Sign In </Text>
                        <MaterialIcons name='navigate-next' color='#fff' size={20}/>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')} style={styles.button}>
                    <LinearGradient colors={['#f4bc57', '#e64f4f']} style={styles.signIn}>
                        <Text style={styles.textSign}> Sign Up </Text>
                        <MaterialIcons name='navigate-next' color='#fff' size={20}/>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}
export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e64f4f'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 50
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    text: {
        fontSize: 30,
        color: 'grey',
        marginTop: 5
    },
    textSign: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },

    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },

  })
