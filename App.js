/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Animated,
  TouchableWithoutFeedback
} from "react-native";

const { width, height } = Dimensions.get("window");

class ProgressBar extends Component {
  render() {
    return (
      <View>
        <Text style={{ color: "white" }}>{this.props.label}</Text>
        <View style={styles.progressBar}>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              backgroundColor: this.props.backgroundColor,
              width: this.props.completed * 100 + "%"
            }}
          />
        </View>
      </View>
    );
  }
}

type Props = {};
export default class App extends Component<Props> {
  state = {
    pro: 0.2,
    learning: 0.5,
    noob: 0.3,
    isTouchdisabled: false
  };

  handlePressCorrect() {}

  handlePressWrong() {}

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    });
  }

  handlePress() {
    this.setState(prevState => ({
      isTouchdisabled: !prevState.isTouchdisabled
    }));
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    const { pro, learning, noob, isTouchdisabled } = this.state;

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };

    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.handlePress()}
          disabled={isTouchdisabled}
        >
          <View>
            <Animated.View style={[frontAnimatedStyle, styles.card]}>
              <Text>Card</Text>
            </Animated.View>
            <Animated.View
              style={[styles.card, styles.flipCardBack, backAnimatedStyle]}
            >
              <Text>back Card</Text>
              <View
                style={[{ width: "100%", position: "absolute", bottom: 0 }]}
              >
                <TouchableWithoutFeedback onPress={() => this.handlePress()}>
                  <View
                    style={[
                      {
                        backgroundColor: "rgba(38, 222, 129,0.6)"
                      },
                      styles.buttons
                    ]}
                  >
                    <Text style={{ color: "#20bf6b" }}>I got it right</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.handlePress()}>
                  <View
                    style={[
                      {
                        backgroundColor: "rgba(235, 59, 90,0.6)",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                      },
                      styles.buttons
                    ]}
                  >
                    <Text style={{ color: "#eb3b5a" }}>I got it wrong</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        <ProgressBar label="Pro at" backgroundColor="#26de81" completed={pro} />
        <ProgressBar
          label="learning"
          backgroundColor="#fed330"
          completed={learning}
        />
        <ProgressBar
          label="noob at"
          backgroundColor="#eb3b5a"
          completed={noob}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1565C0",
    padding: width * 0.03
  },
  card: {
    minHeight: height * 0.3,
    height: height * 0.4,
    backgroundColor: "#FFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backfaceVisibility: "hidden"
  },
  progressBar: {
    height: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10
  },
  buttons: {
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  flipCardBack: {
    backgroundColor: "white",
    height: height * 0.4,
    width: width - width * 0.06,
    position: "absolute",
    top: 0
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: "black",
    fontWeight: "bold"
  }
});
