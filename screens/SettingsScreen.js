import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SettingsScreen() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}> Settings </Text>
        </View>
    )
}
export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#888'
    }
  })
