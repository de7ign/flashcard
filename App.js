/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const { width, height } = Dimensions.get("window");

type Props = {};
export default class App extends Component<Props> {
  render() {
    const progressBar = (
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text>Card</Text>
        </View>

        <Text>Pro at</Text>
        {progressBar}
        <Text>Learning</Text>
        {progressBar}
        <Text>Noob at</Text>
        {progressBar}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: width * 0.03
  },
  card: {
    height: height * 0.3,
    backgroundColor: "lightblue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  progressBar: {
    height: 20,
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginBottom: 10
  },
  progress: {
    flex: 1,
    backgroundColor: "red",
    width: "50%",
    overflow: "hidden",
    borderRadius: 10
  }
});
