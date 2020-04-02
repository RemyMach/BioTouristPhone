import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants";

class HomePage extends React.Component {

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.red}>just red</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  
});

export default HomePage
