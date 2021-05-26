import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context'

function SignUpScreen({navigation}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureButton, setSecureButton] = useState({
        secure: true,
        name: 'eye-off'
    })

    const { signUp } = useContext(AuthContext)
    
    function changeFirstName(e) {
        setFirstname(e)
    }
    function changeLastName(e) {
        setLastname(e)
    }
    function changeEmail(e) {
        setEmail(e)
    }
    function changePassword(e) {
        setPassword(e)
    }
    function clickSecureOff() {
        setSecureButton({
            secure: false,
            name: 'eye'
        })
    }
    function clickSecureOn() {
        setSecureButton({
            secure: true,
            name: 'eye-off'
        })
    }
    function sumbitNewProfile(e) {
        e.preventDefault();

        const newAccount = {
            firstname,
            lastname,
            email,
            password
        }
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccount)
        })
        .then(r => r.json())
        .then(data => signUp())
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textSign}>Let's Do This!</Text>
            </View>
            <Animatable.View animation='fadeInUp' style={styles.footer}>
                <Text style={[styles.text_footer, {fontSize: 25, marginBottom: 35, justifyContent: 'center', alignSelf: 'center' }]}> Create an Account </Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={(e) => changeFirstName(e)}/>
                    <Feather name='check-circle' color='green' size={20} />
                </View>
                <Text style={styles.text_footer}> First Name</Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={(e) => changeLastName(e)}/>
                    <Feather name='circle' color='grey' size={20} />
                </View>
                <Text style={styles.text_footer}> Last Name </Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={(e) => changeEmail(e)}/>
                    <Feather name='x-circle' color='red' size={20} />
                </View>
                <Text style={styles.text_footer}> Email </Text>
                <View style={styles.action}>
                    <TextInput style={styles.textInput} autoCapitalize='none' secureTextEntry={secureButton.secure} onChangeText={(e) => changePassword(e)}/>
                    <TouchableOpacity onPress={secureButton.secure ? clickSecureOff : clickSecureOn}>
                        <Feather name={secureButton.name} color='grey' size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text_footer}> Password </Text>
                <TouchableOpacity style={styles.button} onPress={(e) => sumbitNewProfile(e)}>
                    <LinearGradient colors={['#f4bc57', '#e64f4f']} style={styles.signIn}>
                        <Text style={styles.textSign}> Sign Up </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.signIn, {borderColor: '#e64f4f',
                        borderWidth: 1,
                        marginTop: 35}]} onPress={() => navigation.navigate('SignInScreen')}>
                        <Text style={[styles.textSign, { color: '#e64f4f'}]}> Already Have an Account? </Text>
                </TouchableOpacity>
            </Animatable.View> 
        </View>
    )
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e64f4f'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05380a',
        fontSize: 18,
        marginBottom: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: 0,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
  })
