import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../components/context';

function SignInScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useContext(AuthContext)

    function changeEmail(e) {
        setEmail(e)
    }
    function changePassword(e) {
        setPassword(e)
    }

    function SubmitLogin(e) {
        //Hard Coded user 1, make dynamic
       e.preventDefault();

       fetch('http://localhost:8080/api/users/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
       })
        .then(r => {
           if (r.status !== 200) {
            console.log("error code: " + r.status)
            return
           }

           r.json().then(signIn())
        })
        .catch(err => {
           console.log(err)
       })
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> Welcome Back </Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.action}>
                    <Text style={styles.text}> Email </Text>
                    <TextInput style={styles.input} autoCapitalize='none' onChangeText={(e) => changeEmail(e)}/>
                </View>
                <View style={styles.action}>
                    <Text style={styles.text}> Password </Text>
                    <TextInput style={styles.input}  autoCapitalize='none' secureTextEntry={true} onChangeText={(e) => changePassword(e)} />
                </View>
                <TouchableOpacity style={styles.button} onPress={(e) => SubmitLogin(e)}>
                    <LinearGradient colors={['#f4bc57', '#e64f4f']} style={styles.button}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.footerText}> ...OR...</Text>
                <TouchableOpacity style={[styles.button, {borderColor: '#e64f4f', borderWidth: 1}]} onPress={() => navigation.navigate('SignUpScreen')}>
                    <Text style={[styles.buttonText, { color: '#e64f4f'}]}>Create an Account</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
}
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e64f4f'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        paddingHorizontal: 45,
        paddingVertical: 30
    },
    headerText: {
        color: 'black',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30,
    },
    footerText: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 23,
    },
    text: {
      color: '#05380a',
      fontSize: 18,
      marginTop: 15
    },
    action: {
        flexDirection: 'column',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    input: {
        paddingHorizontal: 3,
        paddingTop: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
        height: 50,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }

  })