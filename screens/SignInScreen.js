import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SignInScreen({navigation}) {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                
            </View>
            <View style={styles.footer}>
                <Text style={styles.text}> SignIn </Text>
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
        flex: 1
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopRightRadius: 45,
        borderTopLeftRadius: 45,
        paddingHorizontal: 45,
        paddingVertical: 30
    },
    text: {
      color: '#888'
    }
  })